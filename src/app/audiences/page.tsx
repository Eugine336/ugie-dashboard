"use client";

import { PageHeader } from "@/components/layout/page-header";
import { useAudiences } from "@/hooks/use-audiences";
import { usePlatformContext } from "@/providers/platform-provider";
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
import { Users, Inbox } from "lucide-react";
import { formatNumber } from "@/lib/utils";

const statusVariant: Record<string, "success" | "secondary" | "outline"> = {
  active: "success",
  draft: "secondary",
  archived: "outline",
};

export default function AudiencesPage() {
  const { platformId } = usePlatformContext();
  const { data: audiences, isLoading } = useAudiences();

  if (!platformId) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <Users className="mb-4 h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Select a Platform</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a platform to manage audiences.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <>
        <PageHeader title="Audiences" description="Behavioral segmentation" />
        <Skeleton className="h-96" />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Audiences"
        description="Behavioral segmentation and ad platform export"
      />

      {!audiences || audiences.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Inbox className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No Audiences</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Create your first audience to start segmenting users.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Audiences ({audiences.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Rules</TableHead>
                  <TableHead className="text-right">Est. Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {audiences.map((audience) => (
                  <TableRow key={audience.id}>
                    <TableCell className="font-medium">
                      {audience.name}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                      {audience.description || "—"}
                    </TableCell>
                    <TableCell>{audience.rules.length} rules</TableCell>
                    <TableCell className="text-right">
                      {formatNumber(audience.estimated_size)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[audience.status] || "secondary"}>
                        {audience.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(audience.created_at).toLocaleDateString()}
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
