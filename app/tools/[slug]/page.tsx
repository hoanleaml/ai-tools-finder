import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getToolBySlug } from "@/lib/tools/get-tool-by-slug";
import { getRelatedTools } from "@/lib/tools/get-related-tools";
import { getCategories } from "@/lib/categories/get-categories";
import { getAffiliateLink } from "@/lib/affiliate/get-affiliate-link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, ArrowLeft, Share2 } from "lucide-react";
import { ToolCard } from "@/components/tools/tool-card";
import type { Metadata } from "next";

interface ToolDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ToolDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  const description = tool.description || `Discover ${tool.name}, an AI tool for your workflow.`;

  return {
    title: `${tool.name} | AI Tools Finder`,
    description,
    openGraph: {
      title: tool.name,
      description,
      type: "website",
      images: tool.logo_url ? [tool.logo_url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.name,
      description,
      images: tool.logo_url ? [tool.logo_url] : [],
    },
  };
}

export async function generateStaticParams() {
  // Generate static params for popular tools (optional - for ISR)
  // For now, return empty array to use dynamic rendering
  return [];
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // Get category name for breadcrumb
  const categories = await getCategories();
  const category = categories.find((c) => c.id === tool.category_id);

  // Get affiliate link if available
  const affiliateLink = await getAffiliateLink(tool.id);

  // Get related tools
  const relatedTools = await getRelatedTools(tool.category_id, tool.id, 4);

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

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description || "",
    url: tool.website_url,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    offers: tool.pricing_model
      ? {
          "@type": "Offer",
          price: tool.pricing_model === "free" ? "0" : "0",
          priceCurrency: "USD",
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/tools" className="hover:text-gray-900">
                Tools
              </Link>
            </li>
            {category && (
              <>
                <li>/</li>
                <li>
                  <Link
                    href={`/tools?category=${category.id}`}
                    className="hover:text-gray-900"
                  >
                    {category.name}
                  </Link>
                </li>
              </>
            )}
            <li>/</li>
            <li className="text-gray-900 font-medium">{tool.name}</li>
          </ol>
        </nav>

        {/* Back button */}
        <Link href="/tools">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>

        {/* Tool Header */}
        <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            {/* Logo */}
            {tool.logo_url ? (
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border bg-white">
                <Image
                  src={tool.logo_url}
                  alt={`${tool.name} logo`}
                  fill
                  className="object-contain p-2"
                  sizes="96px"
                />
              </div>
            ) : (
              <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg border bg-gray-100">
                <ExternalLink className="h-12 w-12 text-gray-400" />
              </div>
            )}

            {/* Tool Info */}
            <div className="flex-1">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="mb-2 text-4xl font-bold tracking-tight">{tool.name}</h1>
                  {pricingLabel && (
                    <Badge variant="secondary" className="mb-2">
                      {pricingLabel}
                    </Badge>
                  )}
                </div>
              </div>

              {tool.description && (
                <p className="mb-4 text-lg text-gray-700">{tool.description}</p>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {affiliateLink ? (
                  <Button asChild size="lg">
                    <a
                      href={`/api/affiliate/click?tool_id=${tool.id}&affiliate_link_id=${affiliateLink.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                ) : (
                  <Button asChild size="lg">
                    <a
                      href={tool.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
                <SocialShare
                  toolName={tool.name}
                  toolDescription={tool.description || ""}
                  toolUrl={`/tools/${tool.slug || tool.id}`}
                  toolImage={tool.logo_url}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            {tool.features && Array.isArray(tool.features) && tool.features.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-semibold">Key Features</h2>
                <div className="flex flex-wrap gap-2">
                  {tool.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Use Cases */}
            {tool.features && Array.isArray(tool.features) && tool.features.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-semibold">Use Cases</h2>
                <div className="space-y-3">
                  {tool.features.slice(0, 5).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 rounded-lg border p-4">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                      <div>
                        <p className="font-medium">{feature}</p>
                        <p className="mt-1 text-sm text-gray-600">
                          Use {tool.name} for {feature.toLowerCase()} tasks and workflows
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Pricing Breakdown */}
              {/* PricingBreakdown component - to be implemented */}
          </div>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-semibold">Related Tools</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedTools.map((relatedTool) => (
                <ToolCard key={relatedTool.id} tool={relatedTool} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

