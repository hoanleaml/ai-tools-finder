import { createClient } from "@/lib/supabase/server";

/**
 * Get the current authenticated user (server-side)
 * @returns User object or null if not authenticated
 */
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

