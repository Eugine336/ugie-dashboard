"use client";

import { PageHeader } from "@/components/layout/page-header";
import { MetricCard, MetricCardSkeleton } from "@/components/dashboard/metric-card";
import { ChannelPerformanceChart } from "@/components/dashboard/channel-performance";
import {
  useBudgetSummary,
  useBudgetHistory,
  useBudgetRecommendations,
  useOptimizeBudget,
} from "@/hooks/use-budget";
import { usePlatformContext } from "@/providers/platform-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet, DollarSign, TrendingUp, Target, Zap } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";

export default function BudgetPage() {
  const { platformId } = usePlatformContext();
  const { data: summary, isLoading } = useBudgetSummary();
  const { data: history } = useBudgetHistory();
  const { data: recommendations } = useBudgetRecommendations();
  const optimizeMutation = useOptimizeBudget();

  if (!platformId) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <Wallet className="mb-4 h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Select a Platform</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a platform to view budget allocation.
        </p>
      </div>
    );
  }

  if (isLoading || !summary) {
    return (
      <>
        <PageHeader title="Budget Allocator" description="Channel spend optimization" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>
        <Skeleton className="mt-6 h-80" />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Budget Allocator"
        description="Channel spend optimization"
        actions={
          <Button
            onClick={() => optimizeMutation.mutate()}
            disabled={optimizeMutation.isPending}
          >
            <Zap className="mr-2 h-4 w-4" />
            {optimizeMutation.isPending ? "Optimizing..." : "Optimize Now"}
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Budget"
          value={summary.total_budget}
          format="currency"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Total Spent"
          value={summary.total_spent}
          format="currency"
          icon={<Wallet className="h-4 w-4" />}
        />
        <MetricCard
          title="Weighted ROI"
          value={`${summary.weighted_roi.toFixed(1)}x`}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricCard
          title="Blended CAC"
          value={summary.blended_cac}
          format="currency"
          icon={<Target className="h-4 w-4" />}
        />
      </div>

      {summary.channels.length > 0 && (
        <div className="mt-6">
          <ChannelPerformanceChart data={summary.channels} />
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Channel Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Channel</TableHead>
                  <TableHead className="text-right">Spend</TableHead>
                  <TableHead className="text-right">Conv.</TableHead>
                  <TableHead className="text-right">CAC</TableHead>
                  <TableHead className="text-right">ROI</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.channels.map((ch) => (
                  <TableRow key={ch.channel}>
                    <TableCell className="font-medium">{ch.channel}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(ch.spend)}
                    </TableCell>
                    <TableCell className="text-right">
                      {ch.conversions}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(ch.cac)}
                    </TableCell>
                    <TableCell className="text-right">
                      {ch.roi.toFixed(1)}x
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          ch.status === "active"
                            ? "success"
                            : ch.status === "paused"
                            ? "secondary"
                            : "warning"
                        }
                      >
                        {ch.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            {recommendations && recommendations.length > 0 ? (
              <div className="space-y-3">
                {recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border p-3"
                  >
                    <Badge
                      variant={
                        rec.action === "increase"
                          ? "success"
                          : rec.action === "pause"
                          ? "destructive"
                          : "warning"
                      }
                    >
                      {rec.action}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{rec.channel}</p>
                      <p className="text-xs text-muted-foreground">
                        {rec.reason}
                      </p>
                      <p className="mt-1 text-xs">
                        {formatCurrency(rec.current_budget)} →{" "}
                        {formatCurrency(rec.suggested_budget)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No recommendations available yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {history && history.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Reallocation History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Strategy</TableHead>
                  <TableHead>Changes</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.slice(0, 10).map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="text-sm">
                      {new Date(event.timestamp).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{event.strategy}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {event.changes.length} channels
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                      {event.reason}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
}
