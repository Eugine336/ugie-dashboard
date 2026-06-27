"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { usePlatformContext } from "@/providers/platform-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function Header() {
  const { platformId, setPlatformId } = usePlatformContext();

  const { data: platforms } = useQuery({
    queryKey: ["platforms"],
    queryFn: api.admin.platforms,
    retry: false,
  });

  const { data: health } = useQuery({
    queryKey: ["health"],
    queryFn: api.admin.health,
    refetchInterval: 30000,
    retry: false,
  });

  const healthColor =
    health?.status === "healthy"
      ? "bg-success"
      : health?.status === "degraded"
      ? "bg-warning"
      : "bg-danger";

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-6">
      <div className="flex items-center gap-4">
        {platforms && platforms.length > 0 && (
          <Select value={platformId} onValueChange={setPlatformId}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              {platforms.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className={cn("h-2 w-2 rounded-full", healthColor)} />
          <span>{health?.status || "connecting..."}</span>
        </div>
      </div>
    </header>
  );
}
