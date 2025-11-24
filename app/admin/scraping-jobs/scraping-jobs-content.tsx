"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, RefreshCw, Play, AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ScrapingJob {
  id: string;
  source_url: string;
  status: string;
  error_message: string | null;
  tools_found: number;
  created_at: string;
  completed_at: string | null;
}

export function ScrapingJobsContent() {
  const [jobs, setJobs] = useState<ScrapingJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [triggering, setTriggering] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/scraping-jobs");
      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || []);
      }
    } catch (error) {
      console.error("Error fetching scraping jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleTriggerJob = async () => {
    setTriggering(true);
    try {
      const response = await fetch("/api/cron/sync-tools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        const result = await response.json();
        alert(`Job triggered successfully!\nJob ID: ${result.jobId}\nTools found: ${result.scrape.toolsFound}\nTools saved: ${result.save.saved}`);
        // Refresh jobs list after a short delay
        setTimeout(() => {
          fetchJobs();
        }, 2000);
      } else {
        const error = await response.json();
        alert(`Failed to trigger job: ${error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error triggering job:", error);
      alert("Failed to trigger job. Check console for details.");
    } finally {
      setTriggering(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        );
      case "running":
        return (
          <Badge variant="secondary" className="bg-blue-500">
            <Clock className="mr-1 h-3 w-3" />
            Running
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus =
      filterStatus === "all" || job.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      job.source_url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: jobs.length,
    completed: jobs.filter((j) => j.status === "completed").length,
    failed: jobs.filter((j) => j.status === "failed").length,
    running: jobs.filter((j) => j.status === "running").length,
    pending: jobs.filter((j) => j.status === "pending").length,
  };

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Scraping Jobs</h1>
            <p className="text-gray-600">
              Monitor and manage scraping jobs from FutureTools.io
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={fetchJobs}
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              onClick={handleTriggerJob}
              disabled={triggering}
            >
              {triggering ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Triggering...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Trigger Job
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-600">Total Jobs</div>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-600">Completed</div>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-600">Failed</div>
              <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-600">Running</div>
              <div className="text-2xl font-bold text-blue-600">{stats.running}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-600">Pending</div>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by URL or Job ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-48">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Job History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No scraping jobs found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Source URL</TableHead>
                  <TableHead>Tools Found</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Error</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={job.source_url}>
                        {job.source_url}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{job.tools_found}</span>
                    </TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(job.created_at), {
                        addSuffix: true,
                      })}
                    </TableCell>
                    <TableCell>
                      {job.completed_at
                        ? formatDistanceToNow(new Date(job.completed_at), {
                            addSuffix: true,
                          })
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {job.error_message ? (
                        <div className="flex items-center text-red-600">
                          <AlertCircle className="mr-1 h-4 w-4" />
                          <span className="max-w-xs truncate" title={job.error_message}>
                            {job.error_message.substring(0, 50)}...
                          </span>
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

