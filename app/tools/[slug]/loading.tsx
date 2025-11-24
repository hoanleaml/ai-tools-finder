export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 h-4 w-64 animate-pulse rounded bg-gray-200" />

      {/* Back button skeleton */}
      <div className="mb-6 h-10 w-32 animate-pulse rounded bg-gray-200" />

      {/* Tool header skeleton */}
      <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          {/* Logo skeleton */}
          <div className="h-24 w-24 animate-pulse rounded-lg bg-gray-200" />

          {/* Info skeleton */}
          <div className="flex-1 space-y-4">
            <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-5/6 animate-pulse rounded bg-gray-200" />
            <div className="flex gap-3">
              <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Features skeleton */}
      <div className="mb-8">
        <div className="mb-4 h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}

