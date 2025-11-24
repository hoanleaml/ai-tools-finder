import { requireAdmin } from "@/lib/auth/require-admin";
import { getCategories } from "@/lib/categories/get-categories";
import { getToolById } from "@/lib/admin/get-tool-by-id";
import { updateTool } from "@/lib/admin/update-tool";
import { AdminLayout } from "@/components/admin/admin-layout";
import { ToolForm } from "@/components/admin/tool-form";
import { redirect, notFound } from "next/navigation";
import type { ToolFormData } from "@/lib/admin/tool-form-schema";

interface EditToolPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditToolPage({ params }: EditToolPageProps) {
  await requireAdmin();
  const { id } = await params;

  const [categories, tool] = await Promise.all([
    getCategories(),
    getToolById(id).catch(() => null),
  ]);

  if (!tool) {
    notFound();
  }

  async function handleUpdate(data: ToolFormData) {
    "use server";
    try {
      await updateTool(id, data);
      redirect("/admin/tools?updated=true");
    } catch (error) {
      console.error("Error updating tool:", error);
      throw error;
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Tool</h1>
          <p className="text-gray-600 mt-1">{tool.name}</p>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <ToolForm
            categories={categories}
            initialData={{
              id: tool.id,
              name: tool.name,
              description: tool.description || "",
              website_url: tool.website_url,
              logo_url: tool.logo_url || "",
              category_id: tool.category_id || undefined,
              pricing_model: (tool.pricing_model as any) || undefined,
              features: (tool.features as string[]) || [],
              status: (tool.status as any) || "active",
            }}
            onSubmit={handleUpdate}
          />
        </div>
      </div>
    </AdminLayout>
  );
}

