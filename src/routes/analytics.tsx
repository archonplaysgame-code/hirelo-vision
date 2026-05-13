import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { applicationsOverTime, applicationsByPlatform, funnel } from "@/lib/dummy-data";

const PLATFORM_COLORS: Record<string, string> = {
  LinkedIn: "#0077B5",
  Indeed: "#6244BB",
  "Rozee.pk": "#FF6B35",
  Mustakbil: "#00A651",
};

export const Route = createFileRoute("/analytics")({
  component: () => <DashboardLayout><AnalyticsPage /></DashboardLayout>,
});

const W = 520;
const H = 240;
const PAD = { top: 16, right: 16, bottom: 28, left: 36 };
const innerW = W - PAD.left - PAD.right;
const innerH = H - PAD.top - PAD.bottom;

function niceMax(v: number) {
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  return Math.ceil(v / pow) * pow;
}

function LineChartSvg({ data }: { data: { month: string; apps: number }[] }) {
  const max = niceMax(Math.max(...data.map((d) => d.apps)));
  const stepX = innerW / (data.length - 1);
  const points = data.map((d, i) => ({
    x: PAD.left + i * stepX,
    y: PAD.top + innerH - (d.apps / max) * innerH,
    ...d,
  }));
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const area = `${path} L${points[points.length - 1].x},${PAD.top + innerH} L${points[0].x},${PAD.top + innerH} Z`;
  const yTicks = 4;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      {Array.from({ length: yTicks + 1 }).map((_, i) => {
        const y = PAD.top + (innerH / yTicks) * i;
        const val = Math.round(max - (max / yTicks) * i);
        return (
          <g key={i}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="#e5e7eb" strokeDasharray="3 3" />
            <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#64748b">{val}</text>
          </g>
        );
      })}
      {points.map((p, i) => (
        <text key={i} x={p.x} y={H - 8} textAnchor="middle" fontSize="11" fill="#64748b">{p.month}</text>
      ))}
      <path d={area} fill="#FF6B35" fillOpacity={0.1} />
      <path d={path} fill="none" stroke="#FF6B35" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="#FF6B35" stroke="#fff" strokeWidth={2}>
          <title>{`${p.month}: ${p.apps}`}</title>
        </circle>
      ))}
    </svg>
  );
}

function BarChartSvg({ data }: { data: { platform: string; apps: number }[] }) {
  const max = niceMax(Math.max(...data.map((d) => d.apps)));
  const slot = innerW / data.length;
  const barW = Math.min(60, slot * 0.6);
  const yTicks = 4;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      {Array.from({ length: yTicks + 1 }).map((_, i) => {
        const y = PAD.top + (innerH / yTicks) * i;
        const val = Math.round(max - (max / yTicks) * i);
        return (
          <g key={i}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="#e5e7eb" strokeDasharray="3 3" />
            <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#64748b">{val}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const cx = PAD.left + slot * i + slot / 2;
        const h = (d.apps / max) * innerH;
        const y = PAD.top + innerH - h;
        return (
          <g key={d.platform}>
            <rect x={cx - barW / 2} y={y} width={barW} height={h} rx={6} fill={PLATFORM_COLORS[d.platform] ?? "#1E3A5F"}>
              <title>{`${d.platform}: ${d.apps}`}</title>
            </rect>
            <text x={cx} y={H - 8} textAnchor="middle" fontSize="11" fill="#64748b">{d.platform}</text>
          </g>
        );
      })}
    </svg>
  );
}

function AnalyticsPage() {
  const max = Math.max(...funnel.map((f) => f.value));
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Analytics</h1>
        <p className="text-muted-foreground mt-1">Insights into your hiring funnel and channels.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 border-0 shadow-sm min-w-0">
          <h3 className="font-semibold mb-1">Applications over time</h3>
          <p className="text-xs text-muted-foreground mb-4">Last 6 months</p>
          <div className="h-64 w-full">
            <LineChartSvg data={applicationsOverTime} />
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm min-w-0">
          <h3 className="font-semibold mb-1">Applications by platform</h3>
          <p className="text-xs text-muted-foreground mb-4">All-time totals</p>
          <div className="h-64 w-full">
            <BarChartSvg data={applicationsByPlatform} />
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
