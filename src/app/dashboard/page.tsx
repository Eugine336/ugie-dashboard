"use client";

import { PageHeader } from "@/components/layout/page-header";
import { MetricCard, MetricCardSkeleton } from "@/components/dashboard/metric-card";
import { FunnelChart } from "@/components/dashboard/funnel-chart";
import { EngagementChart } from "@/components/dashboard/engagement-chart";
import { RFMGrid } from "@/components/dashboard/rfm-grid";
import { ChurnChart } from "@/components/dashboard/churn-chart";
import { useDashboard } from "@/hooks/use-dashboard";
import { usePlatformContext } from "@/providers/platform-provider";
import { Users, UserCheck, TrendingUp, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPercent } from "@/lib/utils";

export default function DashboardPage() {
  const { platformId } = usePlatformContext();
  const { data, isLoading, error } = useDashboard();

  if (!platformId) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <Users className="mb-4 h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Select a Platform</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a platform from the header dropdown to view analytics.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <AlertTriangle className="mb-4 h-12 w-12 text-danger" />
        <h2 className="text-xl font-semibold">Failed to Load Dashboard</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Could not connect to the UGIE API. Ensure the backend is running.
        </p>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <>
        <PageHeader
          title="Dashboard"
          description="Platform growth overview"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </>
    );
  }

  const { funnel, engagement, rfm, churn, predictions, growth } = data;

  return (
    <>
      <PageHeader title="Dashboard" description="Platform growth overview" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={funnel.registered}
          format="compact"
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Active Users"
          value={engagement.active + engagement.power}
          format="compact"
          icon={<UserCheck className="h-4 w-4" />}
        />
        <MetricCard
          title="Conversion Rate"
          value={funnel.conversion_rate * 100}
          format="percent"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricCard
          title="Avg Churn Risk"
          value={churn.average_risk * 100}
          format="percent"
          icon={<AlertTriangle className="h-4 w-4" />}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <FunnelChart data={funnel} />
        <EngagementChart data={engagement} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <RFMGrid data={rfm} />
        <ChurnChart data={churn} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Growth (24h)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">New Users</span>
              <span className="font-medium">{growth.new_users_24h}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Events</span>
              <span className="font-medium">
                {growth.total_events_24h.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Active Estimate</span>
              <span className="font-medium">
                {growth.active_users_estimate.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Predictions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">High Churn Risk</span>
              <span className="font-medium text-danger">
                {predictions.churn.high_risk_count}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">High Conversion</span>
              <span className="font-medium text-success">
                {predictions.conversion.high_potential_count}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fraud Suspects</span>
              <span className="font-medium text-danger">
                {predictions.fraud.high_risk_count}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Experiments</span>
              <span className="font-medium">
                {data.experiments.running} running / {data.experiments.total}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Referral Conv.</span>
              <span className="font-medium">
                {formatPercent(data.referrals.conversion_rate * 100)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Audiences</span>
              <span className="font-medium">
                {data.audiences.active} active
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
