import { AdminLayout } from "@/components/admin/admin-layout";
import { requireAdmin } from "@/lib/auth/require-admin";
import { ScraperTestContent } from "./scraper-test-content";

export default async function ScraperTestPage() {
  await requireAdmin();
  
  return (
    <AdminLayout>
      <ScraperTestContent />
    </AdminLayout>
  );
}

