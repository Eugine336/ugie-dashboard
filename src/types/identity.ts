export interface CrossPlatformIdentity {
  link_id: string;
  touchpoint_type: string;
  touchpoint_hash: string;
  platforms: string[];
  identities: CrossPlatformIdentityEntry[];
  created_at: string;
}

export interface CrossPlatformIdentityEntry {
  platform_id: string;
  identity_id: string;
}

export interface CrossPlatformStats {
  total_links: number;
  linked_platforms: number;
  identities_linked: number;
  touchpoint_types: Record<string, number>;
}

export interface CrossPlatformConfig {
  platform_id: string;
  allow_cross_platform_linking: boolean;
  linkable_touchpoint_types: string[];
  sharing_permissions: string[];
  partner_whitelist: string[];
}
