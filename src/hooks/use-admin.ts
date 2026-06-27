"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useSystemHealth() {
  return useQuery({
    queryKey: ["health"],
    queryFn: api.admin.health,
    refetchInterval: 30000,
    retry: false,
  });
}

export function usePlatforms() {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: api.admin.platforms,
    retry: false,
  });
}

export function useGlobalStats() {
  return useQuery({
    queryKey: ["global-stats"],
    queryFn: api.admin.stats,
    retry: false,
  });
}
