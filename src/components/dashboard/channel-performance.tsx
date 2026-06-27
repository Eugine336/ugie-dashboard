"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChannelPerformance } from "@/types/budget";
import { formatCurrency } from "@/lib/utils";

interface ChannelPerformanceChartProps {
  data: ChannelPerformance[];
}

export function ChannelPerformanceChart({
  data,
}: ChannelPerformanceChartProps) {
  const chartData = data.map((ch) => ({
    name: ch.channel,
    spend: ch.spend,
    conversions: ch.conversions,
    roi: ch.roi,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Channel Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                }}
                formatter={(value: number, name: string) =>
                  name === "spend"
                    ? formatCurrency(value)
                    : value.toLocaleString()
                }
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="spend"
                fill="#2563EB"
                name="Spend"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                yAxisId="right"
                dataKey="conversions"
                fill="#16A34A"
                name="Conversions"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
