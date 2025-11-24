import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
      <h2 className="mb-4 text-2xl font-semibold text-gray-700">Tool Not Found</h2>
      <p className="mb-8 text-gray-600">
        The tool you're looking for doesn't exist or has been removed.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/tools">Browse All Tools</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}

