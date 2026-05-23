import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const StageEnum = z.enum(["Applied", "Reviewed", "Interview Scheduled", "Offer Sent", "Hired"]);
const SourceEnum = z.enum(["LinkedIn", "Indeed", "Rozee.pk", "Mustakbil", "Direct"]);

async function getMyWorkspaceId(supabase: any, userId: string) {
  const { data } = await supabase
    .from("workspace_members").select("workspace_id").eq("user_id", userId)
    .limit(1).maybeSingle();
  return data?.workspace_id ?? null;
}

export const listCandidates = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const wsId = await getMyWorkspaceId(supabase, userId);
    if (!wsId) return [];
    const { data, error } = await supabase
      .from("candidates")
      .select("id, name, email, phone, source, stage, applied_date, job_id, jobs(title)")
      .eq("workspace_id", wsId)
      .order("applied_date", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      source: c.source,
      stage: c.stage,
      appliedDate: c.applied_date,
      jobId: c.job_id,
      jobTitle: c.jobs?.title ?? "",
    }));
  });

export const getCandidate = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { data: c, error } = await supabase
      .from("candidates")
      .select("id, name, email, phone, source, stage, applied_date, job_id, jobs(title)")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!c) return null;
    const { data: notes } = await supabase
      .from("candidate_notes")
      .select("id, body, created_at, author_id, profiles:author_id(full_name)")
      .eq("candidate_id", data.id)
      .order("created_at", { ascending: false });
    return {
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      source: c.source,
      stage: c.stage,
      appliedDate: c.applied_date,
      jobId: c.job_id,
      jobTitle: c.jobs?.title ?? "",
      notes: (notes ?? []).map((n) => ({
        id: n.id,
        body: n.body,
        createdAt: n.created_at,
        authorName: n.profiles?.full_name ?? "Someone",
      })),
    };
  });

export const createCandidate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({
      job_id: z.string().uuid(),
      name: z.string().min(1).max(200),
      email: z.string().email().max(255).or(z.literal("")).default(""),
      phone: z.string().max(40).default(""),
      source: SourceEnum.default("Direct"),
      stage: StageEnum.default("Applied"),
    }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const wsId = await getMyWorkspaceId(supabase, userId);
    if (!wsId) throw new Error("No workspace");
    const { data: cand, error } = await supabase
      .from("candidates")
      .insert({
        workspace_id: wsId,
        job_id: data.job_id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        source: data.source,
        stage: data.stage,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: cand.id };
  });

export const updateCandidate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({
      id: z.string().uuid(),
      name: z.string().min(1).max(200).optional(),
      email: z.string().email().max(255).or(z.literal("")).optional(),
      phone: z.string().max(40).optional(),
      source: SourceEnum.optional(),
      stage: StageEnum.optional(),
    }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { id, ...rest } = data;
    const { error } = await context.supabase.from("candidates").update(rest).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteCandidate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("candidates").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const addCandidateNote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({
      candidate_id: z.string().uuid(),
      body: z.string().min(1).max(4000),
    }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("candidate_notes")
      .insert({
        candidate_id: data.candidate_id,
        body: data.body,
        author_id: context.userId,
      });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
