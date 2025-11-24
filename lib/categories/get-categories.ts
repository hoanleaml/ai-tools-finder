import { createClient } from "@/lib/supabase/server";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch all categories from Supabase
 */
export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }

  return (data || []) as Category[];
}

