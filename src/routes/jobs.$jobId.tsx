import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GripVertical } from "lucide-react";
import { jobs, candidates, STAGES, initials, platformColor, type Stage, type Candidate } from "@/lib/dummy-data";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/jobs/$jobId")({
  component: () => <DashboardLayout><JobPipeline /></DashboardLayout>,
  notFoundComponent: () => <DashboardLayout><div className="text-center py-20"><h1 className="text-2xl font-bold">Job not found</h1><Link to="/jobs" className="text-accent hover:underline mt-2 inline-block">Back to jobs</Link></div></DashboardLayout>,
});

const STAGE_BORDERS: Record<Stage, string> = {
  "Applied": "border-t-gray-400",
  "Reviewed": "border-t-blue-500",
  "Interview Scheduled": "border-t-orange-500",
  "Offer Sent": "border-t-purple-500",
  "Hired": "border-t-green-500",
};

function JobPipeline() {
  const { jobId } = Route.useParams();
  const job = jobs.find((j) => j.id === jobId);
  if (!job) throw notFound();
  const navigate = useNavigate();

  const initial = useMemo(() => {
    const jobCandidates = candidates.filter((c, i) => i % 2 === 0 || c.jobId === jobId).slice(0, 13);
    const map: Record<Stage, Candidate[]> = {
      "Applied": [], "Reviewed": [], "Interview Scheduled": [], "Offer Sent": [], "Hired": [],
    };
    jobCandidates.forEach((c, i) => {
      map[STAGES[i % STAGES.length]].push(c);
    });
    return map;
  }, [jobId]);

  const [board, setBoard] = useState(initial);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<Stage | null>(null);

  function handleDrop(e: React.DragEvent, target: Stage) {
    e.preventDefault();
    const id = draggingId ?? e.dataTransfer.getData("text/plain");
    if (!id) return;
    setBoard((prev) => {
      const next: Record<Stage, Candidate[]> = { ...prev };
      let moved: Candidate | undefined;
      for (const s of STAGES) {
        const idx = next[s].findIndex((c) => c.id === id);
        if (idx >= 0) {
          moved = next[s][idx];
          if (s === target) return prev;
          next[s] = [...next[s].slice(0, idx), ...next[s].slice(idx + 1)];
          break;
        }
      }
      if (moved) next[target] = [...next[target], moved];
      return next;
    });
    setDraggingId(null);
    setDragOverStage(null);
  }

  return (
    <div className="space-y-6 max-w-[1400px]">
      <Link to="/jobs" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to jobs
      </Link>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">{job.title}</h1>
          <p className="text-muted-foreground mt-1">{job.department} · {job.location} · {job.type}</p>
        </div>
        <Badge className={job.status === "active" ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}>{job.status}</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {STAGES.map((stage) => {
          const list = board[stage];
          const isOver = dragOverStage === stage;
          return (
            <div
              key={stage}
              className={cn(
                "flex flex-col rounded-lg bg-card border-t-4 transition-colors",
                STAGE_BORDERS[stage],
              )}
              onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; setDragOverStage(stage); }}
              onDragLeave={() => setDragOverStage((s) => (s === stage ? null : s))}
              onDrop={(e) => handleDrop(e, stage)}
            >
              <div className="flex items-center justify-between mb-2 px-3 pt-3">
                <h3 className="text-sm font-semibold text-foreground">{stage}</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{list.length}</span>
              </div>
              <div className={cn(
                "rounded-b-lg p-2 flex-1 space-y-2 min-h-[240px] m-1 border-2 border-dashed transition-colors",
                isOver ? "border-blue-500 bg-blue-50/50" : "border-transparent bg-muted/40",
              )}>
                {list.map((c) => {
                  const isDragging = draggingId === c.id;
                  return (
                    <Card
                      key={c.id}
                      draggable
                      onDragStart={() => setDraggingId(c.id)}
                      onDragEnd={() => { setDraggingId(null); setDragOverStage(null); }}
                      className={cn(
                        "group p-3 border-0 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing",
                        isDragging && "shadow-xl rotate-1 opacity-80",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{initials(c.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{c.name}</p>
                          <p className="text-[10px] text-muted-foreground">{c.appliedDate}</p>
                        </div>
                      </div>
                      <span className={`mt-2 inline-block text-[10px] px-1.5 py-0.5 rounded ${platformColor(c.source)}`}>{c.source}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full mt-2 h-7 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => { e.stopPropagation(); navigate({ to: "/candidates/$candidateId", params: { candidateId: c.id } }); }}
                      >
                        View Profile
                      </Button>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
