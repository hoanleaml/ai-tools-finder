import { createAdminClient } from "@/lib/supabase/admin";
import { affiliateLinkSchema, type AffiliateLinkFormData } from "./affiliate-link-schema";

export async function createAffiliateLink(data: AffiliateLinkFormData) {
  const validatedData = affiliateLinkSchema.parse(data);

  const supabase = createAdminClient();

  // Check if tool already has an active affiliate link
  const { data: existingLink } = await supabase
    .from("affiliate_links")
    .select("id")
    .eq("tool_id", validatedData.tool_id)
    .eq("status", "active")
    .maybeSingle();

  if (existingLink && validatedData.status === "active") {
    throw new Error("Tool already has an active affiliate link");
  }

  // Insert affiliate link
  const { data: link, error } = await supabase
    .from("affiliate_links")
    .insert({
      tool_id: validatedData.tool_id,
      affiliate_url: validatedData.affiliate_url,
      program_name: validatedData.program_name || null,
      commission_rate: validatedData.commission_rate || null,
      status: validatedData.status,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating affiliate link:", error);
    throw new Error(`Failed to create affiliate link: ${error.message}`);
  }

  return link;
}

