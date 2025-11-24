import { NextRequest, NextResponse } from "next/server";
import { scrapeFutureTools, scrapeAllPages } from "@/lib/scraper/futuretools-scraper";

/**
 * GET /api/scraper/futuretools
 * Scrapes tools from FutureTools.io
 * 
 * Query parameters:
 * - page: Page number to scrape (default: 1)
 * - all: If "true", scrape all pages (default: false)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageParam = searchParams.get("page");
    const allParam = searchParams.get("all");

    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const scrapeAll = allParam === "true";

    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 }
      );
    }

    let result;

    if (scrapeAll) {
      console.log("Starting full scrape of FutureTools.io...");
      result = await scrapeAllPages({
        delayBetweenRequests: 2000, // 2 seconds between pages
        maxRetries: 3,
        timeout: 30000,
      });
    } else {
      console.log(`Scraping FutureTools.io page ${page}...`);
      result = await scrapeFutureTools(page, {
        delayBetweenRequests: 2000,
        maxRetries: 3,
        timeout: 30000,
      });
    }

    return NextResponse.json({
      success: true,
      ...result,
      scrapedAt: new Date().toISOString(),
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
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { page, all } = body;

    const pageNum = page || 1;
    const scrapeAll = all === true;

    if (isNaN(pageNum) || pageNum < 1) {
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 }
      );
    }

    let result;

    if (scrapeAll) {
      console.log("Starting full scrape of FutureTools.io (POST)...");
      result = await scrapeAllPages({
        delayBetweenRequests: 2000,
        maxRetries: 3,
        timeout: 30000,
      });
    } else {
      console.log(`Scraping FutureTools.io page ${pageNum} (POST)...`);
      result = await scrapeFutureTools(pageNum, {
        delayBetweenRequests: 2000,
        maxRetries: 3,
        timeout: 30000,
      });
    }

    return NextResponse.json({
      success: true,
      ...result,
      scrapedAt: new Date().toISOString(),
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

