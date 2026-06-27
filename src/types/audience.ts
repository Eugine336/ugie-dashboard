export interface Audience {
  id: string;
  name: string;
  description: string;
  platform_id: string;
  rules: AudienceRule[];
  status: "active" | "archived" | "draft";
  estimated_size: number;
  created_at: string;
  updated_at: string;
}

export interface AudienceRule {
  field: string;
  operator: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "in" | "not_in" | "contains" | "exists";
  value: string | number | boolean | string[];
}

export interface ExportJob {
  id: string;
  audience_id: string;
  destination: string;
  status: "pending" | "running" | "completed" | "failed";
  records_exported: number;
  started_at: string;
  completed_at: string | null;
}
