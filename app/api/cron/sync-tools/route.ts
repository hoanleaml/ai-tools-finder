import { NextRequest, NextResponse } from "next/server";
import { scrapeFutureTools } from "@/lib/scraper/futuretools-scraper";
import { saveScrapedTools } from "@/lib/scraper/save-scraped-tools";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * POST /api/cron/sync-tools
 * 
 * Daily cron job to sync newly added tools from FutureTools.io/newly-added
 * 
 * This endpoint:
 * 1. Scrapes the /newly-added page
 * 2. Compares with existing tools in database
 * 3. Saves only new tools
 * 4. Logs results
 * 
 * Authentication: Protected by Vercel Cron secret
 */
export async function POST(request: NextRequest) {
  try {
    // Verify cron secret (Vercel Cron Jobs send this header)
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const startTime = Date.now();
    const jobId = `sync-${Date.now()}`;
    
    console.log(`[${jobId}] Starting sync job for newly-added tools...`);

    // Step 1: Scrape /newly-added page
    // Note: FutureTools.io uses /newly-added URL
    const scrapeResult = await scrapeFutureTools(1, {
      baseUrl: "https://www.futuretools.io/newly-added",
      delayBetweenRequests: 2000,
      maxRetries: 3,
      timeout: 30000,
    });

    console.log(`[${jobId}] Scraped ${scrapeResult.tools.length} tools from newly-added page`);

    if (scrapeResult.errors.length > 0) {
      console.warn(`[${jobId}] Scraping errors:`, scrapeResult.errors);
    }

    // Step 2: Save new tools (skipDuplicates is true by default)
    let saveResult = null;
    if (scrapeResult.tools.length > 0) {
      console.log(`[${jobId}] Saving ${scrapeResult.tools.length} tools to database...`);
      saveResult = await saveScrapedTools(scrapeResult.tools, true); // skipDuplicates = true
    } else {
      saveResult = {
        saved: 0,
        skipped: 0,
        errors: [],
      };
    }

    const duration = Date.now() - startTime;

    // Step 3: Log job results to database (if scraping_jobs table exists)
    try {
      const supabase = createAdminClient();
      await supabase.from("scraping_jobs").insert({
        job_id: jobId,
        job_type: "newly_added_sync",
        status: saveResult.errors.length > 0 ? "partial_success" : "success",
        tools_found: scrapeResult.tools.length,
        tools_saved: saveResult.saved,
        tools_skipped: saveResult.skipped,
        errors: saveResult.errors.length > 0 ? saveResult.errors : null,
        duration_ms: duration,
        started_at: new Date(startTime).toISOString(),
        completed_at: new Date().toISOString(),
      });
    } catch (error) {
      // scraping_jobs table might not exist yet, log to console
      console.warn(`[${jobId}] Could not log to scraping_jobs table:`, error);
    }

    const result = {
      success: true,
      jobId,
      duration: `${duration}ms`,
      scrape: {
        toolsFound: scrapeResult.tools.length,
        errors: scrapeResult.errors.length,
      },
      save: {
        saved: saveResult.saved,
        skipped: saveResult.skipped,
        errors: saveResult.errors.length,
        errorDetails: saveResult.errors,
      },
      timestamp: new Date().toISOString(),
    };

    console.log(`[${jobId}] Sync completed:`, result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in sync-tools cron job:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/cron/sync-tools
 * 
 * Manual trigger for testing (requires CRON_SECRET)
 */
export async function GET(request: NextRequest) {
  // For testing, allow GET with secret query param
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && secret !== cronSecret) {
    return NextResponse.json(
      { error: "Unauthorized. Provide ?secret=CRON_SECRET" },
      { status: 401 }
    );
  }

  // Convert GET to POST logic
  return POST(request);
}

