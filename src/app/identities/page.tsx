"use client";

import { PageHeader } from "@/components/layout/page-header";
import { MetricCard, MetricCardSkeleton } from "@/components/dashboard/metric-card";
import {
  useCrossPlatformStats,
  useCrossPlatformIdentities,
  useCrossPlatformConfig,
} from "@/hooks/use-identities";
import { usePlatformContext } from "@/providers/platform-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Network, Link2, Inbox, Globe, Fingerprint } from "lucide-react";

export default function IdentitiesPage() {
  const { platformId } = usePlatformContext();
  const { data: stats, isLoading: statsLoading } = useCrossPlatformStats();
  const { data: identities, isLoading: identitiesLoading } =
    useCrossPlatformIdentities();
  const { data: config } = useCrossPlatformConfig();

  if (!platformId) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <Network className="mb-4 h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Select a Platform</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a platform to view cross-platform identities.
        </p>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Cross-Platform Identities"
        description="Identity linking across platforms"
      />

      {statsLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>
      ) : stats ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Links"
            value={stats.total_links}
            icon={<Link2 className="h-4 w-4" />}
          />
          <MetricCard
            title="Linked Platforms"
            value={stats.linked_platforms}
            icon={<Globe className="h-4 w-4" />}
          />
          <MetricCard
            title="Identities Linked"
            value={stats.identities_linked}
            icon={<Fingerprint className="h-4 w-4" />}
          />
          <MetricCard
            title="Touchpoint Types"
            value={Object.keys(stats.touchpoint_types).length}
            icon={<Network className="h-4 w-4" />}
          />
        </div>
      ) : null}

      {config && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Linking Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium">Cross-Platform Linking</p>
                <Badge
                  variant={
                    config.allow_cross_platform_linking ? "success" : "secondary"
                  }
                  className="mt-1"
                >
                  {config.allow_cross_platform_linking ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Linkable Touchpoints</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {config.linkable_touchpoint_types.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Sharing Permissions</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {config.sharing_permissions.map((p) => (
                    <Badge key={p} variant="outline">
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Partner Whitelist</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {config.partner_whitelist.length > 0 ? (
                    config.partner_whitelist.map((p) => (
                      <Badge key={p} variant="outline">
                        {p}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      All platforms
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Linked Identities</CardTitle>
        </CardHeader>
        <CardContent>
          {identitiesLoading ? (
            <Skeleton className="h-48" />
          ) : identities && identities.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Touchpoint Type</TableHead>
                  <TableHead>Hash</TableHead>
                  <TableHead>Platforms</TableHead>
                  <TableHead>Identities</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {identities.map((identity) => (
                  <TableRow key={identity.link_id}>
                    <TableCell>
                      <Badge variant="outline">
                        {identity.touchpoint_type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {identity.touchpoint_hash.slice(0, 16)}...
                    </TableCell>
                    <TableCell>{identity.platforms.length}</TableCell>
                    <TableCell>{identity.identities.length}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(identity.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Inbox className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No cross-platform identities linked yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
