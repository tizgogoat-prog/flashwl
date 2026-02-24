import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 3; // max 3 submissions per hour per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Validation helpers
function validateString(val: unknown, minLen: number, maxLen: number): string | null {
  if (typeof val !== 'string') return null;
  const trimmed = val.trim();
  if (trimmed.length < minLen || trimmed.length > maxLen) return null;
  return trimmed;
}

function validateAge(val: unknown): string | null {
  if (typeof val !== 'string') return null;
  const trimmed = val.trim();
  if (!/^\d{1,3}$/.test(trimmed)) return null;
  const num = parseInt(trimmed, 10);
  if (num < 13 || num > 99) return null;
  return trimmed;
}

function validateDiscordId(val: unknown): string | null {
  if (typeof val !== 'string') return null;
  const trimmed = val.trim();
  if (!/^\d{17,20}$/.test(trimmed)) return null;
  return trimmed;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ success: false, error: 'Trop de soumissions. Réessaie plus tard.' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const DISCORD_WEBHOOK_URL = Deno.env.get('DISCORD_WEBHOOK_URL');
    if (!DISCORD_WEBHOOK_URL) {
      throw new Error('DISCORD_WEBHOOK_URL is not configured');
    }

    const body = await req.json();

    // Server-side validation
    const prenom = validateString(body.prenom, 1, 200);
    const age = validateAge(body.age);
    const pays = validateString(body.pays, 1, 200);
    const disponibilites = validateString(body.disponibilites, 1, 500);
    const pseudoDiscord = validateString(body.pseudoDiscord, 1, 200);
    const idDiscord = validateDiscordId(body.idDiscord);
    const experienceTemps = validateString(body.experienceTemps, 1, 200);
    const experienceServeurs = validateString(body.experienceServeurs, 1, 500);
    const persoNom = validateString(body.persoNom, 1, 200);
    const persoAge = validateAge(body.persoAge);
    const persoHistoire = validateString(body.persoHistoire, 1, 2000);
    const motivation = validateString(body.motivation, 1, 1000);

    if (!prenom || !age || !pays || !disponibilites || !pseudoDiscord || !idDiscord ||
        !experienceTemps || !experienceServeurs || !persoNom || !persoAge || !persoHistoire || !motivation) {
      return new Response(JSON.stringify({ success: false, error: 'Données invalides. Vérifie tous les champs.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const embed = {
      title: "📋 Nouvelle Candidature Whitelist",
      color: 0x7C3AED,
      fields: [
        { name: "👤 Prénom", value: prenom, inline: true },
        { name: "🎂 Âge", value: age, inline: true },
        { name: "🌍 Pays / Ville", value: pays, inline: true },
        { name: "📅 Disponibilités", value: disponibilites, inline: false },
        { name: "💬 Pseudo Discord", value: pseudoDiscord, inline: true },
        { name: "🆔 ID Discord", value: idDiscord, inline: true },
        { name: "🎮 Expérience RP", value: experienceTemps, inline: true },
        { name: "🖥️ Serveurs joués", value: experienceServeurs, inline: false },
        { name: "🧑 Personnage", value: `${persoNom} — ${persoAge} ans`, inline: false },
        { name: "📖 Histoire du personnage", value: persoHistoire.substring(0, 1024), inline: false },
        { name: "❤️ Motivation", value: motivation.substring(0, 1024), inline: false },
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
      console.error(`Discord webhook failed [${discordRes.status}]: ${errText}`);
      throw new Error('Failed to send application');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ success: false, error: "Une erreur est survenue." }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
