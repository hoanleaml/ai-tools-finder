import { requireAdmin } from "@/lib/auth/require-admin";
import { getDashboardStats } from "@/lib/admin/get-dashboard-stats";
import { AdminLayout } from "@/components/admin/admin-layout";
import { StatCard } from "@/components/admin/stat-card";
import { Button } from "@/components/ui/button";
import { Package, TrendingUp, Link as LinkIcon, Clock, Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const stats = await getDashboardStats();

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/admin/tools/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Tool
              </Link>
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Tools"
            value={stats.totalTools}
            description="All tools in the catalog"
            icon={Package}
          />
          <StatCard
            title="New This Week"
            value={stats.newToolsThisWeek}
            description={`${stats.newToolsToday} added today`}
            icon={TrendingUp}
          />
          <StatCard
            title="With Affiliate"
            value={stats.toolsWithAffiliate}
            description={`${stats.toolsWithAffiliatePercentage}% of all tools`}
            icon={LinkIcon}
          />
          <StatCard
            title="Pending Reviews"
            value={stats.pendingReviews}
            description="Tools awaiting approval"
            icon={Clock}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/tools/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Tool
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/tools">
                  <Package className="mr-2 h-4 w-4" />
                  Manage Tools
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/affiliates">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Manage Affiliate Links
                </Link>
              </Button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                <p>No recent activity</p>
                <p className="text-xs text-gray-500 mt-1">
                  Activity feed will appear here as you manage tools
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
