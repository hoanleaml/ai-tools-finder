import { requireAdmin } from "@/lib/auth/require-admin";
import { deleteAffiliateLink } from "@/lib/admin/delete-affiliate-link";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await requireAdmin();
    const { id } = await params;
    await deleteAffiliateLink(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting affiliate link:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete affiliate link" },
      { status: 500 }
    );
  }
}

