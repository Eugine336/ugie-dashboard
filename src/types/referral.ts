export interface ReferralProgram {
  id: string;
  platform_id: string;
  name: string;
  reward_type: "credit" | "discount" | "free_month" | "custom";
  reward_amount: number;
  reward_currency: string;
  status: "active" | "paused" | "ended";
  total_codes: number;
  total_referrals: number;
  total_conversions: number;
  conversion_rate: number;
  created_at: string;
}

export interface ReferralCode {
  code: string;
  referrer_id: string;
  uses: number;
  conversions: number;
  created_at: string;
}

export interface ReferralStats {
  identity_id: string;
  codes_generated: number;
  total_referrals: number;
  total_conversions: number;
  total_rewards_earned: number;
}
