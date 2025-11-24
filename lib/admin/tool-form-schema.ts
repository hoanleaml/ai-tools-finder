import { z } from "zod";

export const toolFormSchema = z.object({
  name: z.string().min(1, "Tool name is required").max(255, "Tool name is too long"),
  description: z.string().optional().nullable(),
  website_url: z.string().url("Invalid website URL").min(1, "Website URL is required"),
  logo_url: z.string().url("Invalid logo URL").optional().nullable().or(z.literal("")),
  category_id: z.string().uuid("Invalid category").optional().nullable(),
  pricing_model: z.enum(["free", "freemium", "paid", "one-time"]).optional().nullable(),
  features: z.array(z.string()).optional().nullable(),
  status: z.enum(["active", "pending", "archived"]).default("active"),
});

export type ToolFormData = z.infer<typeof toolFormSchema>;

