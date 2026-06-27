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
import type { FunnelMetrics } from "@/types/analytics";
import { formatCompact, formatPercent } from "@/lib/utils";

interface FunnelChartProps {
  data: FunnelMetrics;
}

const COLORS = ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];

export function FunnelChart({ data }: FunnelChartProps) {
  const chartData = [
    { name: "Registered", value: data.registered, rate: 100 },
    {
      name: "Activated",
      value: data.activated,
      rate: data.activation_rate * 100,
    },
    {
      name: "Converted",
      value: data.converted,
      rate: data.conversion_rate * 100,
    },
    {
      name: "Retained",
      value: data.retained,
      rate: data.retention_rate * 100,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={90}
                tick={{ fontSize: 13 }}
              />
              <Tooltip
                formatter={(value: number) => formatCompact(value)}
                labelFormatter={(label: string) => label}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Activation</p>
            <p className="text-sm font-semibold">
              {formatPercent(data.activation_rate * 100)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Conversion</p>
            <p className="text-sm font-semibold">
              {formatPercent(data.conversion_rate * 100)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Retention</p>
            <p className="text-sm font-semibold">
              {formatPercent(data.retention_rate * 100)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
