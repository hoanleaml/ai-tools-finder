import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Require authentication - redirects to login if not authenticated
 * Use this in server components/pages that require authentication
 * @param redirectTo Optional redirect path after login (default: current path)
 * @returns Session object if authenticated
 */
export async function requireAuth(redirectTo?: string) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const loginUrl = `/login${redirectTo ? `?redirectedFrom=${encodeURIComponent(redirectTo)}` : ""}`;
    redirect(loginUrl);
  }

  return session;
}

