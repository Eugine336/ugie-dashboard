"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { usePlatformContext } from "@/providers/platform-provider";
import type { Experiment } from "@/types/experiment";

export function useExperiments() {
  const { platformId } = usePlatformContext();

  return useQuery({
    queryKey: ["experiments", platformId],
    queryFn: () => api.experiments.list(platformId),
    enabled: !!platformId,
  });
}

export function useCreateExperiment() {
  const { platformId } = usePlatformContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Experiment>) => api.experiments.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiments", platformId] });
    },
  });
}

export function useStartExperiment() {
  const { platformId } = usePlatformContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.experiments.start(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiments", platformId] });
    },
  });
}

export function usePauseExperiment() {
  const { platformId } = usePlatformContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.experiments.pause(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiments", platformId] });
    },
  });
}

export function useExperimentResults(id: string) {
  return useQuery({
    queryKey: ["experiment-results", id],
    queryFn: () => api.experiments.results(id),
    enabled: !!id,
  });
}
