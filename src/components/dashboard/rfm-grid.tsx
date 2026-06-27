"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RFMBreakdown } from "@/types/analytics";
import { cn, formatNumber } from "@/lib/utils";

interface RFMGridProps {
  data: RFMBreakdown;
}

const SEGMENTS = [
  { key: "champions" as const, label: "Champions", color: "bg-blue-600", textColor: "text-white" },
  { key: "loyal" as const, label: "Loyal", color: "bg-blue-500", textColor: "text-white" },
  { key: "potential" as const, label: "Potential", color: "bg-green-500", textColor: "text-white" },
  { key: "new_customers" as const, label: "New", color: "bg-emerald-400", textColor: "text-white" },
  { key: "at_risk" as const, label: "At Risk", color: "bg-amber-500", textColor: "text-white" },
  { key: "hibernating" as const, label: "Hibernating", color: "bg-orange-500", textColor: "text-white" },
  { key: "lost" as const, label: "Lost", color: "bg-red-500", textColor: "text-white" },
];

export function RFMGrid({ data }: RFMGridProps) {
  const total = data.total || 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle>RFM Segments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {SEGMENTS.map((segment) => {
            const count = data[segment.key];
            const pct = ((count / total) * 100).toFixed(1);
            return (
              <div
                key={segment.key}
                className={cn(
                  "flex flex-col items-center justify-center rounded-lg p-3",
                  segment.color,
                  segment.textColor
                )}
              >
                <span className="text-xs font-medium opacity-90">
                  {segment.label}
                </span>
                <span className="text-xl font-bold">
                  {formatNumber(count)}
                </span>
                <span className="text-xs opacity-80">{pct}%</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
