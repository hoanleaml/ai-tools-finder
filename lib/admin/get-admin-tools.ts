import { createClient } from "@/lib/supabase/server";

export interface AdminTool {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  website_url: string;
  logo_url: string | null;
  category_id: string | null;
  category_name: string | null;
  pricing_model: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  has_affiliate: boolean;
}

export interface AdminToolsResponse {
  tools: AdminTool[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getAdminTools(
  page: number = 1,
  limit: number = 20,
  search?: string,
  status?: string,
  categoryId?: string,
  sortBy: string = "created_at",
  sortOrder: "asc" | "desc" = "desc"
): Promise<AdminToolsResponse> {
  const supabase = await createClient();
  const offset = (page - 1) * limit;

  // Build query
  let query = supabase
    .from("tools")
    .select(
      `
      id,
      name,
      slug,
      description,
      website_url,
      logo_url,
      category_id,
      pricing_model,
      status,
      created_at,
      updated_at,
      categories (
        name
      )
    `,
      { count: "exact" }
    );

  // Apply filters
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }

  if (status) {
    query = query.eq("status", status);
  }

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  // Apply sorting
  query = query.order(sortBy, { ascending: sortOrder === "asc" });

  // Apply pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching admin tools:", error);
    throw error;
  }

  // Get affiliate links to check which tools have affiliates
  const { data: affiliateLinks } = await supabase
    .from("affiliate_links")
    .select("tool_id")
    .eq("status", "active");

  const toolsWithAffiliate = new Set(
    affiliateLinks?.map((link) => link.tool_id) || []
  );

  // Transform data
  const tools: AdminTool[] =
    data?.map((tool) => ({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      description: tool.description,
      website_url: tool.website_url,
      logo_url: tool.logo_url,
      category_id: tool.category_id,
      category_name: (tool.categories as any)?.name || null,
      pricing_model: tool.pricing_model,
      status: tool.status,
      created_at: tool.created_at,
      updated_at: tool.updated_at,
      has_affiliate: toolsWithAffiliate.has(tool.id),
    })) || [];

  const total = count || 0;
  const totalPages = Math.ceil(total / limit);

  return {
    tools,
    total,
    page,
    limit,
    totalPages,
  };
}

