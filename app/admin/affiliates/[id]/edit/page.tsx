import { requireAdmin } from "@/lib/auth/require-admin";
import { getTools } from "@/lib/tools/get-tools";
import { getAffiliateLinkById } from "@/lib/admin/get-affiliate-link-by-id";
import { updateAffiliateLink } from "@/lib/admin/update-affiliate-link";
import { AdminLayout } from "@/components/admin/admin-layout";
import { AffiliateLinkForm } from "@/components/admin/affiliate-link-form";
import { redirect, notFound } from "next/navigation";
import type { AffiliateLinkFormData } from "@/lib/admin/affiliate-link-schema";

interface EditAffiliateLinkPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAffiliateLinkPage({
  params,
}: EditAffiliateLinkPageProps) {
  await requireAdmin();
  const { id } = await params;

  const [toolsData, link] = await Promise.all([
    getTools({ limit: 1000 }),
    getAffiliateLinkById(id).catch(() => null),
  ]);

  if (!link) {
    notFound();
  }

  async function handleUpdate(data: AffiliateLinkFormData) {
    "use server";
    try {
      await updateAffiliateLink(id, data);
      redirect("/admin/affiliates?updated=true");
    } catch (error) {
      console.error("Error updating affiliate link:", error);
      throw error;
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Affiliate Link</h1>
          <p className="text-gray-600 mt-1">Update affiliate link information</p>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <AffiliateLinkForm
            tools={toolsData.tools}
            initialData={{
              id: link.id,
              tool_id: link.tool_id,
              affiliate_url: link.affiliate_url,
              program_name: link.program_name || "",
              commission_rate: link.commission_rate || undefined,
              status: (link.status as any) || "active",
            }}
            onSubmit={handleUpdate}
          />
        </div>
      </div>
    </AdminLayout>
  );
}

