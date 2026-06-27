export interface FunnelMetrics {
  registered: number;
  activated: number;
  converted: number;
  retained: number;
  activation_rate: number;
  conversion_rate: number;
  retention_rate: number;
}

export interface EngagementBreakdown {
  cold: number;
  warming: number;
  active: number;
  power: number;
  total: number;
}

export interface RFMBreakdown {
  champions: number;
  loyal: number;
  potential: number;
  at_risk: number;
  hibernating: number;
  lost: number;
  new_customers: number;
  total: number;
}

export interface ChurnBreakdown {
  low: number;
  medium: number;
  high: number;
  critical: number;
  total: number;
  average_risk: number;
}

export interface PredictionSummary {
  churn: { average: number; high_risk_count: number };
  conversion: { average: number; high_potential_count: number };
  ltv: { average: number; high_value_count: number };
  upsell: { average: number; high_potential_count: number };
  referral: { average: number; high_potential_count: number };
  fraud: { average: number; high_risk_count: number };
}

export interface ExperimentSummary {
  total: number;
  running: number;
  completed: number;
  draft: number;
  paused: number;
}

export interface ReferralSummary {
  total_codes: number;
  total_referrals: number;
  total_conversions: number;
  conversion_rate: number;
}

export interface AudienceSummary {
  total: number;
  active: number;
  archived: number;
}

export interface IdentityStats {
  total: number;
  merged: number;
  active: number;
}

export interface CrossPlatformSummary {
  total_links: number;
  linked_platforms: number;
}

export interface GrowthMetrics {
  new_users_24h: number;
  new_users_7d: number;
  new_users_30d: number;
  total_events_24h: number;
  total_events_7d: number;
  active_users_estimate: number;
}

export interface PlatformDashboard {
  platform_id: string;
  funnel: FunnelMetrics;
  engagement: EngagementBreakdown;
  rfm: RFMBreakdown;
  churn: ChurnBreakdown;
  predictions: PredictionSummary;
  experiments: ExperimentSummary;
  referrals: ReferralSummary;
  audiences: AudienceSummary;
  identity_stats: IdentityStats;
  cross_platform: CrossPlatformSummary;
  growth: GrowthMetrics;
}
