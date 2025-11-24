import { requireAdmin } from "@/lib/auth/require-admin";
import { getAdminTools } from "@/lib/admin/get-admin-tools";
import { getCategories } from "@/lib/categories/get-categories";
import { AdminLayout } from "@/components/admin/admin-layout";
import { ToolsTable } from "@/components/admin/tools-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface AdminToolsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    category?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }>;
}

export default async function AdminToolsPage({ searchParams }: AdminToolsPageProps) {
  await requireAdmin();

  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const search = params.search || "";
  const status = params.status || "";
  const categoryId = params.category || "";
  const sortBy = params.sortBy || "created_at";
  const sortOrder = params.sortOrder || "desc";

  const [toolsData, categories] = await Promise.all([
    getAdminTools(page, 20, search, status, categoryId, sortBy, sortOrder),
    getCategories(),
  ]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tools Management</h1>
            <p className="text-gray-600 mt-1">
              Manage all tools in the catalog ({toolsData.total} total)
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/tools/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Tool
            </Link>
          </Button>
        </div>

        {/* Tools Table */}
        <ToolsTable
          tools={toolsData.tools}
          total={toolsData.total}
          page={page}
          totalPages={toolsData.totalPages}
          categories={categories}
          currentSearch={search}
          currentStatus={status}
          currentCategory={categoryId}
          currentSortBy={sortBy}
          currentSortOrder={sortOrder}
        />
      </div>
    </AdminLayout>
  );
}

