import { AdminLayout } from "@/components/admin/admin-layout";
import { requireAdmin } from "@/lib/auth/require-admin";
import { ScrapingJobsContent } from "./scraping-jobs-content";

export default async function ScrapingJobsPage() {
  await requireAdmin();
  
  return (
    <AdminLayout>
      <ScrapingJobsContent />
    </AdminLayout>
  );
}

