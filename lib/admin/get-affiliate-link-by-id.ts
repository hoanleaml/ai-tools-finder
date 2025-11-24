import { createAdminClient } from "@/lib/supabase/admin";

export async function getAffiliateLinkById(linkId: string) {
  const supabase = createAdminClient();

  const { data: link, error } = await supabase
    .from("affiliate_links")
    .select("*")
    .eq("id", linkId)
    .single();

  if (error) {
    console.error("Error fetching affiliate link:", error);
    throw new Error(`Failed to fetch affiliate link: ${error.message}`);
  }

  return link;
}

