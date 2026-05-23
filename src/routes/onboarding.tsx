import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Building2, Users, Plug, Plus, X, Check, Linkedin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { createWorkspace } from "@/lib/workspace.functions";

export const Route = createFileRoute("/onboarding")({
  beforeLoad: async ({ location }) => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/login", search: { redirect: location.pathname } });
  },
  component: Onboarding,
  head: () => ({
    meta: [
      { title: "Welcome to Hirelo — Get Set Up" },
      { name: "description", content: "Set up your Hirelo account in 3 quick steps." },
    ],
  }),
});

const STEPS = [
  { n: 1, title: "Company setup", desc: "Tell us about your company", icon: Building2 },
  { n: 2, title: "Invite your team", desc: "Bring your hiring team aboard", icon: Users },
  { n: 3, title: "Connect a job board", desc: "Start posting jobs everywhere", icon: Plug },
];

const PLATFORMS = [
  { id: "linkedin", name: "LinkedIn", desc: "World's largest professional network", color: "bg-[#0A66C2]" },
  { id: "indeed", name: "Indeed", desc: "Largest job site globally", color: "bg-[#2164F3]" },
  { id: "rozee", name: "Rozee.pk", desc: "Pakistan's leading job portal", color: "bg-emerald-600" },
  { id: "mustakbil", name: "Mustakbil", desc: "Top jobs in MENA & South Asia", color: "bg-amber-600" },
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Step 1
  const [company, setCompany] = useState({ name: "", website: "", industry: "", size: "" });
  // Step 2
  const [invites, setInvites] = useState<{ email: string; role: string }[]>([
    { email: "", role: "Recruiter" },
  ]);
  // Step 3
  const [connected, setConnected] = useState<string | null>(null);

  const progress = (step / STEPS.length) * 100;

  const canContinue =
    step === 1 ? company.name.trim().length > 0 :
    step === 2 ? true :
    connected !== null;

  const createWs = useServerFn(createWorkspace);
  const [saving, setSaving] = useState(false);

  const handleNext = async () => {
    if (step < STEPS.length) { setStep((s) => s + 1); return; }
    setSaving(true);
    try {
      await createWs({ data: { name: company.name.trim() || "My workspace" } });
      toast.success("Welcome to Hirelo! Your workspace is ready.");
      navigate({ to: "/dashboard" });
    } catch (e: any) {
      toast.error(e?.message ?? "Could not create workspace");
    } finally {
      setSaving(false);
    }
  };

  const handleSkip = async () => {
    if (step < STEPS.length) { setStep((s) => s + 1); return; }
    setSaving(true);
    try {
      await createWs({ data: { name: company.name.trim() || "My workspace" } });
    } catch {}
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">H</span>
            </div>
            <span className="font-bold text-lg tracking-tight">Hirelo</span>
          </Link>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
            Skip setup
          </Link>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b bg-background">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-3 text-sm">
            <span className="font-medium text-foreground">
              Step {step} of {STEPS.length}
            </span>
            <span className="text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="mt-6 grid grid-cols-3 gap-4">
            {STEPS.map((s) => {
              const isDone = s.n < step;
              const isActive = s.n === step;
              return (
                <div key={s.n} className="flex items-start gap-3">
                  <div
                    className={`h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      isDone
                        ? "bg-accent text-accent-foreground"
                        : isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isDone ? <Check className="h-4 w-4" /> : s.n}
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`text-sm font-semibold truncate ${
                        isActive || isDone ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {s.title}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{s.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Card className="p-8 md:p-10">
          {step === 1 && (
            <div>
              <h1 className="text-2xl font-bold text-primary tracking-tight">Tell us about your company</h1>
              <p className="mt-2 text-muted-foreground">This helps us personalize your hiring workspace.</p>
              <div className="mt-8 grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="cname">Company name</Label>
                  <Input
                    id="cname"
                    placeholder="Acme Inc."
                    value={company.name}
                    onChange={(e) => setCompany({ ...company, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cweb">Website</Label>
                  <Input
                    id="cweb"
                    placeholder="https://acme.com"
                    value={company.website}
                    onChange={(e) => setCompany({ ...company, website: e.target.value })}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="grid gap-2">
                    <Label>Industry</Label>
                    <Select value={company.industry} onValueChange={(v) => setCompany({ ...company, industry: v })}>
                      <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Company size</Label>
                    <Select value={company.size} onValueChange={(v) => setCompany({ ...company, size: v })}>
                      <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1–10</SelectItem>
                        <SelectItem value="11-50">11–50</SelectItem>
                        <SelectItem value="51-200">51–200</SelectItem>
                        <SelectItem value="201-1000">201–1,000</SelectItem>
                        <SelectItem value="1000+">1,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="text-2xl font-bold text-primary tracking-tight">Invite your team</h1>
              <p className="mt-2 text-muted-foreground">Bring recruiters and hiring managers into your workspace.</p>
              <div className="mt-8 space-y-3">
                {invites.map((inv, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      placeholder="teammate@company.com"
                      type="email"
                      value={inv.email}
                      onChange={(e) => {
                        const next = [...invites];
                        next[i] = { ...next[i], email: e.target.value };
                        setInvites(next);
                      }}
                      className="flex-1"
                    />
                    <Select
                      value={inv.role}
                      onValueChange={(v) => {
                        const next = [...invites];
                        next[i] = { ...next[i], role: v };
                        setInvites(next);
                      }}
                    >
                      <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Recruiter">Recruiter</SelectItem>
                        <SelectItem value="Hiring Manager">Hiring Manager</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setInvites(invites.filter((_, idx) => idx !== i))}
                      disabled={invites.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setInvites([...invites, { email: "", role: "Recruiter" }])}
                >
                  <Plus className="h-4 w-4" /> Add another
                </Button>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                You can always invite more people later from Settings.
              </p>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="text-2xl font-bold text-primary tracking-tight">Connect your first job board</h1>
              <p className="mt-2 text-muted-foreground">Pick where you want to post jobs first — you can add more later.</p>
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {PLATFORMS.map((p) => {
                  const isConnected = connected === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setConnected(p.id);
                        toast.success(`${p.name} connected`);
                      }}
                      className={`text-left p-5 rounded-lg border-2 transition-all ${
                        isConnected
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-primary/40 bg-background"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className={`h-10 w-10 rounded-md ${p.color} flex items-center justify-center text-white`}>
                          <Linkedin className="h-5 w-5" />
                        </div>
                        {isConnected && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
                            <Check className="h-3.5 w-3.5" /> Connected
                          </span>
                        )}
                      </div>
                      <div className="mt-4 font-semibold text-foreground">{p.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{p.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer actions */}
          <div className="mt-10 flex items-center justify-between border-t pt-6">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <div className="flex items-center gap-2">
              {step < STEPS.length && (
                <Button variant="ghost" onClick={handleSkip}>Skip</Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!canContinue}
                className={step === STEPS.length ? "bg-accent hover:bg-accent/90 text-accent-foreground" : "bg-primary hover:bg-primary/90"}
              >
                {step === STEPS.length ? "Finish & go to dashboard" : "Continue"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
