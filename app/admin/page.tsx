import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/auth/logout-button";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600">
              Welcome, {session.user.email}
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Dashboard Overview
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-500">Tools</h3>
              <p className="mt-2 text-2xl font-semibold text-gray-900">0</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-500">Categories</h3>
              <p className="mt-2 text-2xl font-semibold text-gray-900">0</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-500">Users</h3>
              <p className="mt-2 text-2xl font-semibold text-gray-900">1</p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Session Information
          </h2>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium text-gray-500">User ID:</span>{" "}
              <span className="text-gray-900">{session.user.id}</span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Email:</span>{" "}
              <span className="text-gray-900">{session.user.email}</span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Session expires at:</span>{" "}
              <span className="text-gray-900">
                {new Date(session.expires_at! * 1000).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

