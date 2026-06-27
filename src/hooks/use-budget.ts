"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { usePlatformContext } from "@/providers/platform-provider";

export function useBudgetConfig() {
  const { platformId } = usePlatformContext();

  return useQuery({
    queryKey: ["budget-config", platformId],
    queryFn: () => api.budget.config(platformId),
    enabled: !!platformId,
  });
}

export function useBudgetPerformance() {
  const { platformId } = usePlatformContext();

  return useQuery({
    queryKey: ["budget-performance", platformId],
    queryFn: () => api.budget.performance(platformId),
    enabled: !!platformId,
  });
}

export function useBudgetSummary() {
  const { platformId } = usePlatformContext();

  return useQuery({
    queryKey: ["budget-summary", platformId],
    queryFn: () => api.budget.summary(platformId),
    enabled: !!platformId,
  });
}

export function useBudgetHistory() {
  const { platformId } = usePlatformContext();

  return useQuery({
    queryKey: ["budget-history", platformId],
    queryFn: () => api.budget.history(platformId),
    enabled: !!platformId,
  });
}

export function useBudgetRecommendations() {
  const { platformId } = usePlatformContext();

  return useQuery({
    queryKey: ["budget-recommend", platformId],
    queryFn: () => api.budget.recommend(platformId),
    enabled: !!platformId,
  });
}

export function useOptimizeBudget() {
  const { platformId } = usePlatformContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.budget.optimize(platformId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget-performance", platformId] });
      queryClient.invalidateQueries({ queryKey: ["budget-summary", platformId] });
      queryClient.invalidateQueries({ queryKey: ["budget-history", platformId] });
    },
  });
}
