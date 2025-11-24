import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Test reading from categories table
    const { data: categories, error: categoriesError } = await supabase
      .from("categories")
      .select("*")
      .limit(1);

    if (categoriesError) {
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed",
          details: categoriesError.message,
        },
        { status: 500 }
      );
    }

    // Test reading from tools table
    const { data: tools, error: toolsError } = await supabase
      .from("tools")
      .select("*")
      .limit(1);

    if (toolsError) {
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed",
          details: toolsError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      data: {
        categoriesCount: categories?.length ?? 0,
        toolsCount: tools?.length ?? 0,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Unexpected error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

