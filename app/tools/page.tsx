import { Suspense } from "react";
import { getTools } from "@/lib/tools/get-tools";
import { getCategories } from "@/lib/categories/get-categories";
import { ToolCard } from "@/components/tools/tool-card";
import { PaginationWrapper } from "@/components/tools/pagination";
import { EmptyState } from "@/components/tools/empty-state";
import { SearchInput } from "@/components/tools/search-input";
import { Filters } from "@/components/tools/filters";

interface ToolsPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
    pricing?: string;
  }>;
}

export const metadata = {
  title: "AI Tools | Browse All Tools",
  description: "Discover and browse the best AI tools available",
};

async function ToolsList({
  page,
  categoryId,
  search,
  pricingModel,
}: {
  page: number;
  categoryId?: string;
  search?: string;
  pricingModel?: string;
}) {
  const { tools, total, page: currentPage, totalPages } = await getTools({
    page,
    limit: 24,
    categoryId,
    search,
    pricingModel,
  });

  if (tools.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      <PaginationWrapper
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={total}
        itemsPerPage={24}
      />
    </>
  );
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const categoryId = params.category;
  const search = params.search;
  const pricingModel = params.pricing;

  // Fetch categories for filters
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">AI Tools</h1>
        <p className="mt-2 text-lg text-gray-600">
          Discover the best AI tools to enhance your workflow
        </p>
      </div>

      <div className="mb-6">
        <SearchInput className="max-w-md" />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 lg:flex-shrink-0">
          <div className="rounded-lg border bg-white p-4">
            <h2 className="mb-4 text-lg font-semibold">Filters</h2>
            <Filters categories={categories} />
          </div>
        </aside>

        {/* Tools List */}
        <main className="flex-1">
          <Suspense fallback={<ToolsListSkeleton />}>
            <ToolsList page={page} categoryId={categoryId} search={search} pricingModel={pricingModel} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

function ToolsListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="h-64 animate-pulse rounded-lg border bg-gray-100"
        />
      ))}
    </div>
  );
}

