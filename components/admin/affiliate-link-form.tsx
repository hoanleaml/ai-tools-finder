"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { affiliateLinkSchema, type AffiliateLinkFormData } from "@/lib/admin/affiliate-link-schema";
import type { Tool } from "@/lib/tools/get-tools";

interface AffiliateLinkFormProps {
  tools: Tool[];
  initialData?: Partial<AffiliateLinkFormData> & { id?: string };
  onSubmit: (data: AffiliateLinkFormData) => Promise<void>;
  onCancel?: () => void;
}

export function AffiliateLinkForm({
  tools,
  initialData,
  onSubmit,
  onCancel,
}: AffiliateLinkFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AffiliateLinkFormData>({
    resolver: zodResolver(affiliateLinkSchema),
    defaultValues: {
      tool_id: initialData?.tool_id || "",
      affiliate_url: initialData?.affiliate_url || "",
      program_name: initialData?.program_name || "",
      commission_rate: initialData?.commission_rate || undefined,
      status: initialData?.status || "active",
    },
  });

  const watchedToolId = watch("tool_id");
  const watchedStatus = watch("status");
  const watchedAffiliateUrl = watch("affiliate_url");

  const onFormSubmit = async (data: AffiliateLinkFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Tool Selection */}
      <div>
        <Label htmlFor="tool_id">
          Tool <span className="text-red-500">*</span>
        </Label>
        <Select
          value={watchedToolId}
          onValueChange={(value) => setValue("tool_id", value)}
        >
          <SelectTrigger id="tool_id" className={errors.tool_id ? "border-red-500" : ""}>
            <SelectValue placeholder="Select a tool" />
          </SelectTrigger>
          <SelectContent>
            {tools.map((tool) => (
              <SelectItem key={tool.id} value={tool.id}>
                {tool.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.tool_id && (
          <p className="mt-1 text-sm text-red-500">{errors.tool_id.message}</p>
        )}
      </div>

      {/* Affiliate URL */}
      <div>
        <Label htmlFor="affiliate_url">
          Affiliate URL <span className="text-red-500">*</span>
        </Label>
        <Input
          id="affiliate_url"
          type="url"
          {...register("affiliate_url")}
          placeholder="https://example.com/ref=123"
          className={errors.affiliate_url ? "border-red-500" : ""}
        />
        {errors.affiliate_url && (
          <p className="mt-1 text-sm text-red-500">{errors.affiliate_url.message}</p>
        )}
        {watchedAffiliateUrl && (
          <div className="mt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              asChild
            >
              <a href={watchedAffiliateUrl} target="_blank" rel="noopener noreferrer">
                Test Link
              </a>
            </Button>
          </div>
        )}
      </div>

      {/* Program Name */}
      <div>
        <Label htmlFor="program_name">Program Name</Label>
        <Input
          id="program_name"
          {...register("program_name")}
          placeholder="e.g., Amazon Associates, ShareASale"
        />
      </div>

      {/* Commission Rate */}
      <div>
        <Label htmlFor="commission_rate">Commission Rate (%)</Label>
        <Input
          id="commission_rate"
          type="number"
          step="0.01"
          min="0"
          max="100"
          {...register("commission_rate", { valueAsNumber: true })}
          placeholder="e.g., 5.5"
          className={errors.commission_rate ? "border-red-500" : ""}
        />
        {errors.commission_rate && (
          <p className="mt-1 text-sm text-red-500">{errors.commission_rate.message}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={watchedStatus}
          onValueChange={(value) => setValue("status", value as any)}
        >
          <SelectTrigger id="status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : initialData?.id
            ? "Update Affiliate Link"
            : "Create Affiliate Link"}
        </Button>
      </div>
    </form>
  );
}

