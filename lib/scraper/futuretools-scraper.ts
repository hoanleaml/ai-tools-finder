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
    // Support both base URL and specific paths like /newly-added
    let url: string;
    if (finalConfig.baseUrl.includes("/newly-added")) {
      // For /newly-added page, don't add page parameter
      url = finalConfig.baseUrl;
    } else {
      // For main listing page, use pagination
      url = page === 1 
        ? `${finalConfig.baseUrl}`
        : `${finalConfig.baseUrl}?page=${page}`;
    }

    // Fetch page with retry logic
    const html = await fetchWithRetry(url, finalConfig.maxRetries, finalConfig.timeout);
    
    if (!html) {
      errors.push(`Failed to fetch page ${page} after ${finalConfig.maxRetries} retries`);
      return { tools, totalPages: 0, currentPage: page, errors };
    }

    // Parse HTML
    const $ = cheerio.load(html);
    
    // Extract tools from the page
    // FutureTools.io uses: <div role="listitem" class="tool tool-home w-dyn-item w-col w-col-4">
    const toolSelectors = [
      ".tool.tool-home", // Primary selector for FutureTools.io
      ".tool[role='listitem']", // Alternative
      ".tool", // Fallback
      ".tool-card",
      ".product-card",
      "[data-tool]",
    ];

    let foundTools = false;
    // Create a new cheerio instance for use in callbacks to avoid Root type issue
    const cheerioApi = cheerio.load(html);
    for (const selector of toolSelectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        console.log(`Found ${elements.length} tools using selector: ${selector}`);
        elements.each((index, element) => {
          try {
            const tool = extractToolData(cheerioApi as cheerio.CheerioAPI, element, finalConfig.baseUrl);
            if (tool) {
              tools.push(tool);
            }
          } catch (error) {
            errors.push(`Error extracting tool ${index}: ${error instanceof Error ? error.message : String(error)}`);
          }
        });
        foundTools = true;
        break; // Use first selector that finds elements
      }
    }

    // Remove duplicates based on sourceUrl (same tool detail page)
    const uniqueTools: FutureToolsTool[] = [];
    const seenSourceUrls = new Set<string>();
    
    for (const tool of tools) {
      if (tool.sourceUrl && !seenSourceUrls.has(tool.sourceUrl)) {
        seenSourceUrls.add(tool.sourceUrl);
        uniqueTools.push(tool);
      } else if (!tool.sourceUrl && !seenSourceUrls.has(tool.name)) {
        // Fallback: use name if no sourceUrl
        seenSourceUrls.add(tool.name);
        uniqueTools.push(tool);
      }
    }
    
    // Replace tools array with deduplicated version
    tools.length = 0;
    tools.push(...uniqueTools);

    // Determine total pages (if pagination exists)
    const totalPages = extractTotalPages(cheerioApi as cheerio.CheerioAPI);

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
function extractToolData(cheerioApi: cheerio.CheerioAPI, element: cheerio.Element, baseUrl: string = "https://www.futuretools.io"): FutureToolsTool | null {
  const $element = cheerioApi(element);
  try {
    // Tool name - FutureTools.io structure: <a href="/tools/alloy" class="tool-item-link---new">
    const name = 
      $element.find("a.tool-item-link---new").first().text().trim() ||
      $element.find("h2, h3, .tool-name").first().text().trim() ||
      $element.find("a[href^='/tools/']").first().text().trim() ||
      "";

    if (!name) {
      return null;
    }

    // Description - FutureTools.io: <div class="tool-item-description-box---new">
    const description = 
      $element.find(".tool-item-description-box---new").first().text().trim() ||
      $element.find(".description, .tool-description").first().text().trim() ||
      "";

    // Website URL - FutureTools.io uses affiliate links: <a href="https://futuretools.link/..." class="tool-item-new-window---new">
    // Note: These are affiliate links, we'll need to visit tool detail page for actual URL
    // For now, we'll use the affiliate link but mark it
    const affiliateLink = $element.find("a.tool-item-new-window---new").first().attr("href") || "";
    
    // Try to find actual website URL (might not be available on listing page)
    const websiteUrl = 
      affiliateLink ||
      $element.find("a[href^='http']").not("[href*='futuretools.io']").not("[href*='futuretools.link']").first().attr("href") ||
      "";

    if (!websiteUrl) {
      return null;
    }

    // Logo/image URL - FutureTools.io: <img class="tool-item-image---new tool-item-image---home" src="...">
    const logoSelectors = [
      "img.tool-item-image---new",
      "img.tool-item-image---home",
      "img[src]",
      "img[data-src]",
      "img[data-lazy-src]",
    ];

    let logoUrl: string | null = null;
    for (const selector of logoSelectors) {
      const img = $element.find(selector).first();
      const src = img.attr("src") || img.attr("data-src") || img.attr("data-lazy-src");
      if (src && src.length > 0 && !src.includes("placeholder")) {
        logoUrl = src;
        break;
      }
    }

    // Category - try multiple selectors
    const categorySelectors = [
      ".category",
      ".tag",
      ".badge",
      "[data-category]",
      ".tool-category",
      ".product-category",
      "[class*='category']",
    ];

    let category: string | null = null;
    for (const selector of categorySelectors) {
      const found = $element.find(selector).first().text().trim();
      if (found && found.length > 0 && found.length < 100) {
        category = found;
        break;
      }
    }

    // Launch date - try multiple formats
    const dateSelectors = [
      "[data-date]",
      "[datetime]",
      ".date",
      "time",
      "[data-launch-date]",
      ".launch-date",
    ];

    let launchDate: string | null = null;
    for (const selector of dateSelectors) {
      const element = $element.find(selector).first();
      const dateValue = element.attr("datetime") || element.attr("data-date") || element.text().trim();
      if (dateValue && dateValue.length > 0) {
        launchDate = dateValue;
        break;
      }
    }

    // Source URL (FutureTools.io page) - FutureTools.io: <a href="/tools/alloy" class="tool-item-link---new">
    const sourceUrlSelectors = [
      "a.tool-item-link---new[href^='/tools/']",
      "a[href^='/tools/']",
      "a[href*='futuretools.io/tools/']",
    ];

    let sourceUrl = "";
    for (const selector of sourceUrlSelectors) {
      const found = $element.find(selector).first().attr("href");
      if (found) {
        sourceUrl = found.startsWith("http") ? found : `${baseUrl}${found}`;
        break;
      }
    }
    
    // If no source URL found, try to construct from name
    if (!sourceUrl && name) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      sourceUrl = `${baseUrl}/tools/${slug}`;
    }

    return {
      name,
      description,
      websiteUrl: websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`,
      logoUrl: logoUrl ? (logoUrl.startsWith("http") ? logoUrl : `${baseUrl}${logoUrl}`) : null,
      category,
      launchDate,
      sourceUrl: sourceUrl.startsWith("http") ? sourceUrl : `${baseUrl}${sourceUrl}`,
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

