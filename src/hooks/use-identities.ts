"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { usePlatformContext } from "@/providers/platform-provider";

export function useCrossPlatformIdentities() {
  const { platformId } = usePlatformContext();

  return useQuery({
    queryKey: ["cross-platform-identities", platformId],
    queryFn: () => api.crossPlatform.identities(platformId),
    enabled: !!platformId,
  });
}

export function useCrossPlatformStats() {
  const { platformId } = usePlatformContext();

  return useQuery({
    queryKey: ["cross-platform-stats", platformId],
    queryFn: () => api.crossPlatform.stats(platformId),
    enabled: !!platformId,
  });
}

export function useCrossPlatformConfig() {
  const { platformId } = usePlatformContext();

  return useQuery({
    queryKey: ["cross-platform-config", platformId],
    queryFn: () => api.crossPlatform.config(platformId),
    enabled: !!platformId,
  });
}
