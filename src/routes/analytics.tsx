import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { applicationsOverTime, applicationsByPlatform, funnel } from "@/lib/dummy-data";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export const Route = createFileRoute("/analytics")({
  component: () => <DashboardLayout><AnalyticsPage /></DashboardLayout>,
});

function AnalyticsPage() {
  const max = Math.max(...funnel.map((f) => f.value));
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Analytics</h1>
        <p className="text-muted-foreground mt-1">Insights into your hiring funnel and channels.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 border-0 shadow-sm">
          <h3 className="font-semibold mb-1">Applications over time</h3>
          <p className="text-xs text-muted-foreground mb-4">Last 6 months</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={applicationsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="apps" stroke="var(--color-accent)" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm">
          <h3 className="font-semibold mb-1">Applications by platform</h3>
          <p className="text-xs text-muted-foreground mb-4">All-time totals</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicationsByPlatform}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="platform" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="apps" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm lg:col-span-2">
          <h3 className="font-semibold mb-1">Hiring funnel</h3>
          <p className="text-xs text-muted-foreground mb-6">Conversion across pipeline stages</p>
          <div className="space-y-3">
            {funnel.map((f, i) => {
              const pct = (f.value / max) * 100;
              const conv = i === 0 ? 100 : Math.round((f.value / funnel[0].value) * 100);
              return (
                <div key={f.stage}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium">{f.stage}</span>
                    <span className="text-muted-foreground">{f.value} · {conv}%</span>
                  </div>
                  <div className="h-8 bg-muted rounded-md overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
