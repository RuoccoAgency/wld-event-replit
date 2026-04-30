import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.SUPABASE_URL ?? "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

// Normalize: strip trailing slash and any /rest/v1 path that may have been pasted
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");

if (!rawUrl || !supabaseKey) {
  console.warn("[supabase] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set — form submissions will fail");
} else {
  const urlObj = (() => { try { return new URL(supabaseUrl); } catch { return null; } })();
  console.log(`[supabase] client initialized — host: ${urlObj?.hostname ?? "invalid URL"}`);
}

export const supabase = createClient(supabaseUrl, supabaseKey);
