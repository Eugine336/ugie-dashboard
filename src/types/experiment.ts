export interface Experiment {
  id: string;
  name: string;
  description: string;
  application_id: string;
  status: "draft" | "running" | "paused" | "completed";
  variants: ExperimentVariant[];
  traffic_percentage: number;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}

export interface ExperimentVariant {
  id: string;
  name: string;
  weight: number;
  is_control: boolean;
  assignments: number;
  conversions: number;
  conversion_rate: number;
}

export interface ExperimentResults {
  experiment_id: string;
  status: string;
  variants: ExperimentVariant[];
  winner: string | null;
  confidence: number;
  total_assignments: number;
  total_conversions: number;
}
