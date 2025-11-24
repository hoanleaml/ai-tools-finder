import { createClient } from "@/lib/supabase/server";

/**
 * Get the current session (server-side)
 * @returns Session object or null if not authenticated
 */
export async function getSession() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

