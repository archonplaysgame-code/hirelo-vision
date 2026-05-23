import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const JobInput = z.object({
  title: z.string().min(1).max(200),
  department: z.string().max(120).default(""),
  location: z.string().max(120).default(""),
  type: z.enum(["Full-time", "Part-time", "Contract"]).default("Full-time"),
  salary: z.string().max(120).default(""),
});

async function getMyWorkspaceId(supabase: any, userId: string) {
  const { data } = await supabase
    .from("workspace_members")
    .select("workspace_id")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();
  return data?.workspace_id ?? null;
}

export const listJobs = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const wsId = await getMyWorkspaceId(supabase, userId);
    if (!wsId) return [];
    const { data: jobs, error } = await supabase
      .from("jobs")
      .select("id, title, department, location, type, status, salary, posted_on")
      .eq("workspace_id", wsId)
      .order("posted_on", { ascending: false });
    if (error) throw new Error(error.message);

    // counts per job
    const ids = jobs.map((j) => j.id);
    const counts: Record<string, number> = {};
    if (ids.length) {
      const { data: cands } = await supabase
        .from("candidates")
        .select("job_id")
        .in("job_id", ids);
      for (const c of cands ?? []) counts[c.job_id] = (counts[c.job_id] ?? 0) + 1;
    }

    return jobs.map((j) => ({
      id: j.id,
      title: j.title,
      department: j.department,
      location: j.location,
      type: j.type,
      status: j.status,
      salary: j.salary,
      postedOn: j.posted_on,
      applicants: counts[j.id] ?? 0,
    }));
  });

export const getJob = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { data: job, error } = await supabase
      .from("jobs")
      .select("id, title, department, location, type, status, salary, posted_on")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!job) return null;

    const { data: cands } = await supabase
      .from("candidates")
      .select("id, name, email, phone, source, stage, applied_date")
      .eq("job_id", data.id)
      .order("applied_date", { ascending: false });

    return {
      id: job.id,
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      status: job.status,
      salary: job.salary,
      postedOn: job.posted_on,
      applicants: cands?.length ?? 0,
      candidates: (cands ?? []).map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        source: c.source,
        stage: c.stage,
        appliedDate: c.applied_date,
        jobId: data.id,
      })),
    };
  });

export const createJob = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => JobInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const wsId = await getMyWorkspaceId(supabase, userId);
    if (!wsId) throw new Error("No workspace");
    const { data: job, error } = await supabase
      .from("jobs")
      .insert({
        workspace_id: wsId,
        created_by: userId,
        title: data.title,
        department: data.department,
        location: data.location,
        type: data.type,
        salary: data.salary,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: job.id };
  });

export const updateJob = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ id: z.string().uuid() }).merge(JobInput.partial()).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { id, ...rest } = data;
    const { error } = await context.supabase.from("jobs").update(rest).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const setJobStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ id: z.string().uuid(), status: z.enum(["active", "closed"]) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("jobs").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteJob = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("jobs").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
