import { createAdminClient } from "@/lib/supabase/admin";

export interface AdminAffiliateLink {
  id: string;
  tool_id: string;
  tool_name: string;
  affiliate_url: string;
  program_name: string | null;
  commission_rate: number | null;
  status: string;
  created_at: string;
  updated_at: string;
  click_count: number;
}

export interface AffiliateLinksResponse {
  links: AdminAffiliateLink[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getAffiliateLinks(
  page: number = 1,
  limit: number = 20,
  toolId?: string,
  status?: string,
  search?: string
): Promise<AffiliateLinksResponse> {
  const supabase = createAdminClient();
  const offset = (page - 1) * limit;

  // Build query
  let query = supabase
    .from("affiliate_links")
    .select(
      `
      id,
      tool_id,
      affiliate_url,
      program_name,
      commission_rate,
      status,
      created_at,
      updated_at,
      tools (
        name
      )
    `,
      { count: "exact" }
    );

  // Apply filters
  if (toolId) {
    query = query.eq("tool_id", toolId);
  }

  if (status) {
    query = query.eq("status", status);
  }

  if (search) {
    query = query.or(
      `affiliate_url.ilike.%${search}%,program_name.ilike.%${search}%`
    );
  }

  // Order by created_at desc
  query = query.order("created_at", { ascending: false });

  // Apply pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching affiliate links:", error);
    throw error;
  }

  // Get click counts for each affiliate link
  const linkIds = data?.map((link) => link.id) || [];
  const { data: clicks } = await supabase
    .from("affiliate_clicks")
    .select("affiliate_link_id")
    .in("affiliate_link_id", linkIds);

  const clickCounts = new Map<string, number>();
  clicks?.forEach((click) => {
    if (click.affiliate_link_id) {
      clickCounts.set(
        click.affiliate_link_id,
        (clickCounts.get(click.affiliate_link_id) || 0) + 1
      );
    }
  });

  // Transform data
  const links: AdminAffiliateLink[] =
    data?.map((link) => ({
      id: link.id,
      tool_id: link.tool_id,
      tool_name: (link.tools as any)?.name || "Unknown",
      affiliate_url: link.affiliate_url,
      program_name: link.program_name,
      commission_rate: link.commission_rate,
      status: link.status,
      created_at: link.created_at,
      updated_at: link.updated_at,
      click_count: clickCounts.get(link.id) || 0,
    })) || [];

  const total = count || 0;
  const totalPages = Math.ceil(total / limit);

  return {
    links,
    total,
    page,
    limit,
    totalPages,
  };
}

