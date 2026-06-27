"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EngagementBreakdown } from "@/types/analytics";
import { formatNumber } from "@/lib/utils";

interface EngagementChartProps {
  data: EngagementBreakdown;
}

const TIERS = [
  { key: "power" as const, label: "Power", color: "#2563EB" },
  { key: "active" as const, label: "Active", color: "#16A34A" },
  { key: "warming" as const, label: "Warming", color: "#D97706" },
  { key: "cold" as const, label: "Cold", color: "#94A3B8" },
];

export function EngagementChart({ data }: EngagementChartProps) {
  const chartData = TIERS.map((tier) => ({
    name: tier.label,
    value: data[tier.key],
    color: tier.color,
  })).filter((d) => d.value > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Tiers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => formatNumber(value)}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {formatNumber(data.total)} total users
        </p>
      </CardContent>
    </Card>
  );
}
