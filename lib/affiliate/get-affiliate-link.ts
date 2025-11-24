import { createClient } from "@/lib/supabase/server";

export interface AffiliateLink {
  id: string;
  tool_id: string;
  affiliate_url: string;
  program_name: string | null;
  commission_rate: number | null;
  status: string;
  created_at: string;
  updated_at: string;
}

/**
 * Get active affiliate link for a tool
 */
export async function getAffiliateLink(toolId: string): Promise<AffiliateLink | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("affiliate_links")
    .select("*")
    .eq("tool_id", toolId)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned
      return null;
    }
    console.error("Error fetching affiliate link:", error);
    return null;
  }

  return data as AffiliateLink;
}

