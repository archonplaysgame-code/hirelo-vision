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
            <Link to="/onboarding">
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
            <Link to="/onboarding">
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

      <section className="bg-muted/30 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">Loved by hiring teams</h2>
            <p className="mt-4 text-muted-foreground">What HR managers are saying about Hirelo.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Hirelo cut our time-to-hire in half. Posting to four platforms used to take a full afternoon — now it's one click.",
                name: "Ayesha Khan",
                role: "Head of People, Bramerz",
              },
              {
                quote: "The unified pipeline is a game changer. My team finally stopped juggling five tabs and ten spreadsheets.",
                name: "Daniel Reyes",
                role: "HR Manager, Northwind Labs",
              },
              {
                quote: "We hired three engineers in two weeks using Hirelo. The candidate experience feels genuinely premium.",
                name: "Sana Iqbal",
                role: "Talent Lead, Finja",
              },
            ].map((t) => (
              <Card key={t.name} className="p-8 border-0 shadow-sm bg-background flex flex-col">
                <div className="flex gap-1 mb-4 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed flex-1">"{t.quote}"</p>
                <div className="mt-6 pt-6 border-t">
                  <div className="font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">Simple, transparent pricing</h2>
            <p className="mt-4 text-muted-foreground">Pick a plan that scales with your hiring.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$0",
                period: "/month",
                desc: "For small teams getting started.",
                features: ["Up to 3 active jobs", "2 platform integrations", "Basic candidate pipeline", "Email support"],
                cta: "Start for free",
                highlighted: false,
              },
              {
                name: "Growth",
                price: "$99",
                period: "/month",
                desc: "For growing teams hiring often.",
                features: ["Unlimited active jobs", "All 4 platform integrations", "Advanced analytics", "Team collaboration (10 seats)", "Priority support"],
                cta: "Start free trial",
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                desc: "For large organizations.",
                features: ["Everything in Growth", "Unlimited seats", "SSO & advanced security", "Custom integrations", "Dedicated success manager"],
                cta: "Contact sales",
                highlighted: false,
              },
            ].map((p) => (
              <Card
                key={p.name}
                className={`p-8 flex flex-col relative ${
                  p.highlighted
                    ? "border-2 border-accent shadow-xl scale-[1.02]"
                    : "border shadow-sm"
                }`}
              >
                {p.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-primary">{p.price}</span>
                  <span className="text-muted-foreground text-sm">{p.period}</span>
                </div>
                <ul className="mt-6 space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/dashboard" className="mt-8">
                  <Button
                    className={`w-full ${
                      p.highlighted
                        ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                        : "bg-primary hover:bg-primary/90"
                    }`}
                  >
                    {p.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-muted/30 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">Frequently asked questions</h2>
            <p className="mt-4 text-muted-foreground">Everything you need to know about Hirelo.</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "Which job platforms does Hirelo post to?",
                a: "Hirelo currently syndicates jobs to LinkedIn, Indeed, Rozee.pk, and Mustakbil. We're constantly adding more — let us know which platforms matter to you.",
              },
              {
                q: "Do I need separate accounts on each job board?",
                a: "Yes, you'll connect your existing accounts once in Settings. After that, Hirelo handles posting, updating, and closing jobs across all of them automatically.",
              },
              {
                q: "How does the unified candidate pipeline work?",
                a: "Every applicant from every platform lands in the same kanban board. You can move candidates through stages, leave notes, and collaborate with your team — all in one place.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes — every plan starts with a 14-day free trial. No credit card required, and you can cancel anytime before it ends.",
              },
              {
                q: "Can I invite my team?",
                a: "Absolutely. The Growth plan includes 10 seats, and Enterprise includes unlimited seats with role-based permissions and SSO.",
              },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-20">
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
