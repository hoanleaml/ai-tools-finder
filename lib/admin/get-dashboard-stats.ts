import { createClient } from "@/lib/supabase/server";

export interface DashboardStats {
  totalTools: number;
  newToolsToday: number;
  newToolsThisWeek: number;
  toolsWithAffiliate: number;
  toolsWithAffiliatePercentage: number;
  pendingReviews: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();

  // Get total tools count
  const { count: totalTools } = await supabase
    .from("tools")
    .select("*", { count: "exact", head: true });

  // Get new tools today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { count: newToolsToday } = await supabase
    .from("tools")
    .select("*", { count: "exact", head: true })
    .gte("created_at", today.toISOString());

  // Get new tools this week
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  weekAgo.setHours(0, 0, 0, 0);
  const { count: newToolsThisWeek } = await supabase
    .from("tools")
    .select("*", { count: "exact", head: true })
    .gte("created_at", weekAgo.toISOString());

  // Get tools with affiliate links
  const { data: affiliateLinks } = await supabase
    .from("affiliate_links")
    .select("tool_id")
    .eq("status", "active");

  const uniqueToolIds = new Set(affiliateLinks?.map((link) => link.tool_id) || []);
  const toolsWithAffiliate = uniqueToolIds.size;
  const toolsWithAffiliatePercentage =
    totalTools && totalTools > 0
      ? Math.round((toolsWithAffiliate / totalTools) * 100)
      : 0;

  // Get pending reviews (tools with status 'pending')
  const { count: pendingReviews } = await supabase
    .from("tools")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  return {
    totalTools: totalTools || 0,
    newToolsToday: newToolsToday || 0,
    newToolsThisWeek: newToolsThisWeek || 0,
    toolsWithAffiliate,
    toolsWithAffiliatePercentage,
    pendingReviews: pendingReviews || 0,
  };
}

