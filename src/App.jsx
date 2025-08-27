import React from "react";
import { motion } from "framer-motion";
import { Mail, Download, ShieldCheck, Layers, Sparkles, Cpu, Briefcase, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// === Generic Portfolio Content (Wealth • Health • Design Systems • A11y • Content) ===
const PROFILE = {
  name: "Rafael Flores",
  title: "Director, Product Design",
  subtitle: "Platforms: Wealth, Health & Systems",
  email: "ralf.flores@gmail.com",
  summary:
    "Design leader (15+ yrs) who owns product design end‑to‑end—strategy, systems, and execution. I build high‑leverage teams, scale Design Systems, and ship trusted, mobile‑first experiences across Web/iOS/Android. My work spans wealth (retirement/benefits, money movement), health (clinician & member journeys), and platform enablement (content governance, accessibility, research ops). Recent focus: AI‑assisted quality tooling (LLM drift detection, internal dev chatbot) and Figma automation for faster, safer delivery.",
  highlights: [
    { label: "Designers coached", value: "20" },
    { label: "Late‑stage defects", value: "↓ 50%" },
    { label: "DS component adoption", value: "~50%" },
    { label: "Design→Dev lead time", value: "↓ 30%" },
    { label: "Research cadence", value: "2 studies/quarter" },
  ],
};

const CORE_STRENGTHS = [
  "Team leadership & mentorship",
  "Mobile‑first UX (iOS/Android/Web)",
  "Design Systems (tokens/Variables, versioning/deprecation, release trains)",
  "Figma ↔ Storybook ↔ Zeroheight • CI/visual regression",
  "Accessibility (WCAG 2.1/2.2) & privacy‑by‑design",
  "Content design & governance (voice/tone, microcopy, release notes)",
  "Wealth & Health domain patterns (money movement, statements; clinical/member flows)",
  "Experimentation & analytics (A/B tests, quant + qual)",
  "Research ops & centralized repository",
  "AI‑assisted design ops (drift detection, linting plugins, dev chatbot)",
];

const EXPERIENCE = [
  {
    company: "Alight Solutions",
    role: "Product Design Director — Design Systems & Accessibility",
    period: "2021 – Aug 2025 • Remote",
    bullets: [
      "Owned end‑to‑end design & a11y; aligned discovery with PMs.",
      "Scaled a cross‑platform Design System (tokens/Variables, versioning/deprecation, release trains) aligned to Figma ↔ Storybook ↔ Zeroheight with CI & visual regression.",
      "Standardized states for trust‑critical flows (accounts, contributions, payouts, statements); embedded WCAG 2.1/2.2; late‑stage defects ↓50%.",
      "Instrumented CSAT/NPS, adoption, error/defect rate, time‑to‑merge; maintained a delivery calendar aligned to release trains.",
      "Partnered with Product, Engineering & BA counterparts; design→dev lead time ↓30%; component adoption ~50%.",
      "AI acceleration: LLM drift detection in Slack/design guidance; internal dev chatbot; Figma plugin to lint tokens/variants & accessibility rules.",
      "Content governance: voice/tone, microcopy & disclosure patterns; release notes & migration guides in DS.",
    ],
    tags: ["Design Systems", "Accessibility", "AI", "Content"],
  },
  {
    company: "BMO Financial Group",
    role: "User Experience Team Lead",
    period: "Jan 2019 – Nov 2020 • Chicago",
    bullets: [
      "Led a cross‑functional UX team across retail & business banking (Web/iOS/Android).",
      "Owned experience architecture for money movement & servicing; facilitated vision workshops/design sprints.",
      "Established design‑system governance (tokens/Variables, content & accessibility guidelines); partnered with engineering on component APIs & quality gates.",
    ],
    tags: ["Wealth", "Banking", "Design Systems"],
  },
  {
    company: "Walgreens (Contract)",
    role: "Senior Product/Interaction Designer",
    period: "Feb 2018 – Dec 2018 • Chicago",
    bullets: [
      "Drove mobile standards and engineering rituals to raise delivery quality & speed for consumer health/retail experiences.",
    ],
    tags: ["Health", "Mobile"],
  },
  {
    company: "Earlier Roles",
    role: "UX & Engineering",
    period: "—",
    bullets: [
      "American College of Surgeons: clinician‑facing data workflows (NCDB).",
      "Hyatt (Lead Mobile Product Designer).",
      "Manifest (Sr Experience Designer).",
      "InnerWorkings (Lead UX).",
      "TandemSeven (UX) — wealth clients incl. Goldman Sachs & JPMorgan.",
      "Shure (GUI Software Engineer).",
    ],
    tags: ["Health", "Wealth", "Mobile", "UX Eng"],
  },
];

const PROJECTS = [
  {
    title: "LLM Drift Detection for Design Guidance",
    summary:
      "Monitors Slack/design guidance & component usage to surface divergences; improves consistency and reduces unknown drift.",
    tags: ["AI", "Design Systems", "Content"],
  },
  {
    title: "Internal Dev Chatbot",
    summary:
      "Answers component/API questions from docs & repos to unblock engineers and speed design system adoption.",
    tags: ["AI", "Platform", "DX"],
  },
  {
    title: "Figma Plugin — DS Lint (AWLDS Check)",
    summary:
      "Lints token/variant usage and WCAG rules; prevents late defects and accelerates design reviews.",
    tags: ["Design Systems", "A11y", "Content"],
  },
  {
    title: "Automation Platform: TradingView → AWS → Alpaca",
    summary:
      "Serverless webhooks + job runner with simulate/paper/live modes, feature flags, kill‑switch, audit logs, and alerting—operational guardrails for wealth/finance workflows.",
    tags: ["Wealth", "Automation", "Ops"],
  },
  {
    title: "Clinician Reporting & NCDB Dashboards",
    summary:
      "Clinician‑facing data workflows (ACS/NCDB): emphasis on clarity, accessibility, and evidence‑aligned content for safe interpretation.",
    tags: ["Health", "A11y", "Content"],
  },
];

const Section = ({ id, title, subtitle, icon, children }) => (
  <section id={id} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="flex items-start gap-3 mb-6">
      {icon}
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-muted-foreground mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>
    {children}
  </section>
);

const Metric = ({ value, label }) => (
  <Card className="rounded-2xl shadow-sm">
    <CardContent className="p-6">
      <div className="text-3xl font-semibold mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </CardContent>
  </Card>
);

const ExperienceCard = ({ item }) => (
  <Card className="rounded-2xl shadow-sm">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex items-center justify-between gap-3">
        <span className="font-semibold">{item.company}</span>
        <Badge variant="secondary" className="ml-auto">{item.role}</Badge>
      </CardTitle>

      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
        <Calendar size={16} />
        <span>{item.period}</span>
      </div>

      {/* tags on their own row */}
      <div className="flex flex-wrap gap-2 mt-3">
        {item.tags?.map((t) => (
          <Badge key={t} variant={t === "Design Systems" ? "blue" : "soft"}>{t}</Badge>
        ))}
      </div>
    </CardHeader>

    <CardContent className="space-y-2 text-sm">
      {item.bullets.map((b, i) => (
        <div key={i} className="flex gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
          <p>{b}</p>
        </div>
      ))}
    </CardContent>
  </Card>
);

const ProjectCard = ({ p }) => (
  <Card className="rounded-2xl shadow-sm h-full">
    <CardHeader>
      <CardTitle className="text-base">{p.title}</CardTitle>
      <div className="flex gap-2 flex-wrap justify-end mt-2">
        {p.tags.map((t) => (
          <Badge key={t} variant={t === "Design Systems" ? "blue" : "soft"}>{t}</Badge>
        ))}
      </div>
    </CardHeader>
    <CardContent className="text-sm text-muted-foreground">
      {p.summary}
    </CardContent>
  </Card>
);

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header / Hero */}
      <header className="sticky top-0 z-30 bg-background/70 backdrop-blur border-b">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers className="text-primary" />
            <span className="font-semibold">{PROFILE.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" asChild>   {/* light pill */}
              <a href={`mailto:${PROFILE.email}`}>
                <Mail className="mr-2 h-4 w-4" /> Contact
              </a>
            </Button>
            <Button asChild>                        {/* dark pill */}
              <a href="/RafaelFlores-Resume.pdf" target="_blank" rel="noopener" aria-label="Download resume (PDF)">
                <Download className="mr-2 h-4 w-4" /> Resume
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="rf-container">
        {/* Intro */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              {PROFILE.title}
            </h1>

            <p className="text-lg sm:text-2xl font-semibold text-muted-foreground/90 mt-1">
              {PROFILE.subtitle}
            </p>
            <p className="text-muted-foreground max-w-3xl">{PROFILE.summary}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="blue"><Sparkles className="h-3.5 w-3.5 mr-1" /> Design Systems</Badge>
              <Badge variant="soft"><Cpu className="h-3.5 w-3.5 mr-1" /> AI-assisted Ops</Badge>
              <Badge variant="soft"><ShieldCheck className="h-3.5 w-3.5 mr-1" /> A11y & Content</Badge>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
            {PROFILE.highlights.map((m) => (
              <Metric key={m.label} value={m.value} label={m.label} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Core Strengths */}
        <Section id="strengths" title="Core Strengths" icon={<Sparkles className="text-primary" /> }>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CORE_STRENGTHS.map((s) => (
              <Card key={s} className="rounded-2xl shadow-sm">
                <CardContent className="p-5 text-sm flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                  <span>{s}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Separator />

        {/* Experience */}
        <Section id="experience" title="Experience" icon={<Briefcase className="text-primary" /> }>
          <div className="grid lg:grid-cols-2 gap-5">
            {EXPERIENCE.map((item) => (
              <ExperienceCard key={item.company} item={item} />
            ))}
          </div>
        </Section>

        <Separator />

        {/* Projects */}
        <Section 
          id="projects" 
          title="Selected Projects" 
          subtitle="Wealth • Health • Systems • A11y • Content"
          icon={<Cpu className="text-primary" /> }>
          <Tabs defaultValue="all" tone="blue" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="wealth">Wealth</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="systems">Design Systems</TabsTrigger>
              <TabsTrigger value="a11y">A11y & Content</TabsTrigger>
              <TabsTrigger value="ai">AI</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="grid md:grid-cols-2 gap-5">
                {PROJECTS.map((p) => (
                  <ProjectCard key={p.title} p={p} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="wealth" className="mt-4">
              <div className="grid md:grid-cols-2 gap-5">
                {PROJECTS.filter(p => p.tags.includes("Wealth")).map((p) => (
                  <ProjectCard key={p.title} p={p} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="health" className="mt-4">
              <div className="grid md:grid-cols-2 gap-5">
                {PROJECTS.filter(p => p.tags.includes("Health")).map((p) => (
                  <ProjectCard key={p.title} p={p} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="systems" className="mt-4">
              <div className="grid md:grid-cols-2 gap-5">
                {PROJECTS.filter(p => p.tags.includes("Design Systems")).map((p) => (
                  <ProjectCard key={p.title} p={p} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="a11y" className="mt-4">
              <div className="grid md:grid-cols-2 gap-5">
                {PROJECTS.filter(p => p.tags.includes("A11y") || p.tags.includes("Content")).map((p) => (
                  <ProjectCard key={p.title} p={p} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="ai" className="mt-4">
              <div className="grid md:grid-cols-2 gap-5">
                {PROJECTS.filter(p => p.tags.includes("AI")).map((p) => (
                  <ProjectCard key={p.title} p={p} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Section>

        <Separator />
        
        <footer className="rf-container py-10 text-sm text-gray-600">
          {/* Contact / Footer */}
          <Section id="contact" title="Get in touch" icon={<Mail className="text-primary" /> }>
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold">Let’s build simple, trustworthy experiences in wealth & health.</div>
                  <p className="text-sm text-muted-foreground">Open to Director/Sr Director roles • Remote (Americas/ET)</p>
                </div>
                <div className="flex gap-2">
                  <Button asChild>
                    <a href={`mailto:${PROFILE.email}`}>
                      <Mail className="mr-2 h-4 w-4" /> Email Rafael
                    </a>
                  </Button>
                  <Button variant="secondary" asChild>
                    <a href="/RafaelFlores-Resume.pdf" target="_blank" rel="noopener" aria-label="View resume (PDF)">
                      <Download className="mr-2 h-4 w-4" /> Resume
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <p className="text-xs text-muted-foreground mt-4">© {new Date().getFullYear()} Rafael Flores. All rights reserved.</p>
          </Section>
        </footer>
      </main>
    </div>
  );
}
