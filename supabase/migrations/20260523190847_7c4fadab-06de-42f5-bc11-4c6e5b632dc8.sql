
-- Set search_path on remaining functions and revoke anon execute on internal helpers
alter function public.handle_new_user() set search_path = public;
alter function public.set_updated_at() set search_path = public;

revoke execute on function public.is_workspace_member(uuid, uuid) from anon, public;
revoke execute on function public.current_workspace_id() from anon, public;
revoke execute on function public.has_role(uuid, public.app_role) from anon, public;
revoke execute on function public.candidate_in_my_workspace(uuid) from anon, public;
grant execute on function public.is_workspace_member(uuid, uuid) to authenticated;
grant execute on function public.current_workspace_id() to authenticated;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
grant execute on function public.candidate_in_my_workspace(uuid) to authenticated;
