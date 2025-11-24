import * as cheerio from "cheerio";

export interface FutureToolsTool {
  name: string;
  description: string;
  websiteUrl: string;
  logoUrl: string | null;
  category: string | null;
  launchDate: string | null;
  sourceUrl: string; // URL on FutureTools.io
}

export interface ScrapeResult {
  tools: FutureToolsTool[];
  totalPages: number;
  currentPage: number;
  errors: string[];
}

export interface ScraperConfig {
  baseUrl?: string;
  delayBetweenRequests?: number; // milliseconds
  maxRetries?: number;
  timeout?: number; // milliseconds
}

const DEFAULT_CONFIG: Required<ScraperConfig> = {
  baseUrl: "https://www.futuretools.io",
  delayBetweenRequests: 2000, // 2 seconds
  maxRetries: 3,
  timeout: 30000, // 30 seconds
};

/**
 * Scrapes tools from FutureTools.io
 * @param page Page number to scrape (default: 1)
 * @param config Scraper configuration
 * @returns ScrapeResult with tools and metadata
 */
export async function scrapeFutureTools(
  page: number = 1,
  config: ScraperConfig = {}
): Promise<ScrapeResult> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const errors: string[] = [];
  const tools: FutureToolsTool[] = [];

  try {
    // Construct URL - FutureTools.io uses pagination
    const url = page === 1 
      ? `${finalConfig.baseUrl}`
      : `${finalConfig.baseUrl}?page=${page}`;

    // Fetch page with retry logic
    const html = await fetchWithRetry(url, finalConfig.maxRetries, finalConfig.timeout);
    
    if (!html) {
      errors.push(`Failed to fetch page ${page} after ${finalConfig.maxRetries} retries`);
      return { tools, totalPages: 0, currentPage: page, errors };
    }

    // Parse HTML
    const $ = cheerio.load(html);
    
    // Extract tools from the page
    // Note: This selector needs to be updated based on actual FutureTools.io HTML structure
    $(".tool-card, .product-card, [data-tool]").each((index, element) => {
      try {
        const tool = extractToolData($, $(element));
        if (tool) {
          tools.push(tool);
        }
      } catch (error) {
        errors.push(`Error extracting tool ${index}: ${error instanceof Error ? error.message : String(error)}`);
      }
    });

    // Determine total pages (if pagination exists)
    const totalPages = extractTotalPages($);

    return {
      tools,
      totalPages,
      currentPage: page,
      errors,
    };
  } catch (error) {
    errors.push(`Scraping error: ${error instanceof Error ? error.message : String(error)}`);
    return {
      tools,
      totalPages: 0,
      currentPage: page,
      errors,
    };
  }
}

/**
 * Extract tool data from a single tool element
 */
function extractToolData($: cheerio.CheerioAPI, $element: cheerio.Cheerio<cheerio.Element>): FutureToolsTool | null {
  try {
    // Tool name - try multiple selectors
    const name = 
      $element.find("h2, h3, .tool-name, [data-name]").first().text().trim() ||
      $element.find("a").first().text().trim();

    if (!name) {
      return null;
    }

    // Description
    const description = 
      $element.find(".description, .tool-description, p").first().text().trim() ||
      $element.find("[data-description]").text().trim() ||
      "";

    // Website URL - usually in a link
    const websiteUrl = 
      $element.find("a[href^='http']").not("[href*='futuretools.io']").first().attr("href") ||
      $element.find("[data-url]").attr("data-url") ||
      "";

    if (!websiteUrl) {
      return null;
    }

    // Logo/image URL
    const logoUrl = 
      $element.find("img").first().attr("src") ||
      $element.find("img").first().attr("data-src") ||
      null;

    // Category - might be in a badge or tag
    const category = 
      $element.find(".category, .tag, .badge, [data-category]").first().text().trim() ||
      null;

    // Launch date - might be in a date element
    const launchDate = 
      $element.find("[data-date], .date, time").first().attr("datetime") ||
      $element.find("[data-date], .date, time").first().text().trim() ||
      null;

    // Source URL (FutureTools.io page)
    const sourceUrl = 
      $element.find("a[href*='futuretools.io']").first().attr("href") ||
      "";

    return {
      name,
      description,
      websiteUrl: websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`,
      logoUrl: logoUrl ? (logoUrl.startsWith("http") ? logoUrl : `https://www.futuretools.io${logoUrl}`) : null,
      category,
      launchDate,
      sourceUrl: sourceUrl.startsWith("http") ? sourceUrl : `https://www.futuretools.io${sourceUrl}`,
    };
  } catch (error) {
    console.error("Error extracting tool data:", error);
    return null;
  }
}

/**
 * Extract total number of pages from pagination
 */
function extractTotalPages($: cheerio.CheerioAPI): number {
  try {
    // Try to find pagination element
    const paginationText = $(".pagination, .page-numbers, [data-pages]").text();
    const pageMatches = paginationText.match(/(\d+)\s*(?:of|total|pages?)/i);
    
    if (pageMatches) {
      return parseInt(pageMatches[1], 10);
    }

    // Try to find last page number
    const lastPageLink = $(".pagination a, .page-numbers a").last().text();
    const lastPage = parseInt(lastPageLink, 10);
    
    if (!isNaN(lastPage)) {
      return lastPage;
    }

    return 1; // Default to 1 page if can't determine
  } catch (error) {
    console.error("Error extracting total pages:", error);
    return 1;
  }
}

/**
 * Fetch HTML with retry logic and exponential backoff
 */
async function fetchWithRetry(
  url: string,
  maxRetries: number,
  timeout: number
): Promise<string | null> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; AI Tools Finder Bot/1.0)",
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't retry on abort (timeout)
      if (error instanceof Error && error.name === "AbortError") {
        break;
      }

      // Exponential backoff: wait 2^attempt seconds
      if (attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  console.error(`Failed to fetch ${url} after ${maxRetries} attempts:`, lastError);
  return null;
}

/**
 * Scrape all pages (with rate limiting)
 */
export async function scrapeAllPages(
  config: ScraperConfig = {}
): Promise<{ tools: FutureToolsTool[]; errors: string[] }> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const allTools: FutureToolsTool[] = [];
  const allErrors: string[] = [];

  // Start with first page to determine total pages
  const firstPageResult = await scrapeFutureTools(1, finalConfig);
  allTools.push(...firstPageResult.tools);
  allErrors.push(...firstPageResult.errors);

  const totalPages = firstPageResult.totalPages || 1;

  // Scrape remaining pages with delay
  for (let page = 2; page <= totalPages; page++) {
    // Rate limiting delay
    await new Promise((resolve) => 
      setTimeout(resolve, finalConfig.delayBetweenRequests)
    );

    const pageResult = await scrapeFutureTools(page, finalConfig);
    allTools.push(...pageResult.tools);
    allErrors.push(...pageResult.errors);
  }

  return {
    tools: allTools,
    errors: allErrors,
  };
}

