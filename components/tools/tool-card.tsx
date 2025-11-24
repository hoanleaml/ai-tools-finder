import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import type { Tool } from "@/lib/tools/get-tools";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  // Get first 150 characters of description
  const description = tool.description
    ? tool.description.length > 150
      ? `${tool.description.substring(0, 150)}...`
      : tool.description
    : "No description available";

  // Format pricing model
  const pricingLabels: Record<string, string> = {
    free: "Free",
    freemium: "Freemium",
    paid: "Paid",
    "one-time": "One-time",
  };

  const pricingLabel = tool.pricing_model
    ? pricingLabels[tool.pricing_model] || tool.pricing_model
    : null;

  return (
    <Link href={`/tools/${tool.slug || tool.id}`} className="block h-full">
      <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            {tool.logo_url ? (
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border bg-white">
                <Image
                  src={tool.logo_url}
                  alt={`${tool.name} logo`}
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                />
              </div>
            ) : (
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border bg-gray-100 text-gray-400">
                <ExternalLink className="h-6 w-6" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <CardTitle className="line-clamp-2 text-lg">{tool.name}</CardTitle>
              {pricingLabel && (
                <Badge variant="secondary" className="mt-1">
                  {pricingLabel}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3 text-sm">
            {description}
          </CardDescription>
          {tool.features && Array.isArray(tool.features) && tool.features.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {tool.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {tool.features.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tool.features.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

