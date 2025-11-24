import { requireAdmin } from "@/lib/auth/require-admin";
import { getTools } from "@/lib/tools/get-tools";
import { createAffiliateLink } from "@/lib/admin/create-affiliate-link";
import { AdminLayout } from "@/components/admin/admin-layout";
import { AffiliateLinkForm } from "@/components/admin/affiliate-link-form";
import { redirect } from "next/navigation";
import type { AffiliateLinkFormData } from "@/lib/admin/affiliate-link-schema";

export default async function NewAffiliateLinkPage() {
  await requireAdmin();
  const toolsData = await getTools({ limit: 1000 });

  async function handleCreate(data: AffiliateLinkFormData) {
    "use server";
    try {
      await createAffiliateLink(data);
      redirect("/admin/affiliates?created=true");
    } catch (error) {
      console.error("Error creating affiliate link:", error);
      throw error;
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Add Affiliate Link</h1>
          <p className="text-gray-600 mt-1">Add a new affiliate link for a tool</p>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <AffiliateLinkForm tools={toolsData.tools} onSubmit={handleCreate} />
        </div>
      </div>
    </AdminLayout>
  );
}

