import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { jobs, candidates, STAGES, initials, platformColor } from "@/lib/dummy-data";

export const Route = createFileRoute("/jobs/$jobId")({
  component: () => <DashboardLayout><JobPipeline /></DashboardLayout>,
  notFoundComponent: () => <DashboardLayout><div className="text-center py-20"><h1 className="text-2xl font-bold">Job not found</h1><Link to="/jobs" className="text-accent hover:underline mt-2 inline-block">Back to jobs</Link></div></DashboardLayout>,
});

function JobPipeline() {
  const { jobId } = Route.useParams();
  const job = jobs.find((j) => j.id === jobId);
  if (!job) throw notFound();

  // distribute candidates across stages for this job
  const jobCandidates = candidates.filter((c, i) => i % 2 === 0 || c.jobId === jobId).slice(0, 13);

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
        {STAGES.map((stage, idx) => {
          const list = jobCandidates.filter((_, i) => i % STAGES.length === idx).slice(0, 3);
          return (
            <div key={stage} className="flex flex-col">
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-sm font-semibold text-foreground">{stage}</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{list.length}</span>
              </div>
              <div className="bg-muted/40 rounded-lg p-2 flex-1 space-y-2 min-h-[200px]">
                {list.map((c) => (
                  <Link key={c.id} to="/candidates/$candidateId" params={{ candidateId: c.id }}>
                    <Card className="p-3 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{initials(c.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{c.name}</p>
                          <p className="text-[10px] text-muted-foreground">{c.appliedDate}</p>
                        </div>
                      </div>
                      <span className={`mt-2 inline-block text-[10px] px-1.5 py-0.5 rounded ${platformColor(c.source)}`}>{c.source}</span>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
