import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Check,
  X,
  Globe,
  Inbox,
  KanbanSquare,
  Send,
  Layers,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Hirelo — Post Once. Reach Every Candidate." },
      {
        name: "description",
        content:
          "Pakistan's first recruitment platform that posts your jobs to Rozee.pk, LinkedIn, Mustakbil and Indeed — and brings every applicant back into one place.",
      },
    ],
  }),
});

const HERO_BG = "#0F1F35";
const NAVY = "#1E3A5F";
const ORANGE = "#FF6B35";

function Landing() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans scroll-smooth antialiased">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: NAVY }}
            >
              <span className="text-white font-bold">H</span>
            </div>
            <span
              className="font-bold text-lg tracking-tight"
              style={{ color: NAVY }}
            >
              Hirelo
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-sm font-medium text-slate-700 hover:text-slate-900 hidden sm:inline">
              Login
            </Link>
            <Link to="/onboarding">
              <Button
                size="sm"
                className="text-white hover:opacity-90"
                style={{ backgroundColor: ORANGE }}
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: HERO_BG }}
      >
        {/* subtle radial glow */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,107,53,0.12), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 30%, rgba(59,130,246,0.10), transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 mb-7">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: ORANGE }}
            />
            Built for hiring teams in Pakistan
          </div>
          <h1
            className="font-bold tracking-tight text-white leading-[1.05] mx-auto max-w-4xl"
            style={{ fontSize: "clamp(36px, 6vw, 52px)" }}
          >
            Post Once.{" "}
            <span style={{ color: ORANGE }}>Reach Every Candidate.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Pakistan's first recruitment platform that posts your jobs to
            Rozee.pk, LinkedIn, Mustakbil and Indeed — and brings all
            applications back in one place.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/onboarding">
              <Button
                size="lg"
                className="h-12 px-7 text-base text-white hover:opacity-90 shadow-lg shadow-orange-500/20"
                style={{ backgroundColor: ORANGE }}
              >
                Start Free Trial <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-7 text-base bg-transparent border-white/25 text-white hover:bg-white/10 hover:text-white"
            >
              See How It Works
            </Button>
          </div>
          <p className="mt-5 text-xs text-white/50">
            No credit card required · Setup in 5 minutes · Cancel anytime
          </p>

          {/* Browser mockup */}
          <div className="mt-16 md:mt-20 relative mx-auto max-w-5xl">
            <div
              className="rounded-xl overflow-hidden border border-white/10 bg-white shadow-2xl"
              style={{
                transform: "perspective(1600px) rotateX(2deg)",
                boxShadow:
                  "0 40px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="text-xs text-slate-500 bg-white border border-slate-200 rounded-md px-3 py-1 max-w-xs w-full text-center">
                    app.hirelo.pk/dashboard
                  </div>
                </div>
              </div>
              {/* Fake dashboard preview */}
              <DashboardPreview />
            </div>
          </div>
        </div>

        {/* LOGOS STRIP */}
        <div className="relative border-t border-white/10 bg-black/20">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <span className="text-xs uppercase tracking-widest text-white/40 font-medium">
              Connects with
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-white/55">
              {["LinkedIn", "Indeed", "Rozee.pk", "Mustakbil"].map((l) => (
                <span
                  key={l}
                  className="text-base md:text-lg font-semibold tracking-tight hover:text-white/80 transition-colors"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-24 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight"
              style={{ color: NAVY }}
            >
              Hiring in Pakistan is a mess right now.
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              Recruiters waste hours every week duplicating work across
              platforms. There's a better way.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Without */}
            <div className="rounded-2xl border border-red-200 bg-red-50/60 p-8 md:p-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 bg-red-100 rounded-full px-3 py-1 mb-6">
                <X className="h-3.5 w-3.5" /> Without Hirelo
              </div>
              <ul className="space-y-4">
                {[
                  "4 different platform logins",
                  "CVs scattered across email folders",
                  "No idea which platform performed best",
                  "Hours wasted on manual tracking",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-slate-700">
                    <span className="mt-1 h-5 w-5 rounded-full bg-red-200 text-red-700 flex items-center justify-center shrink-0">
                      <X className="h-3 w-3" />
                    </span>
                    <span className="leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* With */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 md:p-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full px-3 py-1 mb-6">
                <Check className="h-3.5 w-3.5" /> With Hirelo
              </div>
              <ul className="space-y-4">
                {[
                  "One login, everything in one place",
                  "All CVs auto-collected and tagged by source",
                  "Analytics showing which platform gets best candidates",
                  "Hire faster with zero manual work",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-slate-700">
                    <span className="mt-1 h-5 w-5 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="py-24 md:py-28"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight"
              style={{ color: NAVY }}
            >
              Everything your HR team needs
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              A focused toolkit for modern hiring — beautifully simple, deeply
              powerful.
            </p>
          </div>

          <div className="space-y-6">
            <FeatureBlock
              icon={Send}
              title="Post Everywhere in One Click"
              desc="Write your job once. Hirelo syndicates it instantly to LinkedIn, Indeed, Rozee.pk and Mustakbil — with all the right formatting per platform."
              illustration={<PostIllustration />}
            />
            <FeatureBlock
              icon={Inbox}
              title="All Applications, One Inbox"
              desc="No more hopping between four dashboards. Every applicant from every channel lands in a single, searchable inbox tagged by source."
              illustration={<InboxIllustration />}
              reverse
            />
            <FeatureBlock
              icon={KanbanSquare}
              title="Visual Candidate Pipeline"
              desc="Drag candidates through stages — Applied, Screening, Interview, Offer. Your whole team sees the same picture, no spreadsheets required."
              illustration={<KanbanIllustration />}
            />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-24 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight"
              style={{ color: NAVY }}
            >
              HR teams love Hirelo
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              Real words from real recruiters across the country.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "We used to spend 2 hours a day checking Rozee and LinkedIn separately. Now everything is in one place.",
                name: "Maha K.",
                role: "HR Manager",
                company: "Karachi",
                initials: "MK",
              },
              {
                quote:
                  "The candidate pipeline alone saved our team so much back-and-forth on WhatsApp.",
                name: "Bilal A.",
                role: "Talent Lead",
                company: "Lahore",
                initials: "BA",
              },
              {
                quote:
                  "Finally a tool built for how hiring actually works in Pakistan.",
                name: "Sara M.",
                role: "People Operations",
                company: "Islamabad",
                initials: "SM",
              },
            ].map((t) => (
              <Card
                key={t.name}
                className="p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col bg-white"
              >
                <p className="text-slate-800 leading-relaxed flex-1 text-[15px]">
                  "{t.quote}"
                </p>
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                    style={{ backgroundColor: NAVY }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="py-24 md:py-28"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight"
              style={{ color: NAVY }}
            >
              Simple pricing for every team
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              Start free, upgrade when you're ready. No hidden fees.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {[
              {
                name: "Starter",
                price: "PKR 4,999",
                period: "/mo",
                desc: "For small teams just getting started.",
                features: [
                  "3 active jobs",
                  "1 user",
                  "All platforms",
                  "Basic analytics",
                ],
                cta: "Start Free Trial",
                highlighted: false,
              },
              {
                name: "Growth",
                price: "PKR 12,999",
                period: "/mo",
                desc: "For growing teams hiring often.",
                features: [
                  "15 active jobs",
                  "5 users",
                  "Full analytics",
                  "Priority support",
                ],
                cta: "Start Free Trial",
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                desc: "For large organizations.",
                features: [
                  "Unlimited everything",
                  "Dedicated account manager",
                  "SSO & advanced security",
                  "Custom integrations",
                ],
                cta: "Contact Sales",
                highlighted: false,
              },
            ].map((p) => (
              <Card
                key={p.name}
                className={`p-8 flex flex-col relative bg-white ${
                  p.highlighted
                    ? "border-2 shadow-xl md:scale-[1.03]"
                    : "border border-slate-200 shadow-sm"
                }`}
                style={
                  p.highlighted
                    ? { borderColor: ORANGE }
                    : undefined
                }
              >
                {p.highlighted && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: ORANGE }}
                  >
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-slate-900">
                  {p.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1">{p.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: NAVY }}
                  >
                    {p.price}
                  </span>
                  <span className="text-slate-500 text-sm">{p.period}</span>
                </div>
                <ul className="mt-6 space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <Check
                        className="h-4 w-4 mt-0.5 shrink-0"
                        style={{ color: ORANGE }}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/onboarding" className="mt-8">
                  <Button
                    className="w-full text-white hover:opacity-90"
                    style={{
                      backgroundColor: p.highlighted ? ORANGE : NAVY,
                    }}
                  >
                    {p.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        id="about"
        className="py-24 md:py-28"
        style={{ backgroundColor: HERO_BG }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Ready to hire smarter?
          </h2>
          <p className="mt-5 text-lg text-white/70">
            Join HR teams across Pakistan already using Hirelo.
          </p>
          <Link to="/onboarding" className="inline-block mt-9">
            <Button
              size="lg"
              className="h-12 px-8 text-base text-white hover:opacity-90 shadow-lg shadow-orange-500/20"
              style={{ backgroundColor: ORANGE }}
            >
              Get Started Free <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-white/70" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <span className="text-white font-bold">H</span>
                </div>
                <span className="font-bold text-lg text-white">Hirelo</span>
              </div>
              <p className="mt-4 text-sm text-white/60 leading-relaxed">
                Hiring, simplified for Pakistan.
              </p>
            </div>
            <FooterCol
              title="Product"
              links={["Features", "Pricing", "Integrations", "Changelog"]}
            />
            <FooterCol
              title="Company"
              links={["About", "Customers", "Careers", "Contact"]}
            />
            <FooterCol
              title="Support"
              links={["Help Center", "Documentation", "Status", "Privacy"]}
            />
          </div>
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/50">
            <span>© 2025 Hirelo. Made in Pakistan 🇵🇰</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Sub components ---------- */

function FeatureBlock({
  icon: Icon,
  title,
  desc,
  illustration,
  reverse,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  illustration: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      <div
        className={`grid md:grid-cols-2 gap-0 items-stretch ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="p-10 md:p-14 flex flex-col justify-center">
          <div
            className="h-12 w-12 rounded-xl flex items-center justify-center mb-6"
            style={{ backgroundColor: "rgba(255,107,53,0.1)" }}
          >
            <Icon className="h-6 w-6" />
          </div>
          <h3
            className="text-2xl md:text-3xl font-bold tracking-tight"
            style={{ color: NAVY }}
          >
            {title}
          </h3>
          <p className="mt-4 text-slate-600 leading-relaxed text-[15px]">
            {desc}
          </p>
        </div>
        <div
          className="p-8 md:p-10 flex items-center justify-center min-h-[260px]"
          style={{ backgroundColor: "#F8F9FA" }}
        >
          {illustration}
        </div>
      </div>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l}>
            <a
              href="#"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Illustrations ---------- */

function PostIllustration() {
  return (
    <div className="relative w-full max-w-sm">
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="h-7 w-7 rounded-md flex items-center justify-center"
            style={{ backgroundColor: NAVY }}
          >
            <Send className="h-3.5 w-3.5 text-white" />
          </div>
          <div className="text-sm font-semibold text-slate-800">
            Senior Developer
          </div>
        </div>
        <div className="h-2 rounded bg-slate-100 mb-1.5 w-full" />
        <div className="h-2 rounded bg-slate-100 w-2/3" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {["LinkedIn", "Indeed", "Rozee.pk", "Mustakbil"].map((p) => (
          <div
            key={p}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-medium text-slate-700 flex items-center gap-2 shadow-sm"
          >
            <Check
              className="h-3.5 w-3.5"
              style={{ color: "#10B981" }}
            />
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}

function InboxIllustration() {
  return (
    <div className="w-full max-w-sm bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
        <Layers className="h-4 w-4 text-slate-400" />
        <span className="text-sm font-semibold text-slate-800">Inbox</span>
        <span
          className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: ORANGE }}
        >
          24 new
        </span>
      </div>
      <div className="divide-y divide-slate-100">
        {[
          { name: "Ahmed R.", src: "LinkedIn", c: "#0A66C2" },
          { name: "Fatima Z.", src: "Rozee.pk", c: "#0E7C66" },
          { name: "Hassan M.", src: "Indeed", c: "#2164F4" },
          { name: "Ayesha N.", src: "Mustakbil", c: "#7C3AED" },
        ].map((c) => (
          <div key={c.name} className="px-4 py-2.5 flex items-center gap-3">
            <div
              className="h-7 w-7 rounded-full flex items-center justify-center text-white text-[11px] font-semibold"
              style={{ backgroundColor: NAVY }}
            >
              {c.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-slate-800 truncate">
                {c.name}
              </div>
              <div className="text-[10px] text-slate-500">
                Applied · 2h ago
              </div>
            </div>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${c.c}15`,
                color: c.c,
              }}
            >
              {c.src}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function KanbanIllustration() {
  const cols = [
    { title: "Applied", count: 12, items: 3 },
    { title: "Screening", count: 5, items: 2 },
    { title: "Interview", count: 2, items: 1 },
  ];
  return (
    <div className="w-full max-w-sm grid grid-cols-3 gap-2">
      {cols.map((col) => (
        <div
          key={col.title}
          className="bg-white border border-slate-200 rounded-lg p-2 shadow-sm"
        >
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-[10px] font-semibold text-slate-700 uppercase tracking-wide">
              {col.title}
            </span>
            <span className="text-[10px] text-slate-400">{col.count}</span>
          </div>
          <div className="space-y-1.5">
            {Array.from({ length: col.items }).map((_, i) => (
              <div
                key={i}
                className="rounded-md border border-slate-100 bg-slate-50 p-2"
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: NAVY }}
                  />
                  <div className="h-1.5 flex-1 rounded bg-slate-200" />
                </div>
                <div className="h-1 rounded bg-slate-200 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="bg-white grid grid-cols-[160px_1fr] h-[320px] md:h-[420px] text-left">
      {/* Sidebar */}
      <div className="bg-slate-50 border-r border-slate-200 p-3 flex flex-col gap-1">
        <div className="flex items-center gap-2 px-2 py-2">
          <div
            className="h-6 w-6 rounded-md flex items-center justify-center"
            style={{ backgroundColor: NAVY }}
          >
            <span className="text-white text-[10px] font-bold">H</span>
          </div>
          <span className="text-xs font-bold" style={{ color: NAVY }}>
            Hirelo
          </span>
        </div>
        <div className="mt-2 space-y-0.5">
          {[
            { label: "Dashboard", active: true },
            { label: "Jobs" },
            { label: "Candidates" },
            { label: "Analytics" },
            { label: "Settings" },
          ].map((i) => (
            <div
              key={i.label}
              className={`text-[11px] px-2 py-1.5 rounded-md ${
                i.active
                  ? "bg-white text-slate-900 font-semibold shadow-sm"
                  : "text-slate-500"
              }`}
            >
              {i.label}
            </div>
          ))}
        </div>
      </div>
      {/* Main */}
      <div className="p-4 md:p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm md:text-base font-bold text-slate-900">
              Welcome back, Hira
            </div>
            <div className="text-[10px] md:text-xs text-slate-500">
              Here's what's happening with your hiring today.
            </div>
          </div>
          <div
            className="h-7 px-3 rounded-md text-[11px] font-semibold text-white flex items-center"
            style={{ backgroundColor: ORANGE }}
          >
            + New job
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {[
            { l: "Active jobs", v: "12", icon: Globe },
            { l: "Candidates", v: "284", icon: Users },
            { l: "Interviews", v: "18", icon: KanbanSquare },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-lg border border-slate-200 p-2.5 md:p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] md:text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
                  {s.l}
                </span>
                <s.icon className="h-3 w-3 text-slate-400" />
              </div>
              <div
                className="text-base md:text-xl font-bold mt-1"
                style={{ color: NAVY }}
              >
                {s.v}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <div className="text-[11px] font-semibold text-slate-700 mb-2">
            Recent applicants
          </div>
          <div className="space-y-1.5">
            {[
              { n: "Ahmed R.", r: "Senior Developer", s: "LinkedIn" },
              { n: "Fatima Z.", r: "UX Designer", s: "Rozee.pk" },
              { n: "Hassan M.", r: "Product Manager", s: "Indeed" },
            ].map((c) => (
              <div
                key={c.n}
                className="flex items-center gap-2 text-[10px] md:text-[11px]"
              >
                <div
                  className="h-5 w-5 rounded-full flex items-center justify-center text-white text-[9px] font-semibold"
                  style={{ backgroundColor: NAVY }}
                >
                  {c.n[0]}
                </div>
                <span className="font-medium text-slate-800">{c.n}</span>
                <span className="text-slate-500">{c.r}</span>
                <span
                  className="ml-auto text-[9px] font-medium px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: "rgba(255,107,53,0.1)",
                    color: ORANGE,
                  }}
                >
                  {c.s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
