"use client";

import { PageHeader } from "@/components/layout/page-header";
import { MetricCard, MetricCardSkeleton } from "@/components/dashboard/metric-card";
import { useSystemHealth, usePlatforms, useGlobalStats } from "@/hooks/use-admin";
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
import {
  Shield,
  Server,
  Database,
  Users,
  Activity,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function AdminPage() {
  const { data: health, isLoading: healthLoading } = useSystemHealth();
  const { data: platforms, isLoading: platformsLoading } = usePlatforms();
  const { data: stats, isLoading: statsLoading } = useGlobalStats();

  return (
    <>
      <PageHeader
        title="System Admin"
        description="Global system health and platform management"
      />

      {healthLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>System Health</CardTitle>
                {health && (
                  <Badge
                    variant={
                      health.status === "healthy" ? "success" : "destructive"
                    }
                  >
                    {health.status}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {health ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(health.components).map(
                    ([component, status]) => (
                      <div
                        key={component}
                        className="flex items-center gap-2 rounded-lg border p-3"
                      >
                        {status === "healthy" ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : (
                          <XCircle className="h-4 w-4 text-danger" />
                        )}
                        <span className="text-sm font-medium capitalize">
                          {component.replace(/_/g, " ")}
                        </span>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Unable to reach the UGIE API.
                </p>
              )}
            </CardContent>
          </Card>

          {statsLoading ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <MetricCardSkeleton key={i} />
              ))}
            </div>
          ) : stats ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Platforms"
                value={stats.total_platforms}
                icon={<Server className="h-4 w-4" />}
              />
              <MetricCard
                title="Total Entities"
                value={stats.total_entities}
                format="compact"
                icon={<Database className="h-4 w-4" />}
              />
              <MetricCard
                title="Total Identities"
                value={stats.total_identities}
                format="compact"
                icon={<Users className="h-4 w-4" />}
              />
              <MetricCard
                title="Events Processed"
                value={stats.total_events_processed}
                format="compact"
                icon={<Activity className="h-4 w-4" />}
              />
            </div>
          ) : null}
        </>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Registered Platforms</CardTitle>
        </CardHeader>
        <CardContent>
          {platformsLoading ? (
            <Skeleton className="h-48" />
          ) : platforms && platforms.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead className="text-right">Entities</TableHead>
                  <TableHead className="text-right">Identities</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {platforms.map((platform) => (
                  <TableRow key={platform.id}>
                    <TableCell className="font-medium">
                      {platform.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {platform.slug}
                    </TableCell>
                    <TableCell className="text-sm">
                      {platform.owner_email}
                    </TableCell>
                    <TableCell className="text-right">
                      {(platform.entity_count || 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {(platform.identity_count || 0).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          platform.status === "active"
                            ? "success"
                            : platform.status === "suspended"
                            ? "destructive"
                            : "warning"
                        }
                      >
                        {platform.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(platform.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Shield className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No platforms registered yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
