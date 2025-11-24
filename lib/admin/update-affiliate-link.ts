import { createAdminClient } from "@/lib/supabase/admin";
import { affiliateLinkSchema, type AffiliateLinkFormData } from "./affiliate-link-schema";

export async function updateAffiliateLink(
  linkId: string,
  data: AffiliateLinkFormData
) {
  const validatedData = affiliateLinkSchema.parse(data);

  const supabase = createAdminClient();

  // If setting to active, check if tool already has another active link
  if (validatedData.status === "active") {
    const { data: existingLink } = await supabase
      .from("affiliate_links")
      .select("id")
      .eq("tool_id", validatedData.tool_id)
      .eq("status", "active")
      .neq("id", linkId)
      .maybeSingle();

    if (existingLink) {
      throw new Error("Tool already has another active affiliate link");
    }
  }

  // Update affiliate link
  const { data: link, error } = await supabase
    .from("affiliate_links")
    .update({
      tool_id: validatedData.tool_id,
      affiliate_url: validatedData.affiliate_url,
      program_name: validatedData.program_name || null,
      commission_rate: validatedData.commission_rate || null,
      status: validatedData.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", linkId)
    .select()
    .single();

  if (error) {
    console.error("Error updating affiliate link:", error);
    throw new Error(`Failed to update affiliate link: ${error.message}`);
  }

  return link;
}

