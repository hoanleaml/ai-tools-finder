"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Trash2, Archive, Tag, DollarSign, Loader2 } from "lucide-react";
import type { Category } from "@/types/database";

interface BulkActionsBarProps {
  selectedCount: number;
  selectedToolIds: string[];
  onClearSelection: () => void;
  onSuccess: () => void;
  categories: Category[];
}

export function BulkActionsBar({
  selectedCount,
  selectedToolIds,
  onClearSelection,
  onSuccess,
  categories,
}: BulkActionsBarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<string | null>(null);
  const [dialogValue, setDialogValue] = useState<string>("");

  const handleBulkAction = async (action: string, value?: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/tools/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toolIds: selectedToolIds,
          action,
          value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to perform bulk operation");
      }

      alert(`Successfully ${action} ${selectedCount} tool(s)`);
      setDialogOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Bulk operation error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "An error occurred while performing bulk operation"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteDialog = () => {
    setDialogAction("delete");
    setDialogOpen(true);
  };

  const openStatusDialog = () => {
    setDialogAction("update_status");
    setDialogValue("active");
    setDialogOpen(true);
  };

  const openCategoryDialog = () => {
    setDialogAction("update_category");
    setDialogValue("");
    setDialogOpen(true);
  };

  const openPricingDialog = () => {
    setDialogAction("update_pricing");
    setDialogValue("free");
    setDialogOpen(true);
  };

  const confirmAction = () => {
    if (!dialogAction) return;

    if (dialogAction === "delete") {
      handleBulkAction("delete");
    } else {
      handleBulkAction(dialogAction, dialogValue);
    }
  };

  const getDialogTitle = () => {
    switch (dialogAction) {
      case "delete":
        return "Delete Tools";
      case "update_status":
        return "Update Status";
      case "update_category":
        return "Update Category";
      case "update_pricing":
        return "Update Pricing Model";
      default:
        return "Bulk Operation";
    }
  };

  const getDialogDescription = () => {
    switch (dialogAction) {
      case "delete":
        return `Are you sure you want to delete ${selectedCount} tool(s)? This action cannot be undone.`;
      case "update_status":
        return `Update status for ${selectedCount} tool(s) to:`;
      case "update_category":
        return `Update category for ${selectedCount} tool(s) to:`;
      case "update_pricing":
        return `Update pricing model for ${selectedCount} tool(s) to:`;
      default:
        return "";
    }
  };

  return (
    <>
      <div className="rounded-lg border bg-yellow-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {selectedCount} tool(s) selected
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={openStatusDialog}
              disabled={isLoading}
            >
              <Archive className="mr-2 h-4 w-4" />
              Update Status
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={openCategoryDialog}
              disabled={isLoading}
            >
              <Tag className="mr-2 h-4 w-4" />
              Update Category
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={openPricingDialog}
              disabled={isLoading}
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Update Pricing
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={openDeleteDialog}
              disabled={isLoading}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
            <DialogDescription>{getDialogDescription()}</DialogDescription>
          </DialogHeader>

          {dialogAction === "update_status" && (
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={dialogValue} onValueChange={setDialogValue}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {dialogAction === "update_category" && (
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={dialogValue} onValueChange={setDialogValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">None</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {dialogAction === "update_pricing" && (
            <div className="space-y-2">
              <Label>Pricing Model</Label>
              <Select value={dialogValue} onValueChange={setDialogValue}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">None</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="freemium">Freemium</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="one-time">One-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmAction}
              disabled={isLoading}
              variant={dialogAction === "delete" ? "destructive" : "default"}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

