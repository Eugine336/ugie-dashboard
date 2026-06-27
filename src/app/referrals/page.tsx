"use client";

import { PageHeader } from "@/components/layout/page-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { useReferralPrograms } from "@/hooks/use-referrals";
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
import { Share2, Users, Inbox, Award, UserPlus } from "lucide-react";
import { formatPercent } from "@/lib/utils";

export default function ReferralsPage() {
  const { platformId } = usePlatformContext();
  const { data: programs, isLoading } = useReferralPrograms();

  if (!platformId) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <Share2 className="mb-4 h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Select a Platform</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a platform to manage referral programs.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <>
        <PageHeader title="Referrals" description="Referral programs" />
        <Skeleton className="h-96" />
      </>
    );
  }

  if (!programs || programs.length === 0) {
    return (
      <>
        <PageHeader title="Referrals" description="Referral program management" />
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Inbox className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No Referral Programs</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Create a referral program to enable user-driven growth.
            </p>
          </CardContent>
        </Card>
      </>
    );
  }

  const totalCodes = programs.reduce((s, p) => s + p.total_codes, 0);
  const totalReferrals = programs.reduce((s, p) => s + p.total_referrals, 0);
  const totalConversions = programs.reduce((s, p) => s + p.total_conversions, 0);
  const overallRate = totalReferrals > 0 ? totalConversions / totalReferrals : 0;

  return (
    <>
      <PageHeader title="Referrals" description="Referral program management" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Codes"
          value={totalCodes}
          icon={<Award className="h-4 w-4" />}
        />
        <MetricCard
          title="Total Referrals"
          value={totalReferrals}
          icon={<UserPlus className="h-4 w-4" />}
        />
        <MetricCard
          title="Conversions"
          value={totalConversions}
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Conversion Rate"
          value={overallRate * 100}
          format="percent"
        />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead className="text-right">Codes</TableHead>
                <TableHead className="text-right">Referrals</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead className="text-right">Conv. Rate</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>
                    {program.reward_type} — {program.reward_amount}{" "}
                    {program.reward_currency}
                  </TableCell>
                  <TableCell className="text-right">
                    {program.total_codes}
                  </TableCell>
                  <TableCell className="text-right">
                    {program.total_referrals}
                  </TableCell>
                  <TableCell className="text-right">
                    {program.total_conversions}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPercent(program.conversion_rate * 100)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        program.status === "active"
                          ? "success"
                          : program.status === "paused"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {program.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
