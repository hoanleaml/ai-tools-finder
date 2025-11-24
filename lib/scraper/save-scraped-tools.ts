import { createAdminClient } from "@/lib/supabase/admin";
import { generateSlug } from "@/lib/utils/generate-slug";
import type { FutureToolsTool } from "./futuretools-scraper";

export interface SaveResult {
  saved: number;
  skipped: number;
  errors: string[];
  toolIds: string[];
}

/**
 * Check if a tool already exists in database by name or URL
 */
async function toolExists(name: string, websiteUrl: string): Promise<boolean> {
  const supabase = createAdminClient();

  // Check by name (case-insensitive, fuzzy match)
  const { data: byName } = await supabase
    .from("tools")
    .select("id")
    .ilike("name", name)
    .limit(1)
    .maybeSingle();

  if (byName) {
    return true;
  }

  // Check by website URL (exact match)
  const { data: byUrl } = await supabase
    .from("tools")
    .select("id")
    .eq("website_url", websiteUrl)
    .limit(1)
    .maybeSingle();

  return !!byUrl;
}

/**
 * Find category ID by name (case-insensitive)
 */
async function findCategoryId(categoryName: string | null): Promise<string | null> {
  if (!categoryName) {
    return null;
  }

  const supabase = createAdminClient();

  // Try exact match first
  const { data: exactMatch } = await supabase
    .from("categories")
    .select("id")
    .ilike("name", categoryName)
    .limit(1)
    .maybeSingle();

  if (exactMatch) {
    return exactMatch.id;
  }

  // Try fuzzy match (contains)
  const { data: fuzzyMatch } = await supabase
    .from("categories")
    .select("id")
    .ilike("name", `%${categoryName}%`)
    .limit(1)
    .maybeSingle();

  return fuzzyMatch?.id || null;
}

/**
 * Map scraped tool data to database schema
 */
function mapToDatabaseTool(
  scrapedTool: FutureToolsTool,
  categoryId: string | null
): {
  name: string;
  description: string | null;
  website_url: string;
  logo_url: string | null;
  category_id: string | null;
  pricing_model: string | null;
  features: string[] | null;
  slug: string;
  status: string;
} {
  // Generate slug from name
  let slug = generateSlug(scrapedTool.name);

  // Extract features from description (simple approach - can be enhanced)
  const features: string[] = [];
  if (scrapedTool.description) {
    // Try to extract features from description
    // This is a simple implementation - can be enhanced with AI/NLP
    const sentences = scrapedTool.description
      .split(/[.!?]\s+/)
      .filter((s) => s.length > 20 && s.length < 200);
    
    // Take first 3-5 sentences as features
    features.push(...sentences.slice(0, 5));
  }

  return {
    name: scrapedTool.name.trim(),
    description: scrapedTool.description.trim() || null,
    website_url: scrapedTool.websiteUrl,
    logo_url: scrapedTool.logoUrl,
    category_id: categoryId,
    pricing_model: null, // Will be set later or by admin
    features: features.length > 0 ? features : null,
    slug: slug,
    status: "pending", // New scraped tools start as pending for review
  };
}

/**
 * Save scraped tools to database
 * @param tools Array of scraped tools
 * @param options Options for saving
 * @returns SaveResult with statistics
 */
export async function saveScrapedTools(
  tools: FutureToolsTool[],
  options: {
    skipDuplicates?: boolean;
    updateExisting?: boolean;
  } = {}
): Promise<SaveResult> {
  const { skipDuplicates = true, updateExisting = false } = options;
  const supabase = createAdminClient();
  const result: SaveResult = {
    saved: 0,
    skipped: 0,
    errors: [],
    toolIds: [],
  };

  for (const scrapedTool of tools) {
    try {
      // Validate required fields
      if (!scrapedTool.name || !scrapedTool.websiteUrl) {
        result.errors.push(
          `Skipping tool: missing name or website URL (${scrapedTool.name || "unknown"})`
        );
        result.skipped++;
        continue;
      }

      // Check if tool already exists
      const exists = await toolExists(scrapedTool.name, scrapedTool.websiteUrl);

      if (exists) {
        if (skipDuplicates) {
          result.skipped++;
          continue;
        } else if (updateExisting) {
          // Update existing tool (optional - not implemented yet)
          result.errors.push(
            `Update existing tool not implemented yet (${scrapedTool.name})`
          );
          result.skipped++;
          continue;
        }
      }

      // Find category ID
      const categoryId = await findCategoryId(scrapedTool.category);

      // Map to database schema
      const dbTool = mapToDatabaseTool(scrapedTool, categoryId);

      // Ensure slug is unique
      let finalSlug = dbTool.slug;
      let slugAttempts = 0;
      while (slugAttempts < 10) {
        const { data: existingSlug } = await supabase
          .from("tools")
          .select("id")
          .eq("slug", finalSlug)
          .limit(1)
          .maybeSingle();

        if (!existingSlug) {
          break; // Slug is unique
        }

        // Append timestamp to make it unique
        finalSlug = `${dbTool.slug}-${Date.now()}-${slugAttempts}`;
        slugAttempts++;
      }

      dbTool.slug = finalSlug;

      // Insert tool
      const { data: insertedTool, error } = await supabase
        .from("tools")
        .insert(dbTool)
        .select("id")
        .single();

      if (error) {
        result.errors.push(
          `Failed to save tool "${scrapedTool.name}": ${error.message}`
        );
        result.skipped++;
        continue;
      }

      if (insertedTool) {
        result.saved++;
        result.toolIds.push(insertedTool.id);
      }
    } catch (error) {
      result.errors.push(
        `Error processing tool "${scrapedTool.name}": ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      result.skipped++;
    }
  }

  return result;
}

/**
 * Save a single scraped tool to database
 */
export async function saveScrapedTool(
  tool: FutureToolsTool,
  options: {
    skipDuplicates?: boolean;
  } = {}
): Promise<{ success: boolean; toolId?: string; error?: string }> {
  const result = await saveScrapedTools([tool], options);

  if (result.saved > 0) {
    return {
      success: true,
      toolId: result.toolIds[0],
    };
  }

  return {
    success: false,
    error: result.errors[0] || "Failed to save tool",
  };
}

