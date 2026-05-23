import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getMyWorkspace = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: memberships, error } = await supabase
      .from("workspace_members")
      .select("workspace_id, role, workspaces(id, name, created_at)")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .limit(1);
    if (error) throw new Error(error.message);
    const row = memberships?.[0];
    if (!row || !row.workspaces) return null;
    return {
      id: row.workspaces.id,
      name: row.workspaces.name,
      role: row.role,
    };
  });

export const createWorkspace = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ name: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: existing } = await supabase
      .from("workspace_members")
      .select("workspace_id")
      .eq("user_id", userId)
      .limit(1);
    if (existing && existing.length > 0) {
      return { id: existing[0].workspace_id, existed: true };
    }
    const { data: ws, error } = await supabase
      .from("workspaces")
      .insert({ name: data.name, created_by: userId })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    const { error: memErr } = await supabase
      .from("workspace_members")
      .insert({ workspace_id: ws.id, user_id: userId, role: "admin" });
    if (memErr) throw new Error(memErr.message);
    return { id: ws.id, existed: false };
  });

export const getTeamMembers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: mine } = await supabase
      .from("workspace_members")
      .select("workspace_id")
      .eq("user_id", userId)
      .limit(1)
      .maybeSingle();
    if (!mine) return { members: [], invites: [] };
    const [{ data: members }, { data: invites }] = await Promise.all([
      supabase
        .from("workspace_members")
        .select("user_id, role, created_at, profiles(full_name, avatar_url)")
        .eq("workspace_id", mine.workspace_id),
      supabase
        .from("invites")
        .select("id, email, role, created_at, expires_at, token")
        .eq("workspace_id", mine.workspace_id)
        .order("created_at", { ascending: false }),
    ]);
    return {
      members: (members ?? []).map((m) => ({
        userId: m.user_id,
        role: m.role,
        name: m.profiles?.full_name ?? "Unnamed user",
        avatarUrl: m.profiles?.avatar_url ?? null,
      })),
      invites: invites ?? [],
    };
  });

export const createInvite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({
      email: z.string().email().max(255),
      role: z.enum(["admin", "recruiter", "hiring_manager"]),
    }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: mine } = await supabase
      .from("workspace_members")
      .select("workspace_id")
      .eq("user_id", userId)
      .limit(1)
      .maybeSingle();
    if (!mine) throw new Error("No workspace");
    const { data: inv, error } = await supabase
      .from("invites")
      .insert({
        workspace_id: mine.workspace_id,
        email: data.email,
        role: data.role,
        invited_by: userId,
      })
      .select("id, token")
      .single();
    if (error) throw new Error(error.message);
    return inv;
  });

export const deleteInvite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("invites").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ full_name: z.string().min(1).max(120) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("profiles")
      .update({ full_name: data.full_name })
      .eq("id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("profiles")
      .select("id, full_name, avatar_url")
      .eq("id", context.userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  });
