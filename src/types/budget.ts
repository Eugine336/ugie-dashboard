export interface BudgetConfig {
  platform_id: string;
  total_budget: number;
  currency: string;
  period: "daily" | "weekly" | "monthly";
  channels: ChannelBudget[];
  strategy: "equal" | "performance" | "manual";
  auto_optimize: boolean;
  min_channel_budget: number;
  max_channel_share: number;
}

export interface ChannelBudget {
  channel: string;
  allocated: number;
  min_budget: number;
  max_budget: number;
  enabled: boolean;
}

export interface ChannelPerformance {
  channel: string;
  spend: number;
  conversions: number;
  cac: number;
  roi: number;
  retention_rate: number;
  status: "active" | "paused" | "optimizing";
}

export interface ReallocationEvent {
  id: string;
  timestamp: string;
  strategy: string;
  changes: ReallocationChange[];
  reason: string;
}

export interface ReallocationChange {
  channel: string;
  previous_budget: number;
  new_budget: number;
  change_percent: number;
}

export interface BudgetSummary {
  total_budget: number;
  total_spent: number;
  total_remaining: number;
  weighted_roi: number;
  total_conversions: number;
  blended_cac: number;
  channels: ChannelPerformance[];
  recommendations: BudgetRecommendation[];
}

export interface BudgetRecommendation {
  channel: string;
  action: "increase" | "decrease" | "pause" | "resume";
  reason: string;
  current_budget: number;
  suggested_budget: number;
}
