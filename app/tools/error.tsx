"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function ToolsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error tracking service
    console.error("Tools page error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription className="mt-2">
          We encountered an error while loading the tools. Please try again.
        </AlertDescription>
        <div className="mt-4">
          <Button onClick={reset} variant="outline">
            Try again
          </Button>
        </div>
      </Alert>
    </div>
  );
}

