import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { candidates, initials, platformColor, jobs, PLATFORMS } from "@/lib/dummy-data";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/candidates/")({
  component: () => <DashboardLayout><CandidatesPage /></DashboardLayout>,
});

const FILTERS = ["All", ...PLATFORMS] as const;

function CandidatesPage() {
  const [q, setQ] = useState("");
  const [source, setSource] = useState<(typeof FILTERS)[number]>("All");
  const filtered = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(q.toLowerCase()) &&
      (source === "All" || c.source === source),
  );

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Candidates</h1>
        <p className="text-muted-foreground mt-1">All applicants across every open role.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-md flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search candidates…" className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setSource(f)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                source === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:bg-muted",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <Card className="border-0 shadow-sm divide-y">
        {filtered.map((c) => {
          const job = jobs.find((j) => j.id === c.jobId);
          return (
            <Link key={c.id} to="/candidates/$candidateId" params={{ candidateId: c.id }} className="flex items-center gap-4 p-4 hover:bg-muted/40 transition-colors">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">{initials(c.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground truncate">{c.email} · Applied for {job?.title}</p>
              </div>
              <span className="text-xs text-muted-foreground hidden sm:inline">{c.stage}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${platformColor(c.source)}`}>{c.source}</span>
            </Link>
          );
        })}
      </Card>
    </div>
  );
}
