import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * GET /api/admin/scraping-jobs
 * 
 * Get scraping jobs history for admin dashboard
 * Requires admin authentication
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin access
    await requireAdmin();

    const supabase = createAdminClient();
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const status = searchParams.get("status");

    let query = supabase
      .from("scraping_jobs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    // Filter by status if provided
    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data: jobs, error } = await query;

    if (error) {
      console.error("Error fetching scraping jobs:", error);
      return NextResponse.json(
        { error: "Failed to fetch scraping jobs" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      jobs: jobs || [],
      count: jobs?.length || 0,
    });
  } catch (error) {
    console.error("Error in scraping-jobs API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

