import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, redirect_uri } = await req.json();

    if (!code || !redirect_uri) {
      return new Response(JSON.stringify({ error: 'Code et redirect_uri requis.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const CLIENT_ID = Deno.env.get('DISCORD_CLIENT_ID');
    const CLIENT_SECRET = Deno.env.get('DISCORD_CLIENT_SECRET');

    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error('Discord OAuth configuration missing');
    }

    // Exchange code for token
    const tokenRes = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      }),
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      console.error('Token exchange failed:', err);
      return new Response(JSON.stringify({ error: 'Échec de la connexion Discord. Réessaie.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const tokenData = await tokenRes.json();

    // Get user info
    const userRes = await fetch('https://discord.com/api/v10/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!userRes.ok) {
      throw new Error('Failed to fetch Discord user');
    }

    const discordUser = await userRes.json();

    // Check existing application in DB
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: existingApp } = await supabase
      .from('whitelist_applications')
      .select('id, status, admin_message')
      .eq('id_discord', discordUser.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    // Check if user has Citoyen role on Discord server
    let hasCitoyenRole = false;
    const DISCORD_BOT_TOKEN = Deno.env.get('DISCORD_BOT_TOKEN');
    const DISCORD_CITIZEN_ROLE_ID = Deno.env.get('DISCORD_CITIZEN_ROLE_ID');
    
    if (DISCORD_BOT_TOKEN) {
      // We need the guild ID - extract from channel or use env
      // Try to get guild member info using the bot
      try {
        // Get the guild ID from the channel
        const DISCORD_CHANNEL_ID = Deno.env.get('DISCORD_CHANNEL_ID');
        if (DISCORD_CHANNEL_ID) {
          const channelRes = await fetch(`https://discord.com/api/v10/channels/${DISCORD_CHANNEL_ID}`, {
            headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` },
          });
          if (channelRes.ok) {
            const channel = await channelRes.json();
            const guildId = channel.guild_id;
            
            const memberRes = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${discordUser.id}`, {
              headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` },
            });
            
            if (memberRes.ok) {
              const member = await memberRes.json();
              if (DISCORD_CITIZEN_ROLE_ID && member.roles?.includes(DISCORD_CITIZEN_ROLE_ID)) {
                hasCitoyenRole = true;
              }
            }
          }
        }
      } catch (e) {
        console.error('Error checking Discord roles:', e);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      user: {
        id: discordUser.id,
        username: discordUser.username,
        discriminator: discordUser.discriminator,
        avatar: discordUser.avatar,
        global_name: discordUser.global_name,
      },
      application: existingApp || null,
      hasCitoyenRole,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Une erreur est survenue.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
