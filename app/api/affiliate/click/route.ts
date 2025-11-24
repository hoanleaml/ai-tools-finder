import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const toolId = searchParams.get("tool_id");
    const affiliateLinkId = searchParams.get("affiliate_link_id");

    if (!toolId) {
      return NextResponse.json(
        { error: "tool_id is required" },
        { status: 400 }
      );
    }

    // Get affiliate link if provided
    let affiliateUrl: string | null = null;
    if (affiliateLinkId) {
      const supabase = createAdminClient();
      const { data: affiliateLink } = await supabase
        .from("affiliate_links")
        .select("affiliate_url")
        .eq("id", affiliateLinkId)
        .eq("status", "active")
        .single();

      if (affiliateLink) {
        affiliateUrl = affiliateLink.affiliate_url;
      }
    }

    // If no affiliate link, get tool's website URL as fallback
    if (!affiliateUrl) {
      const supabase = createAdminClient();
      const { data: tool } = await supabase
        .from("tools")
        .select("website_url")
        .eq("id", toolId)
        .single();

      if (!tool) {
        return NextResponse.json(
          { error: "Tool not found" },
          { status: 404 }
        );
      }

      affiliateUrl = tool.website_url;
    }

    // Track click (async, don't block redirect)
    trackClick(request, toolId, affiliateLinkId).catch((error) => {
      console.error("Error tracking affiliate click:", error);
      // Don't throw - tracking failure shouldn't block redirect
    });

    // Redirect to affiliate URL
    return NextResponse.redirect(affiliateUrl, { status: 302 });
  } catch (error) {
    console.error("Error in affiliate click handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function trackClick(
  request: NextRequest,
  toolId: string,
  affiliateLinkId: string | null
) {
  try {
    const supabase = createAdminClient();

    // Get client info
    const ipAddress = request.headers.get("x-forwarded-for") || 
                     request.headers.get("x-real-ip") || 
                     "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    const referrer = request.headers.get("referer") || null;

    // Generate session ID (simple hash of IP + User-Agent)
    // In production, you might want to use cookies or more sophisticated session tracking
    const sessionId = `${ipAddress}-${userAgent}`.substring(0, 255);

    // Insert click record
    const { error } = await supabase.from("affiliate_clicks").insert({
      tool_id: toolId,
      affiliate_link_id: affiliateLinkId,
      ip_address: ipAddress,
      user_agent: userAgent,
      referrer: referrer,
      user_session_id: sessionId,
    });

    if (error) {
      console.error("Error inserting affiliate click:", error);
    }
  } catch (error) {
    console.error("Error in trackClick:", error);
    // Silently fail - don't block redirect
  }
}

