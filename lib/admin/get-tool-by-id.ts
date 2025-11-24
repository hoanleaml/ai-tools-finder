import { createAdminClient } from "@/lib/supabase/admin";

export async function getToolById(toolId: string) {
  const supabase = createAdminClient();

  const { data: tool, error } = await supabase
    .from("tools")
    .select("*")
    .eq("id", toolId)
    .single();

  if (error) {
    console.error("Error fetching tool:", error);
    throw new Error(`Failed to fetch tool: ${error.message}`);
  }

  return tool;
}

