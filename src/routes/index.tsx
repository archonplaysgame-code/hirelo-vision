import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Inbox, KanbanSquare, ArrowRight, CheckCircle2, Star, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Hirelo — Post Once. Hire From Everywhere." },
      { name: "description", content: "Post jobs to LinkedIn, Indeed, Rozee.pk and Mustakbil from one place. Manage candidates in a unified pipeline." },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 backdrop-blur bg-background/80 border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">H</span>
            </div>
            <span className="font-bold text-lg tracking-tight">Hirelo</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/dashboard">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-32 md:pb-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            New: Mustakbil integration is live
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary leading-[1.05]">
            Post Once. <br className="md:hidden" />
            <span className="text-accent">Hire</span> From Everywhere.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Hirelo broadcasts your job to LinkedIn, Indeed, Rozee.pk, and Mustakbil — and brings every applicant back into one beautiful pipeline.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/dashboard">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-12 px-7 text-base">
                Get Started Free <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-7 text-base">Watch demo</Button>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            {["No credit card required", "Free 14-day trial", "Cancel anytime"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" />{t}</span>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-0 -bottom-1 h-24 bg-gradient-to-b from-transparent to-muted/30 pointer-events-none" />
      </section>

      <section id="features" className="bg-muted/30 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">Everything recruiting needs.</h2>
            <p className="mt-4 text-muted-foreground">A focused toolkit for modern hiring teams — no clutter.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Post to all platforms", desc: "Publish to LinkedIn, Indeed, Rozee.pk and Mustakbil with one click." },
              { icon: Inbox, title: "Centralized Applications", desc: "Every applicant from every channel lands in a single inbox." },
              { icon: KanbanSquare, title: "Candidate Pipeline", desc: "Visual kanban to move candidates from applied to hired." },
            ].map((f) => (
              <Card key={f.title} className="p-8 border-0 shadow-sm hover:shadow-lg transition-shadow bg-background">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">How it works</h2>
            <p className="mt-4 text-muted-foreground">Three steps to your next great hire.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "01", title: "Create a job", desc: "Write the role once with our clean editor." },
              { n: "02", title: "Broadcast everywhere", desc: "Choose platforms — we handle the syndication." },
              { n: "03", title: "Hire faster", desc: "Review applicants in a unified pipeline and ship offers." },
            ].map((s) => (
              <div key={s.n} className="relative">
                <div className="text-6xl font-bold text-accent/20">{s.n}</div>
                <h3 className="mt-2 text-xl font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-primary text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to hire smarter?</h2>
          <p className="mt-4 text-primary-foreground/80">Join hundreds of teams running their hiring on Hirelo.</p>
          <Link to="/dashboard" className="inline-block mt-8">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-12 px-8">Start free trial</Button>
          </Link>
        </div>
      </section>

      <footer className="border-t py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">H</span>
            </div>
            <span>© 2026 Hirelo. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
