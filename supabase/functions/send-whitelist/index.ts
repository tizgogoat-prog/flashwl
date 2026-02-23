import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const DISCORD_WEBHOOK_URL = Deno.env.get('DISCORD_WEBHOOK_URL');
    if (!DISCORD_WEBHOOK_URL) {
      throw new Error('DISCORD_WEBHOOK_URL is not configured');
    }

    const body = await req.json();
    const {
      prenom, age, pays, disponibilites,
      pseudoDiscord, idDiscord,
      experienceTemps, experienceServeurs,
      persoNom, persoAge, persoHistoire,
      motivation,
    } = body;

    const embed = {
      title: "📋 Nouvelle Candidature Whitelist",
      color: 0x7C3AED, // purple
      fields: [
        { name: "👤 Prénom", value: prenom || "N/A", inline: true },
        { name: "🎂 Âge", value: age || "N/A", inline: true },
        { name: "🌍 Pays / Ville", value: pays || "N/A", inline: true },
        { name: "📅 Disponibilités", value: disponibilites || "N/A", inline: false },
        { name: "💬 Pseudo Discord", value: pseudoDiscord || "N/A", inline: true },
        { name: "🆔 ID Discord", value: idDiscord || "N/A", inline: true },
        { name: "🎮 Expérience RP", value: experienceTemps || "N/A", inline: true },
        { name: "🖥️ Serveurs joués", value: experienceServeurs || "N/A", inline: false },
        { name: "🧑 Personnage", value: `${persoNom || "N/A"} — ${persoAge || "N/A"} ans`, inline: false },
        { name: "📖 Histoire du personnage", value: (persoHistoire || "N/A").substring(0, 1024), inline: false },
        { name: "❤️ Motivation", value: (motivation || "N/A").substring(0, 1024), inline: false },
      ],
      timestamp: new Date().toISOString(),
      footer: { text: "Cityland WL — Système de Whitelist" },
    };

    const discordRes = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!discordRes.ok) {
      const errText = await discordRes.text();
      throw new Error(`Discord webhook failed [${discordRes.status}]: ${errText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
