"use client";

import { PageHeader } from "@/components/layout/page-header";
import { ExperimentCard } from "@/components/dashboard/experiment-card";
import {
  useExperiments,
  useStartExperiment,
  usePauseExperiment,
} from "@/hooks/use-experiments";
import { usePlatformContext } from "@/providers/platform-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { FlaskConical, Inbox } from "lucide-react";

export default function ExperimentsPage() {
  const { platformId } = usePlatformContext();
  const { data: experiments, isLoading } = useExperiments();
  const startMutation = useStartExperiment();
  const pauseMutation = usePauseExperiment();

  if (!platformId) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <FlaskConical className="mb-4 h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Select a Platform</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a platform to manage experiments.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <>
        <PageHeader title="Experiments" description="A/B testing" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Experiments"
        description="A/B testing and variant optimization"
      />

      {!experiments || experiments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Inbox className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No Experiments</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Create your first experiment to start A/B testing.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {experiments.map((experiment) => (
            <ExperimentCard
              key={experiment.id}
              experiment={experiment}
              onStart={() => startMutation.mutate(experiment.id)}
              onPause={() => pauseMutation.mutate(experiment.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}
