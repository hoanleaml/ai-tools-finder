import { requireAdmin } from "@/lib/auth/require-admin";
import { getAffiliateLinks } from "@/lib/admin/get-affiliate-links";
import { getTools } from "@/lib/tools/get-tools";
import { AdminLayout } from "@/components/admin/admin-layout";
import { AffiliateLinksTable } from "@/components/admin/affiliate-links-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface AdminAffiliatesPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    tool?: string;
  }>;
}

export default async function AdminAffiliatesPage({
  searchParams,
}: AdminAffiliatesPageProps) {
  await requireAdmin();

  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const search = params.search || "";
  const status = params.status || "";
  const toolId = params.tool || "";

  const [linksData, toolsData] = await Promise.all([
    getAffiliateLinks(page, 20, toolId, status, search),
    getTools({ limit: 1000 }), // Get all tools for filter dropdown
  ]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Affiliate Links Management</h1>
            <p className="text-gray-600 mt-1">
              Manage affiliate links for tools ({linksData.total} total)
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/affiliates/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Affiliate Link
            </Link>
          </Button>
        </div>

        {/* Affiliate Links Table */}
        <AffiliateLinksTable
          links={linksData.links}
          total={linksData.total}
          page={page}
          totalPages={linksData.totalPages}
          tools={toolsData.tools}
          currentSearch={search}
          currentStatus={status}
          currentToolId={toolId}
        />
      </div>
    </AdminLayout>
  );
}

