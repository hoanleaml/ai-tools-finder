export default function ToolsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-10 w-64 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-6 w-96 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-lg border bg-gray-100"
          />
        ))}
      </div>
    </div>
  );
}

