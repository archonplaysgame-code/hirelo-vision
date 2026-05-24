import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MapPin, Users, Search } from "lucide-react";
import { jobs } from "@/lib/dummy-data";
import { useState } from "react";

export const Route = createFileRoute("/jobs/")({
  component: () => <DashboardLayout><JobsPage /></DashboardLayout>,
});

function JobsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const filtered = jobs.filter((j) =>
    j.title.toLowerCase().includes(q.toLowerCase()) &&
    (status === "all" || j.status === status),
  );

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Jobs</h1>
          <p className="text-muted-foreground mt-1">Manage and broadcast your open positions.</p>
        </div>
        <Link to="/jobs/new">
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="h-4 w-4 mr-1" /> Post a New Job
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jobs…" className="pl-9" />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((j) => (
          <Link key={j.id} to="/jobs/$jobId" params={{ jobId: j.id }}>
            <Card className="p-5 border-0 shadow-sm hover:shadow-md transition-shadow h-full">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{j.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{j.department}</p>
                </div>
                <Badge className={j.status === "active" ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}>
                  {j.status}
                </Badge>
              </div>
              <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{j.location} · {j.type}</div>
                <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{j.applicants} applicants</div>
              </div>
              <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
                <span>Posted {j.postedOn}</span>
                <span className="font-medium text-foreground">{j.salary}</span>
              </div>
              <div className="mt-3 text-sm font-medium text-accent hover:underline">View Pipeline →</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
