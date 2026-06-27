export interface Platform {
  id: string;
  name: string;
  slug: string;
  owner_email: string;
  status: "active" | "suspended" | "pending";
  created_at: string;
  quotas: PlatformQuotas;
  entity_count: number;
  identity_count: number;
  profile_count: number;
}

export interface PlatformQuotas {
  max_entities: number;
  max_events_per_day: number;
  max_identities: number;
  max_audiences: number;
  max_experiments: number;
}

export interface SystemHealth {
  status: string;
  components: Record<string, string>;
  uptime_seconds: number;
  version: string;
}

export interface GlobalStats {
  total_platforms: number;
  total_entities: number;
  total_identities: number;
  total_profiles: number;
  total_events_processed: number;
}
