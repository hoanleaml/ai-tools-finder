"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";
import { toolFormSchema, type ToolFormData } from "@/lib/admin/tool-form-schema";
import type { Category } from "@/types/database";

interface ToolFormProps {
  categories: Category[];
  initialData?: Partial<ToolFormData> & { id?: string };
  onSubmit: (data: ToolFormData) => Promise<void>;
  onCancel?: () => void;
}

export function ToolForm({ categories, initialData, onSubmit, onCancel }: ToolFormProps) {
  const [features, setFeatures] = useState<string[]>(
    (initialData?.features as string[]) || []
  );
  const [featureInput, setFeatureInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ToolFormData>({
    resolver: zodResolver(toolFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      website_url: initialData?.website_url || "",
      logo_url: initialData?.logo_url || "",
      category_id: initialData?.category_id || undefined,
      pricing_model: initialData?.pricing_model || undefined,
      status: initialData?.status || "active",
      features: initialData?.features || [],
    },
  });

  const watchedCategoryId = watch("category_id");
  const watchedPricingModel = watch("pricing_model");
  const watchedStatus = watch("status");

  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      const newFeatures = [...features, featureInput.trim()];
      setFeatures(newFeatures);
      setValue("features", newFeatures);
      setFeatureInput("");
    }
  };

  const removeFeature = (featureToRemove: string) => {
    const newFeatures = features.filter((f) => f !== featureToRemove);
    setFeatures(newFeatures);
    setValue("features", newFeatures);
  };

  const onFormSubmit = async (data: ToolFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit({ ...data, features });
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <Label htmlFor="name">
          Tool Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="e.g., ChatGPT"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Describe what this tool does..."
          rows={4}
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Website URL */}
      <div>
        <Label htmlFor="website_url">
          Website URL <span className="text-red-500">*</span>
        </Label>
        <Input
          id="website_url"
          type="url"
          {...register("website_url")}
          placeholder="https://example.com"
          className={errors.website_url ? "border-red-500" : ""}
        />
        {errors.website_url && (
          <p className="mt-1 text-sm text-red-500">{errors.website_url.message}</p>
        )}
      </div>

      {/* Logo URL */}
      <div>
        <Label htmlFor="logo_url">Logo URL</Label>
        <Input
          id="logo_url"
          type="url"
          {...register("logo_url")}
          placeholder="https://example.com/logo.png"
          className={errors.logo_url ? "border-red-500" : ""}
        />
        {errors.logo_url && (
          <p className="mt-1 text-sm text-red-500">{errors.logo_url.message}</p>
        )}
        {watch("logo_url") && (
          <div className="mt-2">
            <img
              src={watch("logo_url") || ""}
              alt="Logo preview"
              className="h-16 w-16 rounded border object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category_id">Category</Label>
        <Select
          value={watchedCategoryId || ""}
          onValueChange={(value) => setValue("category_id", value || undefined)}
        >
          <SelectTrigger id="category_id">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">None</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pricing Model */}
      <div>
        <Label htmlFor="pricing_model">Pricing Model</Label>
        <Select
          value={watchedPricingModel || ""}
          onValueChange={(value) =>
            setValue("pricing_model", (value as any) || undefined)
          }
        >
          <SelectTrigger id="pricing_model">
            <SelectValue placeholder="Select pricing model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">None</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="freemium">Freemium</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="one-time">One-time</SelectItem>
          </SelectContent>
        </Select>
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
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Features */}
      <div>
        <Label htmlFor="features">Features</Label>
        <div className="flex gap-2">
          <Input
            id="features"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addFeature();
              }
            }}
            placeholder="Add a feature and press Enter"
          />
          <Button type="button" onClick={addFeature} variant="outline">
            Add
          </Button>
        </div>
        {features.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {features.map((feature) => (
              <Badge key={feature} variant="secondary" className="flex items-center gap-1">
                {feature}
                <button
                  type="button"
                  onClick={() => removeFeature(feature)}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData?.id ? "Update Tool" : "Create Tool"}
        </Button>
      </div>
    </form>
  );
}

