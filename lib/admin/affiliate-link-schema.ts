import { z } from "zod";

export const affiliateLinkSchema = z.object({
  tool_id: z.string().uuid("Invalid tool ID"),
  affiliate_url: z.string().url("Invalid affiliate URL").min(1, "Affiliate URL is required"),
  program_name: z.string().optional().nullable(),
  commission_rate: z.number().min(0).max(100).optional().nullable(),
  status: z.enum(["active", "pending", "expired"]).optional().default("active"),
});

export type AffiliateLinkFormData = z.infer<typeof affiliateLinkSchema>;

