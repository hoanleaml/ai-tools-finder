import { requireAdmin } from "@/lib/auth/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { toolIds, action, value } = body;

    if (!toolIds || !Array.isArray(toolIds) || toolIds.length === 0) {
      return NextResponse.json(
        { error: "No tools selected" },
        { status: 400 }
      );
    }

    if (!action) {
      return NextResponse.json(
        { error: "No action specified" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    let result;

    switch (action) {
      case "delete":
        // Delete tools
        const { error: deleteError } = await supabase
          .from("tools")
          .delete()
          .in("id", toolIds);

        if (deleteError) {
          throw deleteError;
        }

        result = { success: true, deleted: toolIds.length };
        break;

      case "update_status":
        if (!value || !["active", "pending", "archived"].includes(value)) {
          return NextResponse.json(
            { error: "Invalid status value" },
            { status: 400 }
          );
        }

        const { error: statusError } = await supabase
          .from("tools")
          .update({ status: value, updated_at: new Date().toISOString() })
          .in("id", toolIds);

        if (statusError) {
          throw statusError;
        }

        result = { success: true, updated: toolIds.length };
        break;

      case "update_category":
        if (!value) {
          return NextResponse.json(
            { error: "Category ID is required" },
            { status: 400 }
          );
        }

        const { error: categoryError } = await supabase
          .from("tools")
          .update({
            category_id: value === "null" ? null : value,
            updated_at: new Date().toISOString(),
          })
          .in("id", toolIds);

        if (categoryError) {
          throw categoryError;
        }

        result = { success: true, updated: toolIds.length };
        break;

      case "update_pricing":
        if (!value || !["free", "freemium", "paid", "one-time"].includes(value)) {
          return NextResponse.json(
            { error: "Invalid pricing model" },
            { status: 400 }
          );
        }

        const { error: pricingError } = await supabase
          .from("tools")
          .update({
            pricing_model: value === "null" ? null : value,
            updated_at: new Date().toISOString(),
          })
          .in("id", toolIds);

        if (pricingError) {
          throw pricingError;
        }

        result = { success: true, updated: toolIds.length };
        break;

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error performing bulk operation:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to perform bulk operation",
      },
      { status: 500 }
    );
  }
}

