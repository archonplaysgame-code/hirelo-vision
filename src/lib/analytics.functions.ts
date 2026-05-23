import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function getMyWorkspaceId(supabase: any, userId: string) {
  const { data } = await supabase
    .from("workspace_members").select("workspace_id").eq("user_id", userId)
    .limit(1).maybeSingle();
  return data?.workspace_id ?? null;
}

export const getDashboardStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const wsId = await getMyWorkspaceId(supabase, userId);
    if (!wsId) {
      return {
        totalJobs: 0, totalApplicants: 0, interviews: 0, hired: 0,
        recentApplicants: [], recentJobs: [],
      };
    }

    const [{ data: jobs }, { data: cands }] = await Promise.all([
      supabase.from("jobs").select("id, title, status, posted_on, department, location").eq("workspace_id", wsId).order("posted_on", { ascending: false }).limit(5),
      supabase.from("candidates").select("id, name, email, source, stage, applied_date, job_id, jobs(title)").eq("workspace_id", wsId).order("applied_date", { ascending: false }),
    ]);

    const total = cands?.length ?? 0;
    const interviews = (cands ?? []).filter((c) => c.stage === "Interview Scheduled").length;
    const hired = (cands ?? []).filter((c) => c.stage === "Hired").length;

    const { count: jobCount } = await supabase
      .from("jobs").select("id", { count: "exact", head: true }).eq("workspace_id", wsId);

    return {
      totalJobs: jobCount ?? 0,
      totalApplicants: total,
      interviews,
      hired,
      recentApplicants: (cands ?? []).slice(0, 6).map((c) => ({
        id: c.id, name: c.name, email: c.email,
        source: c.source, stage: c.stage, appliedDate: c.applied_date,
        jobTitle: c.jobs?.title ?? "",
      })),
      recentJobs: (jobs ?? []).map((j) => ({
        id: j.id, title: j.title, status: j.status, postedOn: j.posted_on,
        department: j.department, location: j.location,
      })),
    };
  });

export const getAnalytics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const wsId = await getMyWorkspaceId(supabase, userId);
    if (!wsId) return { applicationsOverTime: [], applicationsByPlatform: [], funnel: [] };

    const { data: cands } = await supabase
      .from("candidates")
      .select("source, stage, applied_date")
      .eq("workspace_id", wsId);

    const all = cands ?? [];

    // applications over time (last 6 months)
    const months: { month: string; apps: number }[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = d.toLocaleString("en", { month: "short" });
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const count = all.filter((c) => (c.applied_date ?? "").startsWith(key)).length;
      months.push({ month: label, apps: count });
    }

    const platCounts: Record<string, number> = {};
    for (const c of all) platCounts[c.source] = (platCounts[c.source] ?? 0) + 1;
    const applicationsByPlatform = ["LinkedIn", "Indeed", "Rozee.pk", "Mustakbil", "Direct"]
      .map((p) => ({ platform: p, apps: platCounts[p] ?? 0 }))
      .filter((x) => x.apps > 0);

    const stageCounts: Record<string, number> = {};
    for (const c of all) stageCounts[c.stage] = (stageCounts[c.stage] ?? 0) + 1;
    const funnel = [
      { stage: "Applied", value: all.length },
      { stage: "Reviewed", value: stageCounts["Reviewed"] ?? 0 },
      { stage: "Interview", value: stageCounts["Interview Scheduled"] ?? 0 },
      { stage: "Offer", value: stageCounts["Offer Sent"] ?? 0 },
      { stage: "Hired", value: stageCounts["Hired"] ?? 0 },
    ];

    return { applicationsOverTime: months, applicationsByPlatform, funnel };
  });
