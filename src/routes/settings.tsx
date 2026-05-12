import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { teamMembers, PLATFORMS, initials, platformColor } from "@/lib/dummy-data";
import { Plus, Upload } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  component: () => <DashboardLayout><SettingsPage /></DashboardLayout>,
});

function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your company, team, and integrations.</p>
      </div>

      <Card className="p-6 border-0 shadow-sm">
        <h2 className="text-lg font-semibold mb-1">Company Profile</h2>
        <p className="text-sm text-muted-foreground mb-5">This information appears on your public job pages.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2"><Label>Company name</Label><Input defaultValue="Acme Corp" /></div>
          <div className="grid gap-2">
            <Label>Industry</Label>
            <Select defaultValue="tech">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="health">Healthcare</SelectItem>
                <SelectItem value="edu">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Company size</Label>
            <Select defaultValue="11-50">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1–10</SelectItem>
                <SelectItem value="11-50">11–50</SelectItem>
                <SelectItem value="51-200">51–200</SelectItem>
                <SelectItem value="200+">200+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Logo</Label>
            <Button variant="outline" type="button"><Upload className="h-4 w-4 mr-1" /> Upload</Button>
          </div>
        </div>
        <div className="flex justify-end mt-5"><Button onClick={() => toast.success("Profile updated")} className="bg-primary hover:bg-primary/90">Save changes</Button></div>
      </Card>

      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold">Team members</h2>
            <p className="text-sm text-muted-foreground">Invite teammates to collaborate on hiring.</p>
          </div>
          <Button onClick={() => toast.success("Invite sent")} className="bg-accent hover:bg-accent/90 text-accent-foreground"><Plus className="h-4 w-4 mr-1" /> Invite</Button>
        </div>
        <div className="divide-y">
          {teamMembers.map((m) => (
            <div key={m.email} className="flex items-center gap-3 py-3">
              <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{initials(m.name)}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.email}</p>
              </div>
              <span className="text-xs text-muted-foreground">{m.role}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 border-0 shadow-sm">
        <h2 className="text-lg font-semibold mb-1">Connected platforms</h2>
        <p className="text-sm text-muted-foreground mb-5">Connect job boards to syndicate your roles automatically.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {PLATFORMS.map((p) => (
            <div key={p} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <span className={`h-9 w-9 rounded-md flex items-center justify-center text-xs font-bold ${platformColor(p)}`}>
                  {p.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <p className="text-sm font-semibold">{p}</p>
                  <p className="text-xs text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => toast.success(`${p} connected`)}>Connect</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
