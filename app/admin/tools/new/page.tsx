import { requireAdmin } from "@/lib/auth/require-admin";
import { getCategories } from "@/lib/categories/get-categories";
import { createTool } from "@/lib/admin/create-tool";
import { AdminLayout } from "@/components/admin/admin-layout";
import { ToolForm } from "@/components/admin/tool-form";
import { redirect } from "next/navigation";
import type { ToolFormData } from "@/lib/admin/tool-form-schema";

export default async function NewToolPage() {
  await requireAdmin();
  const categories = await getCategories();

  async function handleCreate(data: ToolFormData) {
    "use server";
    await createTool(data);
    redirect("/admin/tools?created=true");
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Tool</h1>
          <p className="text-gray-600 mt-1">Add a new tool to the catalog</p>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <ToolForm categories={categories} onSubmit={handleCreate} />
        </div>
      </div>
    </AdminLayout>
  );
}

