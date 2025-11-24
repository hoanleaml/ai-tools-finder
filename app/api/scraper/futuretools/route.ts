import { NextRequest, NextResponse } from "next/server";
import { scrapeFutureTools, scrapeAllPages } from "@/lib/scraper/futuretools-scraper";
import { saveScrapedTools } from "@/lib/scraper/save-scraped-tools";

/**
 * GET /api/scraper/futuretools
 * Scrapes tools from FutureTools.io
 * 
 * Query parameters:
 * - page: Page number to scrape (default: 1)
 * - all: If "true", scrape all pages (default: false)
 * - save: If "true", save scraped tools to database (default: false)
 * - skipDuplicates: If "true", skip tools that already exist (default: true)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageParam = searchParams.get("page");
    const allParam = searchParams.get("all");
    const saveParam = searchParams.get("save");
    const skipDuplicatesParam = searchParams.get("skipDuplicates");

    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const scrapeAll = allParam === "true";
    const shouldSave = saveParam === "true";
    const skipDuplicates = skipDuplicatesParam !== "false"; // Default true

    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 }
      );
    }

    let scrapeResult;

    if (scrapeAll) {
      console.log("Starting full scrape of FutureTools.io...");
      scrapeResult = await scrapeAllPages({
        delayBetweenRequests: 2000, // 2 seconds between pages
        maxRetries: 3,
        timeout: 30000,
      });
    } else {
      console.log(`Scraping FutureTools.io page ${page}...`);
      scrapeResult = await scrapeFutureTools(page, {
        delayBetweenRequests: 2000,
        maxRetries: 3,
        timeout: 30000,
      });
    }

    let saveResult = null;

    // Save to database if requested
    if (shouldSave && scrapeResult.tools.length > 0) {
      console.log(`Saving ${scrapeResult.tools.length} tools to database...`);
      saveResult = await saveScrapedTools(scrapeResult.tools, {
        skipDuplicates,
        updateExisting: false,
      });
      console.log(
        `Saved ${saveResult.saved} tools, skipped ${saveResult.skipped}`
      );
    }

    return NextResponse.json({
      success: true,
      scrape: {
        ...scrapeResult,
        scrapedAt: new Date().toISOString(),
      },
      save: saveResult,
    });
  } catch (error) {
    console.error("Error in FutureTools scraper API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/scraper/futuretools
 * Manually trigger scraping job
 * 
 * Body parameters:
 * - page: Page number to scrape (default: 1)
 * - all: If true, scrape all pages (default: false)
 * - save: If true, save scraped tools to database (default: false)
 * - skipDuplicates: If true, skip tools that already exist (default: true)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { page, all, save, skipDuplicates } = body;

    const pageNum = page || 1;
    const scrapeAll = all === true;
    const shouldSave = save === true;
    const skipDups = skipDuplicates !== false; // Default true

    if (isNaN(pageNum) || pageNum < 1) {
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 }
      );
    }

    let scrapeResult;

    if (scrapeAll) {
      console.log("Starting full scrape of FutureTools.io (POST)...");
      scrapeResult = await scrapeAllPages({
        delayBetweenRequests: 2000,
        maxRetries: 3,
        timeout: 30000,
      });
    } else {
      console.log(`Scraping FutureTools.io page ${pageNum} (POST)...`);
      scrapeResult = await scrapeFutureTools(pageNum, {
        delayBetweenRequests: 2000,
        maxRetries: 3,
        timeout: 30000,
      });
    }

    let saveResult = null;

    // Save to database if requested
    if (shouldSave && scrapeResult.tools.length > 0) {
      console.log(`Saving ${scrapeResult.tools.length} tools to database (POST)...`);
      saveResult = await saveScrapedTools(scrapeResult.tools, {
        skipDuplicates: skipDups,
        updateExisting: false,
      });
      console.log(
        `Saved ${saveResult.saved} tools, skipped ${saveResult.skipped}`
      );
    }

    return NextResponse.json({
      success: true,
      scrape: {
        ...scrapeResult,
        scrapedAt: new Date().toISOString(),
      },
      save: saveResult,
    });
  } catch (error) {
    console.error("Error in FutureTools scraper API (POST):", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

