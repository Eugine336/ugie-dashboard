"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChurnBreakdown } from "@/types/analytics";
import { formatNumber, formatPercent } from "@/lib/utils";

interface ChurnChartProps {
  data: ChurnBreakdown;
}

const RISK_LEVELS = [
  { key: "low" as const, label: "Low", color: "#16A34A" },
  { key: "medium" as const, label: "Medium", color: "#D97706" },
  { key: "high" as const, label: "High", color: "#EA580C" },
  { key: "critical" as const, label: "Critical", color: "#DC2626" },
];

export function ChurnChart({ data }: ChurnChartProps) {
  const chartData = RISK_LEVELS.map((level) => ({
    name: level.label,
    value: data[level.key],
    color: level.color,
  }));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Churn Risk</CardTitle>
          <span className="text-sm text-muted-foreground">
            Avg risk: {formatPercent(data.average_risk * 100)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => formatNumber(value)}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
