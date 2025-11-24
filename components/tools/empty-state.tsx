import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-gray-100 p-6">
        <Search className="h-12 w-12 text-gray-400" />
      </div>
      <h2 className="mb-2 text-2xl font-semibold">No tools found</h2>
      <p className="mb-6 max-w-md text-gray-600">
        We couldn't find any tools matching your criteria. Try adjusting your
        filters or check back later.
      </p>
      <Button asChild>
        <Link href="/tools">View all tools</Link>
      </Button>
    </div>
  );
}

