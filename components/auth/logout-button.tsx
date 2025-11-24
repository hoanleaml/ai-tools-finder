"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);
        alert("Failed to logout. Please try again.");
        setLoading(false);
        return;
      }

      // Redirect to login page
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      alert("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}

