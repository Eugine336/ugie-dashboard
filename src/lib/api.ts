import type { PlatformDashboard, FunnelMetrics, EngagementBreakdown, RFMBreakdown, ChurnBreakdown, PredictionSummary, GrowthMetrics } from "@/types/analytics";
import type { Platform, SystemHealth, GlobalStats } from "@/types/platform";
import type { BudgetConfig, BudgetSummary, ChannelPerformance, ReallocationEvent, BudgetRecommendation } from "@/types/budget";
import type { Audience, ExportJob } from "@/types/audience";
import type { Experiment, ExperimentResults } from "@/types/experiment";
import type { ReferralProgram, ReferralStats } from "@/types/referral";
import type { CrossPlatformIdentity, CrossPlatformStats, CrossPlatformConfig } from "@/types/identity";

const API_BASE = process.env.NEXT_PUBLIC_UGIE_API_URL || "http://localhost:8000";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  apiKey?: string
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (apiKey) {
    headers["X-API-Key"] = apiKey;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new ApiError(res.status, body || res.statusText);
  }

  return res.json();
}

function qs(params: Record<string, string | undefined>): string {
  const entries = Object.entries(params).filter(
    (entry): entry is [string, string] => entry[1] !== undefined
  );
  if (entries.length === 0) return "";
  return "?" + new URLSearchParams(entries).toString();
}

export const api = {
  analytics: {
    dashboard: (platformId: string) =>
      request<PlatformDashboard>(`/api/v1/analytics/dashboard${qs({ platform_id: platformId })}`),
    funnel: (platformId: string) =>
      request<FunnelMetrics>(`/api/v1/analytics/funnel${qs({ platform_id: platformId })}`),
    engagement: (platformId: string) =>
      request<EngagementBreakdown>(`/api/v1/analytics/engagement${qs({ platform_id: platformId })}`),
    rfm: (platformId: string) =>
      request<RFMBreakdown>(`/api/v1/analytics/rfm${qs({ platform_id: platformId })}`),
    churn: (platformId: string) =>
      request<ChurnBreakdown>(`/api/v1/analytics/churn${qs({ platform_id: platformId })}`),
    predictions: (platformId: string) =>
      request<PredictionSummary>(`/api/v1/analytics/predictions${qs({ platform_id: platformId })}`),
    growth: (platformId: string) =>
      request<GrowthMetrics>(`/api/v1/analytics/growth${qs({ platform_id: platformId })}`),
  },

  admin: {
    health: () => request<SystemHealth>("/api/v1/admin/health"),
    platforms: () => request<Platform[]>("/api/v1/admin/platforms"),
    platform: (id: string) => request<Platform>(`/api/v1/admin/platforms/${id}`),
    updatePlatform: (id: string, data: Partial<Platform>) =>
      request<Platform>(`/api/v1/admin/platforms/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    stats: () => request<GlobalStats>("/api/v1/admin/stats"),
  },

  budget: {
    config: (platformId: string) =>
      request<BudgetConfig>(`/api/v1/budget/config${qs({ platform_id: platformId })}`),
    setConfig: (platformId: string, data: Partial<BudgetConfig>) =>
      request<BudgetConfig>(`/api/v1/budget/config${qs({ platform_id: platformId })}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    performance: (platformId: string) =>
      request<ChannelPerformance[]>(`/api/v1/budget/performance${qs({ platform_id: platformId })}`),
    optimize: (platformId: string) =>
      request<ReallocationEvent>(`/api/v1/budget/optimize${qs({ platform_id: platformId })}`, {
        method: "POST",
      }),
    recommend: (platformId: string) =>
      request<BudgetRecommendation[]>(`/api/v1/budget/recommend${qs({ platform_id: platformId })}`),
    history: (platformId: string) =>
      request<ReallocationEvent[]>(`/api/v1/budget/history${qs({ platform_id: platformId })}`),
    summary: (platformId: string) =>
      request<BudgetSummary>(`/api/v1/budget/summary${qs({ platform_id: platformId })}`),
  },

  audiences: {
    list: (platformId: string) =>
      request<Audience[]>(`/api/v1/audiences${qs({ platform_id: platformId })}`),
    create: (platformId: string, data: Partial<Audience>) =>
      request<Audience>(`/api/v1/audiences${qs({ platform_id: platformId })}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    evaluate: (platformId: string, audienceId: string) =>
      request<{ size: number }>(`/api/v1/audiences/${audienceId}/evaluate${qs({ platform_id: platformId })}`, {
        method: "POST",
      }),
    exportAudience: (audienceId: string, destination: string) =>
      request<ExportJob>(`/api/v1/audiences/${audienceId}/export`, {
        method: "POST",
        body: JSON.stringify({ destination }),
      }),
  },

  experiments: {
    list: (applicationId: string) =>
      request<Experiment[]>(`/api/v1/experiments${qs({ application_id: applicationId })}`),
    create: (data: Partial<Experiment>) =>
      request<Experiment>("/api/v1/experiments", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    start: (id: string) =>
      request<Experiment>(`/api/v1/experiments/${id}/start`, { method: "POST" }),
    pause: (id: string) =>
      request<Experiment>(`/api/v1/experiments/${id}/pause`, { method: "POST" }),
    results: (id: string) =>
      request<ExperimentResults>(`/api/v1/experiments/${id}/results`),
  },

  referrals: {
    programs: (platformId: string) =>
      request<ReferralProgram[]>(`/api/v1/referrals/programs${qs({ platform_id: platformId })}`),
    createProgram: (platformId: string, data: Partial<ReferralProgram>) =>
      request<ReferralProgram>(`/api/v1/referrals/programs${qs({ platform_id: platformId })}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    stats: (platformId: string, identityId: string) =>
      request<ReferralStats>(`/api/v1/referrals/stats/${identityId}${qs({ platform_id: platformId })}`),
  },

  crossPlatform: {
    identities: (platformId: string) =>
      request<CrossPlatformIdentity[]>(`/api/v1/cross-platform/identities${qs({ platform_id: platformId })}`),
    stats: (platformId: string) =>
      request<CrossPlatformStats>(`/api/v1/cross-platform/stats${qs({ platform_id: platformId })}`),
    config: (platformId: string) =>
      request<CrossPlatformConfig>(`/api/v1/cross-platform/config${qs({ platform_id: platformId })}`),
    setConfig: (platformId: string, data: Partial<CrossPlatformConfig>) =>
      request<CrossPlatformConfig>(`/api/v1/cross-platform/config${qs({ platform_id: platformId })}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
};
