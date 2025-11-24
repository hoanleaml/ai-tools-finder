"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Edit, Trash2, ExternalLink, Search, X } from "lucide-react";
import Link from "next/link";
import type { AdminAffiliateLink } from "@/lib/admin/get-affiliate-links";
import type { Tool } from "@/lib/tools/get-tools";

interface AffiliateLinksTableProps {
  links: AdminAffiliateLink[];
  total: number;
  page: number;
  totalPages: number;
  tools: Tool[];
  currentSearch: string;
  currentStatus: string;
  currentToolId: string;
}

export function AffiliateLinksTable({
  links,
  total,
  page,
  totalPages,
  tools,
  currentSearch,
  currentStatus,
  currentToolId,
}: AffiliateLinksTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    if (Object.keys(updates).some((k) => k !== "page")) {
      params.set("page", "1");
    }

    router.push(`/admin/affiliates?${params.toString()}`);
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

  const handleToolFilter = (value: string) => {
    updateURL({ tool: value || null });
  };

  const clearFilters = () => {
    setSearchValue("");
    updateURL({
      search: null,
      status: null,
      tool: null,
    });
  };

  const handleDelete = async (linkId: string) => {
    if (!confirm("Are you sure you want to delete this affiliate link?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/affiliate-links/${linkId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Failed to delete affiliate link");
      }
    } catch (error) {
      console.error("Error deleting affiliate link:", error);
      alert("An error occurred while deleting the affiliate link");
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-white p-4">
        <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search affiliate links..."
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
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>

        <Select value={currentToolId} onValueChange={handleToolFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tool" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Tools</SelectItem>
            {tools.map((tool) => (
              <SelectItem key={tool.id} value={tool.id}>
                {tool.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(currentSearch || currentStatus || currentToolId) && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tool</TableHead>
              <TableHead>Affiliate URL</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No affiliate links found
                </TableCell>
              </TableRow>
            ) : (
              links.map((link) => (
                <TableRow key={link.id}>
                  <TableCell className="font-medium">{link.tool_name}</TableCell>
                  <TableCell>
                    <div className="max-w-[300px] truncate">
                      <a
                        href={link.affiliate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {link.affiliate_url}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>{link.program_name || "—"}</TableCell>
                  <TableCell>
                    {link.commission_rate !== null
                      ? `${link.commission_rate}%`
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        link.status === "active"
                          ? "default"
                          : link.status === "pending"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {link.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{link.click_count}</TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(link.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={link.affiliate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/affiliates/${link.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleDelete(link.id)}
                      >
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
            Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total}{" "}
            affiliate links
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

