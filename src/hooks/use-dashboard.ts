"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { usePlatformContext } from "@/providers/platform-provider";

export function useDashboard() {
  const { platformId } = usePlatformContext();

  return useQuery({
    queryKey: ["dashboard", platformId],
    queryFn: () => api.analytics.dashboard(platformId),
    enabled: !!platformId,
  });
}

export function useGrowthMetrics() {
  const { platformId } = usePlatformContext();

  return useQuery({
    queryKey: ["growth", platformId],
    queryFn: () => api.analytics.growth(platformId),
    enabled: !!platformId,
  });
}
