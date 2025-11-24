"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Play, AlertCircle } from "lucide-react";

export function ScraperTestContent() {
  const [page, setPage] = useState("1");
  const [scrapeAll, setScrapeAll] = useState(false);
  const [saveToDb, setSaveToDb] = useState(false);
  const [skipDuplicates, setSkipDuplicates] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScrape = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const params = new URLSearchParams();
      if (scrapeAll) {
        params.set("all", "true");
      } else {
        params.set("page", page);
      }
      if (saveToDb) {
        params.set("save", "true");
        params.set("skipDuplicates", skipDuplicates.toString());
      }

      const response = await fetch(`/api/scraper/futuretools?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to scrape");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">FutureTools.io Scraper Test</h1>
        <p className="text-gray-600">
          Test the scraper with actual FutureTools.io website
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Scraper Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="scrapeAll"
                checked={scrapeAll}
                onCheckedChange={(checked) => {
                  setScrapeAll(!!checked);
                }}
              />
              <Label htmlFor="scrapeAll">Scrape All Pages</Label>
            </div>
          </div>

          {!scrapeAll && (
            <div>
              <Label htmlFor="page">Page Number</Label>
              <Input
                id="page"
                type="number"
                min="1"
                value={page}
                onChange={(e) => setPage(e.target.value)}
                className="mt-1"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="saveToDb"
              checked={saveToDb}
              onCheckedChange={(checked) => setSaveToDb(!!checked)}
            />
            <Label htmlFor="saveToDb">Save to Database</Label>
          </div>

          {saveToDb && (
            <div className="flex items-center space-x-2 ml-6">
              <Checkbox
                id="skipDuplicates"
                checked={skipDuplicates}
                onCheckedChange={(checked) => setSkipDuplicates(!!checked)}
              />
              <Label htmlFor="skipDuplicates">Skip Duplicates</Label>
            </div>
          )}

          <Button
            onClick={handleScrape}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scraping...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Scraping
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span className="font-semibold">Error:</span>
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="space-y-6">
          {/* Scrape Results */}
          <Card>
            <CardHeader>
              <CardTitle>Scrape Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Tools Found</div>
                  <div className="text-2xl font-bold">
                    {result.scrape?.tools?.length || 0}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Pages</div>
                  <div className="text-2xl font-bold">
                    {result.scrape?.totalPages || 0}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Current Page</div>
                  <div className="text-2xl font-bold">
                    {result.scrape?.currentPage || 0}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Errors</div>
                  <div className="text-2xl font-bold text-red-600">
                    {result.scrape?.errors?.length || 0}
                  </div>
                </div>
              </div>

              {result.scrape?.errors && result.scrape.errors.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-semibold text-red-600 mb-2">
                    Errors:
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded p-3 max-h-40 overflow-y-auto">
                    {result.scrape.errors.map((err: string, idx: number) => (
                      <div key={idx} className="text-sm text-red-700">
                        {err}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Save Results */}
          {result.save && (
            <Card>
              <CardHeader>
                <CardTitle>Database Save Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600">Saved</div>
                    <div className="text-2xl font-bold text-green-600">
                      {result.save.saved || 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Skipped</div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {result.save.skipped || 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Errors</div>
                    <div className="text-2xl font-bold text-red-600">
                      {result.save.errors?.length || 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Tool IDs</div>
                    <div className="text-2xl font-bold">
                      {result.save.toolIds?.length || 0}
                    </div>
                  </div>
                </div>

                {result.save.errors && result.save.errors.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-semibold text-red-600 mb-2">
                      Save Errors:
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded p-3 max-h-40 overflow-y-auto">
                      {result.save.errors.map((err: string, idx: number) => (
                        <div key={idx} className="text-sm text-red-700">
                          {err}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Tools Preview */}
          {result.scrape?.tools && result.scrape.tools.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Scraped Tools Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {result.scrape.tools.slice(0, 10).map((tool: any, idx: number) => (
                    <div
                      key={idx}
                      className="border rounded p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{tool.name}</h3>
                          {tool.description && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {tool.description}
                            </p>
                          )}
                          <div className="mt-2 flex flex-wrap gap-2 text-xs">
                            {tool.websiteUrl && (
                              <a
                                href={tool.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                Website
                              </a>
                            )}
                            {tool.category && (
                              <span className="text-gray-500">
                                Category: {tool.category}
                              </span>
                            )}
                            {tool.launchDate && (
                              <span className="text-gray-500">
                                Launch: {tool.launchDate}
                              </span>
                            )}
                          </div>
                        </div>
                        {tool.logoUrl && (
                          <img
                            src={tool.logoUrl}
                            alt={tool.name}
                            className="w-16 h-16 object-contain ml-4"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                  {result.scrape.tools.length > 10 && (
                    <div className="text-sm text-gray-500 text-center pt-2">
                      ... and {result.scrape.tools.length - 10} more tools
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Raw JSON (for debugging) */}
          <Card>
            <CardHeader>
              <CardTitle>Raw Response (for debugging)</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-xs">
                {JSON.stringify(result, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

