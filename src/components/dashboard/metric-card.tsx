"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCompact } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number | string;
  change?: number;
  format?: "number" | "percent" | "currency" | "compact";
  icon?: React.ReactNode;
}

export function MetricCard({
  title,
  value,
  change,
  format = "number",
  icon,
}: MetricCardProps) {
  const formattedValue =
    typeof value === "string"
      ? value
      : format === "percent"
      ? `${value.toFixed(1)}%`
      : format === "currency"
      ? `$${value.toLocaleString()}`
      : format === "compact"
      ? formatCompact(value)
      : value.toLocaleString();

  const trendColor =
    change === undefined || change === 0
      ? "text-muted-foreground"
      : change > 0
      ? "text-success"
      : "text-danger";

  const TrendIcon =
    change === undefined || change === 0
      ? Minus
      : change > 0
      ? TrendingUp
      : TrendingDown;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-3xl font-bold">{formattedValue}</p>
          {change !== undefined && (
            <div className={cn("flex items-center gap-1 text-sm", trendColor)}>
              <TrendIcon className="h-4 w-4" />
              <span>{Math.abs(change).toFixed(1)}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function MetricCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-8 w-32 animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  );
}
