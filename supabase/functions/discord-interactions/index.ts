import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const DISCORD_API = 'https://discord.com/api/v10';

// Verify Discord interaction signature
async function verifyDiscordSignature(req: Request, publicKey: string): Promise<{ valid: boolean; body: string }> {
  const signature = req.headers.get('x-signature-ed25519');
  const timestamp = req.headers.get('x-signature-timestamp');
  const body = await req.text();

  if (!signature || !timestamp) return { valid: false, body };

  const encoder = new TextEncoder();
  const message = encoder.encode(timestamp + body);

  const keyBytes = new Uint8Array(publicKey.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  const sigBytes = new Uint8Array(signature.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'Ed25519', namedCurve: 'Ed25519' },
    false,
    ['verify']
  );

  const valid = await crypto.subtle.verify('Ed25519', cryptoKey, sigBytes, message);
  return { valid, body };
}

serve(async (req) => {
  const PUBLIC_KEY = Deno.env.get('DISCORD_APPLICATION_PUBLIC_KEY');
  const BOT_TOKEN = Deno.env.get('DISCORD_BOT_TOKEN');
  const CHANNEL_ID = Deno.env.get('DISCORD_CHANNEL_ID');
  const CITIZEN_ROLE_ID = Deno.env.get('DISCORD_CITIZEN_ROLE_ID');

  if (!PUBLIC_KEY || !BOT_TOKEN || !CHANNEL_ID) {
    return new Response('Server misconfigured', { status: 500 });
  }

  // Verify signature
  const { valid, body } = await verifyDiscordSignature(req, PUBLIC_KEY);
  if (!valid) {
    return new Response('Invalid signature', { status: 401 });
  }

  const interaction = JSON.parse(body);

  // Handle Discord PING (type 1) - required for registering the endpoint
  if (interaction.type === 1) {
    return new Response(JSON.stringify({ type: 1 }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Handle button interactions (type 3 = MESSAGE_COMPONENT)
  if (interaction.type === 3) {
    const customId: string = interaction.data.custom_id;
    const adminUser = interaction.member?.user?.username || 'Admin';

    // Parse: wl_action_applicationId
    const parts = customId.split('_');
    if (parts.length < 3 || parts[0] !== 'wl') {
      return new Response(JSON.stringify({ type: 4, data: { content: 'Interaction inconnue.', flags: 64 } }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const action = parts[1];
    const applicationId = parts.slice(2).join('_');

    // Fetch application
    const { data: app, error: fetchErr } = await supabase
      .from('whitelist_applications')
      .select('*')
      .eq('id', applicationId)
      .single();

    if (fetchErr || !app) {
      return new Response(JSON.stringify({ type: 4, data: { content: '❌ Candidature introuvable.', flags: 64 } }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Handle "Message personnalisé" → show a modal
    if (action === 'message') {
      return new Response(JSON.stringify({
        type: 9, // MODAL
        data: {
          title: "Message personnalisé",
          custom_id: `wl_custommsg_${applicationId}`,
          components: [
            {
              type: 1, // Action Row
              components: [
                {
                  type: 4, // Text Input
                  custom_id: "custom_message",
                  label: "Ton message",
                  style: 2, // Paragraph
                  placeholder: "Écris ton message ici...",
                  required: true,
                  max_length: 1000,
                },
              ],
            },
          ],
        },
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Handle accept/reject/wait
    let newStatus: string;
    let statusEmoji: string;
    let statusLabel: string;
    let embedColor: number;

    switch (action) {
      case 'accept':
        newStatus = 'accepted';
        statusEmoji = '✅';
        statusLabel = 'Accepté';
        embedColor = 0x22C55E; // green
        break;
      case 'reject':
        newStatus = 'rejected';
        statusEmoji = '❌';
        statusLabel = 'Refusé';
        embedColor = 0xEF4444; // red
        break;
      case 'wait':
        newStatus = 'waiting';
        statusEmoji = '⏳';
        statusLabel = 'En attente (Vocal WL)';
        embedColor = 0xF59E0B; // amber
        break;
      default:
        return new Response(JSON.stringify({ type: 4, data: { content: 'Action inconnue.', flags: 64 } }), {
          headers: { 'Content-Type': 'application/json' },
        });
    }

    // Update database
    await supabase
      .from('whitelist_applications')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', applicationId);

    // If accepted, assign the Citoyen role on Discord
    if (action === 'accept' && CITIZEN_ROLE_ID && app.id_discord) {
      try {
        // Get the guild ID from the interaction
        const guildId = interaction.guild_id;
        if (guildId) {
          const roleRes = await fetch(
            `${DISCORD_API}/guilds/${guildId}/members/${app.id_discord}/roles/${CITIZEN_ROLE_ID}`,
            {
              method: 'PUT',
              headers: {
                'Authorization': `Bot ${BOT_TOKEN}`,
                'Content-Type': 'application/json',
              },
            }
          );
          if (!roleRes.ok) {
            console.error('Failed to assign role:', await roleRes.text());
          }
        }
      } catch (roleErr) {
        console.error('Error assigning citizen role:', roleErr);
      }
    }

    // Update the original message embed with new status
    const originalEmbed = interaction.message.embeds[0];
    const updatedEmbed = {
      ...originalEmbed,
      color: embedColor,
      fields: [
        ...originalEmbed.fields,
        { name: `${statusEmoji} Statut`, value: `**${statusLabel}**\nPar: ${adminUser}`, inline: false },
      ],
    };

    // Update message: replace embed and remove buttons
    await fetch(`${DISCORD_API}/channels/${CHANNEL_ID}/messages/${interaction.message.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bot ${BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [updatedEmbed],
        components: [], // Remove buttons after action
      }),
    });

    // Send DM to user if we have their Discord ID
    try {
      // Create DM channel
      const dmChannelRes = await fetch(`${DISCORD_API}/users/@me/channels`, {
        method: 'POST',
        headers: {
          'Authorization': `Bot ${BOT_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipient_id: app.id_discord }),
      });

      if (dmChannelRes.ok) {
        const dmChannel = await dmChannelRes.json();
        await fetch(`${DISCORD_API}/channels/${dmChannel.id}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bot ${BOT_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            embeds: [{
              title: `${statusEmoji} Candidature Cityland WL`,
              description: action === 'accept'
                ? `Félicitations **${app.prenom}** ! Ta candidature a été **acceptée** ! 🎉\nBienvenue sur Cityland WL !`
                : action === 'reject'
                ? `Bonjour **${app.prenom}**, ta candidature a été **refusée**.\nN'hésite pas à retenter plus tard.`
                : `Bonjour **${app.prenom}**, ta candidature est **en attente**.\nTu seras convoqué(e) pour un vocal WL prochainement.`,
              color: embedColor,
              footer: { text: 'Cityland WL' },
              timestamp: new Date().toISOString(),
            }],
          }),
        });
      }
    } catch (dmErr) {
      console.error('Failed to send DM:', dmErr);
      // Non-blocking - DM failure shouldn't break the flow
    }

    return new Response(JSON.stringify({
      type: 4,
      data: {
        content: `${statusEmoji} Candidature de **${app.prenom}** marquée comme **${statusLabel}** !`,
        flags: 64, // Ephemeral
      },
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Handle modal submission (type 5 = MODAL_SUBMIT)
  if (interaction.type === 5) {
    const customId: string = interaction.data.custom_id;
    const adminUser = interaction.member?.user?.username || 'Admin';

    if (customId.startsWith('wl_custommsg_')) {
      const applicationId = customId.replace('wl_custommsg_', '');
      const customMessage = interaction.data.components[0]?.components[0]?.value || '';

      // Fetch application
      const { data: app } = await supabase
        .from('whitelist_applications')
        .select('*')
        .eq('id', applicationId)
        .single();

      if (!app) {
        return new Response(JSON.stringify({ type: 4, data: { content: '❌ Candidature introuvable.', flags: 64 } }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Update database with custom message
      await supabase
        .from('whitelist_applications')
        .update({ admin_message: customMessage, updated_at: new Date().toISOString() })
        .eq('id', applicationId);

      // Send DM to user
      try {
        const dmChannelRes = await fetch(`${DISCORD_API}/users/@me/channels`, {
          method: 'POST',
          headers: {
            'Authorization': `Bot ${BOT_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recipient_id: app.id_discord }),
        });

        if (dmChannelRes.ok) {
          const dmChannel = await dmChannelRes.json();
          await fetch(`${DISCORD_API}/channels/${dmChannel.id}/messages`, {
            method: 'POST',
            headers: {
              'Authorization': `Bot ${BOT_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              embeds: [{
                title: "💬 Message de l'équipe Cityland WL",
                description: customMessage,
                color: 0x7C3AED,
                footer: { text: `De: ${adminUser} — Cityland WL` },
                timestamp: new Date().toISOString(),
              }],
            }),
          });
        }
      } catch (dmErr) {
        console.error('Failed to send DM:', dmErr);
      }

      return new Response(JSON.stringify({
        type: 4,
        data: {
          content: `💬 Message personnalisé envoyé à **${app.prenom}** en DM !`,
          flags: 64,
        },
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return new Response(JSON.stringify({ type: 1 }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
