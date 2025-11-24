import { createClient } from "@/lib/supabase/server";
import type { Tool } from "./get-tools";

/**
 * Fetch related tools (same category, excluding current tool)
 */
export async function getRelatedTools(
  categoryId: string | null,
  currentToolId: string,
  limit: number = 4
): Promise<Tool[]> {
  const supabase = await createClient();

  if (!categoryId) {
    // If no category, return empty array
    return [];
  }

  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .eq("category_id", categoryId)
    .eq("status", "active")
    .neq("id", currentToolId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching related tools:", error);
    return [];
  }

  return (data || []) as Tool[];
}

