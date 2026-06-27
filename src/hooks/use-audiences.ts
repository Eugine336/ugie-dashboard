"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { usePlatformContext } from "@/providers/platform-provider";
import type { Audience } from "@/types/audience";

export function useAudiences() {
  const { platformId } = usePlatformContext();

  return useQuery({
    queryKey: ["audiences", platformId],
    queryFn: () => api.audiences.list(platformId),
    enabled: !!platformId,
  });
}

export function useCreateAudience() {
  const { platformId } = usePlatformContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Audience>) =>
      api.audiences.create(platformId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audiences", platformId] });
    },
  });
}

export function useEvaluateAudience() {
  const { platformId } = usePlatformContext();

  return useMutation({
    mutationFn: (audienceId: string) =>
      api.audiences.evaluate(platformId, audienceId),
  });
}

export function useExportAudience() {
  return useMutation({
    mutationFn: ({
      audienceId,
      destination,
    }: {
      audienceId: string;
      destination: string;
    }) => api.audiences.exportAudience(audienceId, destination),
  });
}
