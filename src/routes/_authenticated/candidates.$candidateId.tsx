import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Mail, Phone, Download, Calendar } from "lucide-react";
import { candidates, jobs, STAGES, initials, platformColor } from "@/lib/dummy-data";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/candidates/$candidateId")({
  component: () => <DashboardLayout><CandidateProfile /></DashboardLayout>,
  notFoundComponent: () => <DashboardLayout><div className="text-center py-20"><h1 className="text-2xl font-bold">Candidate not found</h1></div></DashboardLayout>,
});

function CandidateProfile() {
  const { candidateId } = Route.useParams();
  const c = candidates.find((x) => x.id === candidateId);
  if (!c) throw notFound();
  const job = jobs.find((j) => j.id === c.jobId);
  const [stage, setStage] = useState(c.stage);
  const [notes, setNotes] = useState("");

  const timeline = [
    { date: c.appliedDate, label: `Applied via ${c.source}` },
    { date: "2026-05-08", label: "Resume reviewed by Ayesha" },
    { date: "2026-05-10", label: `Moved to ${stage}` },
  ];

  return (
    <div className="max-w-6xl space-y-6">
      <Link to="/candidates" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to candidates
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 border-0 shadow-sm lg:col-span-1 space-y-5">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">{initials(c.name)}</AvatarFallback>
            </Avatar>
            <h2 className="mt-3 text-xl font-bold">{c.name}</h2>
            <p className="text-sm text-muted-foreground">Applied for {job?.title}</p>
            <span className={`mt-2 text-xs px-2 py-0.5 rounded ${platformColor(c.source)}`}>{c.source}</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /> {c.email}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> {c.phone}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" /> Applied {c.appliedDate}</div>
          </div>
          <Button className="w-full" variant="outline" onClick={() => toast.success("Resume downloaded")}>
            <Download className="h-4 w-4 mr-1" /> Download Resume
          </Button>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-0 shadow-sm">
            <h3 className="font-semibold mb-3">Pipeline Stage</h3>
            <Select value={stage} onValueChange={(v) => { setStage(v as typeof stage); toast.success(`Moved to ${v}`); }}>
              <SelectTrigger className="w-full sm:w-[260px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </Card>

          <Card className="p-6 border-0 shadow-sm">
            <h3 className="font-semibold mb-3">Notes</h3>
            <Textarea rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add an internal note about this candidate…" />
            <div className="flex justify-end mt-3">
              <Button onClick={() => toast.success("Note saved")} className="bg-primary hover:bg-primary/90">Save Note</Button>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-sm">
            <h3 className="font-semibold mb-4">Activity Timeline</h3>
            <ol className="relative border-l border-border ml-2 space-y-5">
              {timeline.map((t, i) => (
                <li key={i} className="ml-5">
                  <span className="absolute -left-1.5 h-3 w-3 rounded-full bg-accent" />
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}
