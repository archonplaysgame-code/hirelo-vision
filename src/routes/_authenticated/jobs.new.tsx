import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { PLATFORMS } from "@/lib/dummy-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/jobs/new")({
  component: () => <DashboardLayout><NewJobPage /></DashboardLayout>,
});

function NewJobPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl space-y-6">
      <Link to="/jobs" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to jobs
      </Link>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Post a New Job</h1>
        <p className="text-muted-foreground mt-1">Fill in the details. Hirelo will broadcast to your selected platforms.</p>
      </div>

      <Card className="p-6 md:p-8 border-0 shadow-sm space-y-6">
        <form
          className="space-y-6"
          onSubmit={(e) => { e.preventDefault(); toast.success("Job posted! Broadcasting to selected platforms."); navigate({ to: "/jobs" }); }}
        >
          <div className="grid gap-2">
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" placeholder="e.g. Senior Frontend Engineer" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="dept">Department</Label>
              <Input id="dept" placeholder="Engineering" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="loc">Location</Label>
              <Input id="loc" placeholder="Karachi, PK or Remote" required />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Job Type</Label>
              <Select defaultValue="full-time">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="salary">Salary Range</Label>
              <Input id="salary" placeholder="PKR 400k – 600k" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="desc">Job Description</Label>
            <Textarea id="desc" rows={8} placeholder="Describe the role, responsibilities, and requirements…" />
            <p className="text-xs text-muted-foreground">Markdown supported.</p>
          </div>
          <div className="grid gap-3">
            <Label>Platforms to post on</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {PLATFORMS.map((p) => (
                <label key={p} className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/40 transition-colors">
                  <Checkbox defaultChecked id={p} />
                  <span className="text-sm font-medium">{p}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Link to="/jobs"><Button type="button" variant="outline">Cancel</Button></Link>
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">Post Job</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
