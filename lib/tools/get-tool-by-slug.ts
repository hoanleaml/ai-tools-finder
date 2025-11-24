import { createClient } from "@/lib/supabase/server";
import type { Tool } from "./get-tools";

/**
 * Fetch a single tool by slug
 */
export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .eq("slug", slug)
    .eq("status", "active")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned
      return null;
    }
    console.error("Error fetching tool by slug:", error);
    throw new Error(`Failed to fetch tool: ${error.message}`);
  }

  return data as Tool;
}

