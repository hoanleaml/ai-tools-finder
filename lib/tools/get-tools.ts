import { createClient } from "@/lib/supabase/server";

export interface Tool {
  id: string;
  name: string;
  description: string | null;
  website_url: string;
  logo_url: string | null;
  category_id: string | null;
  pricing_model: string | null;
  features: string[] | null;
  slug: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface GetToolsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  status?: string;
  search?: string;
  pricingModel?: string;
}

export interface GetToolsResult {
  tools: Tool[];
  total: number;
  page: number;
  totalPages: number;
}

const DEFAULT_LIMIT = 24;
const DEFAULT_PAGE = 1;

/**
 * Fetch paginated tools from Supabase
 */
export async function getTools(
  params: GetToolsParams = {}
): Promise<GetToolsResult> {
  const {
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
    categoryId,
    status = "active",
    search,
    pricingModel,
  } = params;

  const supabase = await createClient();

  // Calculate offset
  const offset = (page - 1) * limit;

  // Build query
  let query = supabase
    .from("tools")
    .select("*", { count: "exact" })
    .eq("status", status);

  // Apply search filter if provided
  if (search && search.trim()) {
    const searchTerm = `%${search.trim()}%`;
    // Use PostgreSQL ilike for case-insensitive search
    // Search in name and description
    // Note: Features search would require more complex JSONB queries
    query = query.or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`);
  }

  // Apply category filter if provided
  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  // Apply pricing model filter if provided
  if (pricingModel) {
    query = query.eq("pricing_model", pricingModel);
  }

  // Order and paginate
  query = query.order("created_at", { ascending: false }).range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching tools:", error);
    throw new Error(`Failed to fetch tools: ${error.message}`);
  }

  const tools = (data || []) as Tool[];
  const total = count || 0;
  const totalPages = Math.ceil(total / limit);

  return {
    tools,
    total,
    page,
    totalPages,
  };
}

/**
 * Get total count of active tools
 */
export async function getToolsCount(status: string = "active"): Promise<number> {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("tools")
    .select("*", { count: "exact", head: true })
    .eq("status", status);

  if (error) {
    console.error("Error fetching tools count:", error);
    return 0;
  }

  return count || 0;
}

