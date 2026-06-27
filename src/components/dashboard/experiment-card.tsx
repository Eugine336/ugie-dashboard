"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Experiment } from "@/types/experiment";
import { cn, formatPercent } from "@/lib/utils";

interface ExperimentCardProps {
  experiment: Experiment;
  onStart?: () => void;
  onPause?: () => void;
}

const statusVariant: Record<string, "default" | "success" | "warning" | "secondary" | "destructive"> = {
  draft: "secondary",
  running: "success",
  paused: "warning",
  completed: "default",
};

export function ExperimentCard({
  experiment,
  onStart,
  onPause,
}: ExperimentCardProps) {
  const maxConversions = Math.max(
    ...experiment.variants.map((v) => v.conversions),
    1
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{experiment.name}</CardTitle>
          <Badge variant={statusVariant[experiment.status] || "secondary"}>
            {experiment.status}
          </Badge>
        </div>
        {experiment.description && (
          <p className="text-sm text-muted-foreground">
            {experiment.description}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {experiment.variants.map((variant) => (
            <div key={variant.id} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                  {variant.name}
                  {variant.is_control && (
                    <span className="ml-1 text-xs text-muted-foreground">
                      (control)
                    </span>
                  )}
                </span>
                <span className="tabular-nums">
                  {formatPercent(variant.conversion_rate * 100)}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    variant.is_control ? "bg-muted-foreground/40" : "bg-primary"
                  )}
                  style={{
                    width: `${(variant.conversions / maxConversions) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{variant.assignments.toLocaleString()} assigned</span>
                <span>{variant.conversions.toLocaleString()} converted</span>
              </div>
            </div>
          ))}
        </div>

        {(onStart || onPause) && (
          <div className="mt-4 flex gap-2">
            {experiment.status === "draft" && onStart && (
              <button
                onClick={onStart}
                className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
              >
                Start
              </button>
            )}
            {experiment.status === "running" && onPause && (
              <button
                onClick={onPause}
                className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
              >
                Pause
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
