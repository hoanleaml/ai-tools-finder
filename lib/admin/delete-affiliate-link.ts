import { createAdminClient } from "@/lib/supabase/admin";

export async function deleteAffiliateLink(linkId: string) {
  const supabase = createAdminClient();

  const { error } = await supabase.from("affiliate_links").delete().eq("id", linkId);

  if (error) {
    console.error("Error deleting affiliate link:", error);
    throw new Error(`Failed to delete affiliate link: ${error.message}`);
  }

  return { success: true };
}

