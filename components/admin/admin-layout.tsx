import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, Link as LinkIcon, Settings, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export async function AdminLayout({ children }: AdminLayoutProps) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const userRole = session.user.user_metadata?.role;
  if (userRole !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white">
        <div className="flex h-full flex-col">
          {/* Logo/Header */}
          <div className="border-b p-6">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">{session.user.email}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <Link href="/admin">
              <Button
                variant="ghost"
                className="w-full justify-start"
                asChild
              >
                <div>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Overview
                </div>
              </Button>
            </Link>
            <Link href="/admin/tools">
              <Button
                variant="ghost"
                className="w-full justify-start"
                asChild
              >
                <div>
                  <Package className="mr-2 h-4 w-4" />
                  Tools
                </div>
              </Button>
            </Link>
            <Link href="/admin/affiliates">
              <Button
                variant="ghost"
                className="w-full justify-start"
                asChild
              >
                <div>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Affiliate Links
                </div>
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button
                variant="ghost"
                className="w-full justify-start"
                asChild
              >
                <div>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </div>
              </Button>
            </Link>
          </nav>

          {/* Logout */}
          <div className="border-t p-4">
            <form action="/api/auth/logout" method="POST">
              <Button
                type="submit"
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}

