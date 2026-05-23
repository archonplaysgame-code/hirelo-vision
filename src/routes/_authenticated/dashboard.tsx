import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, Users, CalendarCheck, Trophy, TrendingUp } from "lucide-react";
import { jobs, recentApplicants, stats, initials, platformColor } from "@/lib/dummy-data";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: () => <DashboardLayout><DashboardPage /></DashboardLayout>,
});

const cards = [
  { label: "Total Jobs Posted", value: stats.totalJobs, icon: Briefcase, trend: "+3 this week", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  { label: "Total Applicants", value: stats.totalApplicants, icon: Users, trend: "+48 this week", iconBg: "bg-orange-100", iconColor: "text-orange-600" },
  { label: "Interviews Scheduled", value: stats.interviews, icon: CalendarCheck, trend: "+5 this week", iconBg: "bg-purple-100", iconColor: "text-purple-600" },
  { label: "Positions Filled", value: stats.filled, icon: Trophy, trend: "+2 this month", iconBg: "bg-green-100", iconColor: "text-green-600" },
];

function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Welcome back, Ayesha 👋</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your hiring today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="p-5 border-0 shadow-sm">
            <div className="flex items-start justify-between">
              <div className={`h-10 w-10 rounded-lg ${c.iconBg} ${c.iconColor} flex items-center justify-center`}>
                <c.icon className="h-5 w-5" />
              </div>
              <span className="text-xs text-success flex items-center gap-1"><TrendingUp className="h-3 w-3" />{c.trend}</span>
            </div>
            <p className="text-3xl font-bold mt-4">{c.value}</p>
            <p className="text-sm text-muted-foreground">{c.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-6 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Jobs</h2>
            <Link to="/jobs" className="text-sm text-accent hover:underline">View all</Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.slice(0, 5).map((j) => (
                <TableRow key={j.id} className="cursor-pointer">
                  <TableCell className="font-medium">
                    <Link to="/jobs/$jobId" params={{ jobId: j.id }} className="hover:text-accent">{j.title}</Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{j.department}</TableCell>
                  <TableCell className="text-muted-foreground">{j.postedOn}</TableCell>
                  <TableCell>{j.applicants}</TableCell>
                  <TableCell>
                    <Badge variant={j.status === "active" ? "default" : "secondary"} className={j.status === "active" ? "bg-success text-success-foreground" : ""}>
                      {j.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="p-6 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Applicants</h2>
            <Link to="/candidates" className="text-sm text-accent hover:underline">View all</Link>
          </div>
          <div className="space-y-4">
            {recentApplicants.map((c) => (
              <Link key={c.id} to="/candidates/$candidateId" params={{ candidateId: c.id }} className="flex items-center gap-3 group">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{initials(c.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-accent">{c.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{c.appliedDate}</p>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${platformColor(c.source)}`}>{c.source}</span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
