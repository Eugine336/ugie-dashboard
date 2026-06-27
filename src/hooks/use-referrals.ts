"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { usePlatformContext } from "@/providers/platform-provider";
import type { ReferralProgram } from "@/types/referral";

export function useReferralPrograms() {
  const { platformId } = usePlatformContext();

  return useQuery({
    queryKey: ["referral-programs", platformId],
    queryFn: () => api.referrals.programs(platformId),
    enabled: !!platformId,
  });
}

export function useCreateReferralProgram() {
  const { platformId } = usePlatformContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ReferralProgram>) =>
      api.referrals.createProgram(platformId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["referral-programs", platformId],
      });
    },
  });
}
