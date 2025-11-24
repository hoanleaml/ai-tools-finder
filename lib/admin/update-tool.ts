import { createAdminClient } from "@/lib/supabase/admin";
import { toolFormSchema, type ToolFormData } from "./tool-form-schema";
import { generateSlug } from "@/lib/utils/generate-slug";

export async function updateTool(toolId: string, data: ToolFormData) {
  // Validate data
  const validatedData = toolFormSchema.parse(data);

  const supabase = createAdminClient();

  // Check if name changed, regenerate slug if needed
  const { data: existingTool } = await supabase
    .from("tools")
    .select("name, slug")
    .eq("id", toolId)
    .single();

  let slug = existingTool?.slug;
  if (existingTool && existingTool.name !== validatedData.name) {
    // Name changed, regenerate slug
    slug = generateSlug(validatedData.name);

    // Check if new slug already exists
    const { data: slugExists } = await supabase
      .from("tools")
      .select("id")
      .eq("slug", slug)
      .neq("id", toolId)
      .single();

    if (slugExists) {
      // Append timestamp to make it unique
      slug = `${slug}-${Date.now()}`;
    }
  }

  // Update tool
  const { data: tool, error } = await supabase
    .from("tools")
    .update({
      name: validatedData.name,
      description: validatedData.description || null,
      website_url: validatedData.website_url,
      logo_url: validatedData.logo_url || null,
      category_id: validatedData.category_id || null,
      pricing_model: validatedData.pricing_model || null,
      features: validatedData.features || null,
      status: validatedData.status,
      slug: slug || undefined,
      updated_at: new Date().toISOString(),
    })
    .eq("id", toolId)
    .select()
    .single();

  if (error) {
    console.error("Error updating tool:", error);
    throw new Error(`Failed to update tool: ${error.message}`);
  }

  return tool;
}

