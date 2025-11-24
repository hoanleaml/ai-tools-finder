"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { Category } from "@/lib/categories/get-categories";

interface FiltersProps {
  categories: Category[];
}

const PRICING_MODELS = [
  { value: "free", label: "Free" },
  { value: "freemium", label: "Freemium" },
  { value: "paid", label: "Paid" },
  { value: "one-time", label: "One-time" },
] as const;

function FiltersInner({ categories }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  const activePricing = searchParams.get("pricing");

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Reset to page 1 when filter changes
    params.set("page", "1");
    
    router.push(`/tools?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("pricing");
    params.set("page", "1");
    router.push(`/tools?${params.toString()}`);
  };

  const hasActiveFilters = activeCategory || activePricing;

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Active filters:</span>
          {activeCategory && (
            <Badge variant="secondary" className="gap-1">
              Category: {categories.find((c) => c.id === activeCategory)?.name || activeCategory}
              <button
                onClick={() => updateFilter("category", null)}
                className="ml-1 hover:text-destructive"
                aria-label="Remove category filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {activePricing && (
            <Badge variant="secondary" className="gap-1">
              Pricing: {PRICING_MODELS.find((p) => p.value === activePricing)?.label || activePricing}
              <button
                onClick={() => updateFilter("pricing", null)}
                className="ml-1 hover:text-destructive"
                aria-label="Remove pricing filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-6 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Category Filter */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Category</h3>
        <div className="space-y-2">
          <label
            className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-50"
          >
            <input
              type="radio"
              name="category"
              value=""
              checked={!activeCategory}
              onChange={() => updateFilter("category", null)}
              className="h-4 w-4 text-primary"
            />
            <span className="text-sm text-gray-700">All Categories</span>
          </label>
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-50"
            >
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={activeCategory === category.id}
                onChange={() => updateFilter("category", category.id)}
                className="h-4 w-4 text-primary"
              />
              <span className="text-sm text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Pricing Model Filter */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Pricing Model</h3>
        <div className="space-y-2">
          <label
            className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-50"
          >
            <input
              type="radio"
              name="pricing"
              value=""
              checked={!activePricing}
              onChange={() => updateFilter("pricing", null)}
              className="h-4 w-4 text-primary"
            />
            <span className="text-sm text-gray-700">All Pricing</span>
          </label>
          {PRICING_MODELS.map((pricing) => (
            <label
              key={pricing.value}
              className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-50"
            >
              <input
                type="radio"
                name="pricing"
                value={pricing.value}
                checked={activePricing === pricing.value}
                onChange={() => updateFilter("pricing", pricing.value)}
                className="h-4 w-4 text-primary"
              />
              <span className="text-sm text-gray-700">{pricing.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Filters({ categories }: FiltersProps) {
  return (
    <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-gray-100" />}>
      <FiltersInner categories={categories} />
    </Suspense>
  );
}

