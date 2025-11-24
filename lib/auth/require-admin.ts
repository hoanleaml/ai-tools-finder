import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Require admin role - redirects to login if not authenticated or not admin
 * Use this in server components/pages that require admin access
 * @param redirectTo Optional redirect path after login (default: current path)
 * @returns Session object if authenticated and admin
 */
export async function requireAdmin(redirectTo?: string) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const loginUrl = `/login${redirectTo ? `?redirectedFrom=${encodeURIComponent(redirectTo)}` : ""}`;
    redirect(loginUrl);
  }

  // Check if user has admin role
  const userRole = session.user.user_metadata?.role;
  if (userRole !== "admin") {
    // Not an admin, redirect to home
    redirect("/");
  }

  return session;
}

