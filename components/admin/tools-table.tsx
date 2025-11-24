"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BulkActionsBar } from "./bulk-actions-bar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowUpDown,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { AdminTool } from "@/lib/admin/get-admin-tools";
import type { Category } from "@/types/database";

interface ToolsTableProps {
  tools: AdminTool[];
  total: number;
  page: number;
  totalPages: number;
  categories: Category[];
  currentSearch: string;
  currentStatus: string;
  currentCategory: string;
  currentSortBy: string;
  currentSortOrder: "asc" | "desc";
}

export function ToolsTable({
  tools,
  total,
  page,
  totalPages,
  categories,
  currentSearch,
  currentStatus,
  currentCategory,
  currentSortBy,
  currentSortOrder,
}: ToolsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set());
  const [searchValue, setSearchValue] = useState(currentSearch);

  const updateURL = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset to page 1 when filters change
    if (Object.keys(updates).some(k => k !== "page")) {
      params.set("page", "1");
    }

    router.push(`/admin/tools?${params.toString()}`);
  };

  const handleSort = (column: string) => {
    const newOrder =
      currentSortBy === column && currentSortOrder === "desc" ? "asc" : "desc";
    updateURL({ sortBy: column, sortOrder: newOrder });
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (value === "") {
      updateURL({ search: null });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({ search: searchValue || null });
  };

  const handleStatusFilter = (value: string) => {
    updateURL({ status: value || null });
  };

  const handleCategoryFilter = (value: string) => {
    updateURL({ category: value || null });
  };

  const clearFilters = () => {
    setSearchValue("");
    updateURL({
      search: null,
      status: null,
      category: null,
      sortBy: null,
      sortOrder: null,
    });
  };

  const toggleSelectAll = () => {
    if (selectedTools.size === tools.length) {
      setSelectedTools(new Set());
    } else {
      setSelectedTools(new Set(tools.map((t) => t.id)));
    }
  };

  const toggleSelectTool = (toolId: string) => {
    const newSelected = new Set(selectedTools);
    if (newSelected.has(toolId)) {
      newSelected.delete(toolId);
    } else {
      newSelected.add(toolId);
    }
    setSelectedTools(newSelected);
  };

  const SortButton = ({ column, children }: { column: string; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 -ml-3"
      onClick={() => handleSort(column)}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );

  const pricingLabels: Record<string, string> = {
    free: "Free",
    freemium: "Freemium",
    paid: "Paid",
    "one-time": "One-time",
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-white p-4">
        <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tools..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </form>

        <Select value={currentStatus} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Select value={currentCategory} onValueChange={handleCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(currentSearch || currentStatus || currentCategory) && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
          >
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedTools.size > 0 && (
        <BulkActionsBar
          selectedCount={selectedTools.size}
          selectedToolIds={Array.from(selectedTools)}
          onClearSelection={() => setSelectedTools(new Set())}
          onSuccess={() => {
            setSelectedTools(new Set());
            router.refresh();
          }}
          categories={categories}
        />
      )}

      {/* Table */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedTools.size === tools.length && tools.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>
                <SortButton column="name">Name</SortButton>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>
                <SortButton column="pricing_model">Pricing</SortButton>
              </TableHead>
              <TableHead>
                <SortButton column="status">Status</SortButton>
              </TableHead>
              <TableHead>Affiliate</TableHead>
              <TableHead>
                <SortButton column="created_at">Created</SortButton>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tools.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No tools found
                </TableCell>
              </TableRow>
            ) : (
              tools.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedTools.has(tool.id)}
                      onCheckedChange={() => toggleSelectTool(tool.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {tool.logo_url && (
                        <div className="relative h-8 w-8 overflow-hidden rounded">
                          <Image
                            src={tool.logo_url}
                            alt={tool.name}
                            fill
                            className="object-contain"
                            sizes="32px"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{tool.name}</div>
                        {tool.description && (
                          <div className="text-xs text-gray-500 line-clamp-1">
                            {tool.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {tool.category_name ? (
                      <Badge variant="outline">{tool.category_name}</Badge>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {tool.pricing_model ? (
                      <Badge variant="secondary">
                        {pricingLabels[tool.pricing_model] || tool.pricing_model}
                      </Badge>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tool.status === "active"
                          ? "default"
                          : tool.status === "pending"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {tool.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {tool.has_affiliate ? (
                      <Badge variant="outline" className="text-green-600">
                        Yes
                      </Badge>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(tool.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/tools/${tool.slug || tool.id}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/tools/${tool.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total} tools
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => updateURL({ page: String(page - 1) })}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateURL({ page: String(pageNum) })}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => updateURL({ page: String(page + 1) })}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

