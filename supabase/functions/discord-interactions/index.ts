import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import nacl from "npm:tweetnacl@1.0.3";

const DISCORD_API = "https://discord.com/api/v10";

type DiscordEmbed = {
  title?: string;
  description?: string;
  color?: number;
  fields?: Array<{ name: string; value: string; inline?: boolean }>;
  footer?: { text: string };
  timestamp?: string;
  [key: string]: unknown;
};

type WhitelistApplication = {
  id: string;
  prenom: string;
  id_discord: string;
  discord_message_id: string | null;
};

type StatusActionConfig = {
  newStatus: string;
  statusEmoji: string;
  statusLabel: string;
  embedColor: number;
  dmDescription: (prenom: string) => string;
};

function hexToUint8Array(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

async function verifyDiscordSignature(req: Request, publicKey: string): Promise<{ valid: boolean; body: string }> {
  const signature = req.headers.get("x-signature-ed25519");
  const timestamp = req.headers.get("x-signature-timestamp");
  const body = await req.text();

  if (!signature || !timestamp) return { valid: false, body };

  const message = new TextEncoder().encode(timestamp + body);
  const sigBytes = hexToUint8Array(signature);
  const keyBytes = hexToUint8Array(publicKey);

  return {
    valid: nacl.sign.detached.verify(message, sigBytes, keyBytes),
    body,
  };
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function queueBackgroundTask(task: Promise<unknown>) {
  const runtime = (globalThis as typeof globalThis & {
    EdgeRuntime?: { waitUntil?: (promise: Promise<unknown>) => void };
  }).EdgeRuntime;

  if (runtime?.waitUntil) {
    runtime.waitUntil(task);
    return;
  }

  task.catch((error) => {
    console.error("Background task failed:", error);
  });
}

function getStatusActionConfig(action: string): StatusActionConfig | null {
  switch (action) {
    case "accept":
      return {
        newStatus: "accepted",
        statusEmoji: "✅",
        statusLabel: "Accepté",
        embedColor: 0x22c55e,
        dmDescription: (prenom) => `Félicitations **${prenom}** ! Ta candidature a été **acceptée** ! 🎉\nBienvenue sur FlashWL !`,
      };
    case "reject":
      return {
        newStatus: "rejected",
        statusEmoji: "❌",
        statusLabel: "Refusé",
        embedColor: 0xef4444,
        dmDescription: (prenom) => `Bonjour **${prenom}**, ta candidature a été **refusée**.\nN'hésite pas à retenter plus tard.`,
      };
    case "wait":
      return {
        newStatus: "waiting",
        statusEmoji: "⏳",
        statusLabel: "En attente (Vocal WL)",
        embedColor: 0xf59e0b,
        dmDescription: (prenom) => `Bonjour **${prenom}**, ta candidature est **en attente**.\nTu seras convoqué(e) pour un vocal WL prochainement.`,
      };
    default:
      return null;
  }
}

async function createDmChannel(botToken: string, userId: string) {
  const dmChannelRes = await fetch(`${DISCORD_API}/users/@me/channels`, {
    method: "POST",
    headers: {
      Authorization: `Bot ${botToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipient_id: userId }),
  });

  if (!dmChannelRes.ok) {
    console.error("Failed to create DM channel:", await dmChannelRes.text());
    return null;
  }

  const dmChannel = (await dmChannelRes.json()) as { id?: string };
  return dmChannel.id ?? null;
}

async function sendDiscordDm(botToken: string, userId: string, embed: DiscordEmbed) {
  if (!userId) return;

  const dmChannelId = await createDmChannel(botToken, userId);
  if (!dmChannelId) return;

  const dmRes = await fetch(`${DISCORD_API}/channels/${dmChannelId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bot ${botToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ embeds: [embed] }),
  });

  if (!dmRes.ok) {
    console.error("Failed to send DM:", await dmRes.text());
  }
}

async function assignCitizenRole(botToken: string, guildId: string | undefined, userId: string, roleId: string | undefined) {
  if (!guildId || !userId || !roleId) return;

  const roleRes = await fetch(`${DISCORD_API}/guilds/${guildId}/members/${userId}/roles/${roleId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bot ${botToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!roleRes.ok) {
    console.error("Failed to assign role:", await roleRes.text());
  }
}

async function updateOriginalMessage(botToken: string, channelId: string, messageId: string, embed: DiscordEmbed) {
  const messageRes = await fetch(`${DISCORD_API}/channels/${channelId}/messages/${messageId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bot ${botToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      embeds: [embed],
      components: [],
    }),
  });

  if (!messageRes.ok) {
    console.error("Failed to update original message:", await messageRes.text());
  }
}

serve(async (req) => {
  const PUBLIC_KEY = Deno.env.get("DISCORD_APPLICATION_PUBLIC_KEY");
  const BOT_TOKEN = Deno.env.get("DISCORD_BOT_TOKEN");
  const CHANNEL_ID = Deno.env.get("DISCORD_CHANNEL_ID");
  const CITIZEN_ROLE_ID = Deno.env.get("DISCORD_CITIZEN_ROLE_ID");

  if (!PUBLIC_KEY || !BOT_TOKEN || !CHANNEL_ID) {
    return new Response("Server misconfigured", { status: 500 });
  }

  const { valid, body } = await verifyDiscordSignature(req, PUBLIC_KEY);
  if (!valid) {
    console.error("Invalid Discord signature received");
    return new Response("Invalid signature", { status: 401 });
  }

  const interaction = JSON.parse(body);

  if (interaction.type === 1) {
    return jsonResponse({ type: 1 });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  if (interaction.type === 3) {
    const customId = interaction.data?.custom_id;
    const adminUser = interaction.member?.user?.username || "Admin";

    if (typeof customId !== "string") {
      return jsonResponse({ type: 4, data: { content: "Interaction inconnue.", flags: 64 } });
    }

    const parts = customId.split("_");
    if (parts.length < 3 || parts[0] !== "wl") {
      return jsonResponse({ type: 4, data: { content: "Interaction inconnue.", flags: 64 } });
    }

    const action = parts[1];
    const applicationId = parts.slice(2).join("_");

    const { data: app, error: fetchErr } = await supabase
      .from("whitelist_applications")
      .select("id, prenom, id_discord, discord_message_id")
      .eq("id", applicationId)
      .single<WhitelistApplication>();

    if (fetchErr || !app) {
      return jsonResponse({ type: 4, data: { content: "❌ Candidature introuvable.", flags: 64 } });
    }

    if (action === "message") {
      return jsonResponse({
        type: 9,
        data: {
          title: "Message personnalisé",
          custom_id: `wl_custommsg_${applicationId}`,
          components: [
            {
              type: 1,
              components: [
                {
                  type: 4,
                  custom_id: "custom_message",
                  label: "Ton message",
                  style: 2,
                  placeholder: "Écris ton message ici...",
                  required: true,
                  max_length: 1000,
                },
              ],
            },
          ],
        },
      });
    }

    const statusConfig = getStatusActionConfig(action);
    if (!statusConfig) {
      return jsonResponse({ type: 4, data: { content: "Action inconnue.", flags: 64 } });
    }

    queueBackgroundTask(
      (async () => {
        await supabase
          .from("whitelist_applications")
          .update({ status: statusConfig.newStatus, updated_at: new Date().toISOString() })
          .eq("id", applicationId);

        if (action === "accept") {
          await assignCitizenRole(BOT_TOKEN, interaction.guild_id, app.id_discord, CITIZEN_ROLE_ID ?? undefined);
        }

        const originalEmbed = (interaction.message?.embeds?.[0] ?? {}) as DiscordEmbed;
        const originalFields = Array.isArray(originalEmbed.fields) ? originalEmbed.fields : [];
        const updatedEmbed: DiscordEmbed = {
          ...originalEmbed,
          color: statusConfig.embedColor,
          fields: [
            ...originalFields,
            {
              name: `${statusConfig.statusEmoji} Statut`,
              value: `**${statusConfig.statusLabel}**\nPar: ${adminUser}`,
              inline: false,
            },
          ],
          timestamp: new Date().toISOString(),
        };

        const messageId = app.discord_message_id ?? interaction.message?.id;
        if (messageId) {
          await updateOriginalMessage(BOT_TOKEN, CHANNEL_ID, messageId, updatedEmbed);
        }

        await sendDiscordDm(BOT_TOKEN, app.id_discord, {
          title: `${statusConfig.statusEmoji} Candidature FlashWL`,
          description: statusConfig.dmDescription(app.prenom),
          color: statusConfig.embedColor,
          footer: { text: "FlashWL" },
          timestamp: new Date().toISOString(),
        });
      })().catch((error) => {
        console.error("Status interaction failed:", error);
      }),
    );

    return jsonResponse({ type: 6 });
  }

  if (interaction.type === 5) {
    const customId = interaction.data?.custom_id;
    const adminUser = interaction.member?.user?.username || "Admin";

    if (typeof customId === "string" && customId.startsWith("wl_custommsg_")) {
      const applicationId = customId.replace("wl_custommsg_", "");
      const customMessage = interaction.data.components?.[0]?.components?.[0]?.value || "";

      const { data: app } = await supabase
        .from("whitelist_applications")
        .select("id, prenom, id_discord")
        .eq("id", applicationId)
        .single<WhitelistApplication>();

      if (!app) {
        return jsonResponse({ type: 4, data: { content: "❌ Candidature introuvable.", flags: 64 } });
      }

      queueBackgroundTask(
        (async () => {
          await supabase
            .from("whitelist_applications")
            .update({ admin_message: customMessage, updated_at: new Date().toISOString() })
            .eq("id", applicationId);

          await sendDiscordDm(BOT_TOKEN, app.id_discord, {
            title: "💬 Message de l'équipe FlashWL",
            description: customMessage,
            color: 0x7c3aed,
            footer: { text: `De: ${adminUser} — FlashWL` },
            timestamp: new Date().toISOString(),
          });
        })().catch((error) => {
          console.error("Custom message interaction failed:", error);
        }),
      );

      return jsonResponse({
        type: 4,
        data: {
          content: `💬 Message en cours d'envoi à **${app.prenom}**.`,
          flags: 64,
        },
      });
    }
  }

  return jsonResponse({ type: 1 });
});
