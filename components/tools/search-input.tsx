"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import { useDebouncedCallback } from "use-debounce";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  initialValue?: string;
}

function SearchInputInner({ placeholder = "Search tools...", className, initialValue = "" }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(initialValue || searchParams.get("search") || "");

  // Debounced search function (300ms delay)
  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value.trim()) {
      params.set("search", value.trim());
      // Reset to page 1 when searching
      params.set("page", "1");
    } else {
      params.delete("search");
      params.delete("page");
    }

    router.push(`/tools?${params.toString()}`);
  }, 300);

  // Update URL when search value changes
  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

  // Sync with URL params
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== searchValue) {
      setSearchValue(urlSearch);
    }
  }, [searchParams]);

  const handleClear = () => {
    setSearchValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("page");
    router.push(`/tools?${params.toString()}`);
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="pl-10 pr-10"
      />
      {searchValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function SearchInput(props: SearchInputProps) {
  return (
    <Suspense fallback={
      <div className={`relative ${props.className}`}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder={props.placeholder || "Search tools..."}
          className="pl-10"
          disabled
        />
      </div>
    }>
      <SearchInputInner {...props} />
    </Suspense>
  );
}

