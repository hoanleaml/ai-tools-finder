import { createAdminClient } from "@/lib/supabase/admin";
import { toolFormSchema, type ToolFormData } from "./tool-form-schema";
import { generateSlug } from "@/lib/utils/generate-slug";

export async function createTool(data: ToolFormData) {
  // Validate data
  const validatedData = toolFormSchema.parse(data);

  // Generate slug from name
  const slug = generateSlug(validatedData.name);

  // Check if slug already exists
  const supabase = createAdminClient();
  const { data: existingTool } = await supabase
    .from("tools")
    .select("id")
    .eq("slug", slug)
    .single();

  if (existingTool) {
    // Append timestamp to make it unique
    const uniqueSlug = `${slug}-${Date.now()}`;
    validatedData.slug = uniqueSlug;
  } else {
    validatedData.slug = slug;
  }

  // Insert tool
  const { data: tool, error } = await supabase
    .from("tools")
    .insert({
      name: validatedData.name,
      description: validatedData.description || null,
      website_url: validatedData.website_url,
      logo_url: validatedData.logo_url || null,
      category_id: validatedData.category_id || null,
      pricing_model: validatedData.pricing_model || null,
      features: validatedData.features || null,
      status: validatedData.status,
      slug: slug,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating tool:", error);
    throw new Error(`Failed to create tool: ${error.message}`);
  }

  return tool;
}

