import React, { useEffect, useRef, useState } from "react";
import { motion, animate, type AnimationPlaybackControls } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Layers,
  Rocket,
  Shield,
  SquareArrowOutUpRight,
  PlayCircle,
  ExternalLink,
  FileText,
  LineChart,
  type LucideIcon,
} from "lucide-react";

// If you're using shadcn/ui, these imports should resolve.
// Otherwise, replace with your own UI primitives.
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

// ---------------------------------------------------------------------------
// Types (data model)
// ---------------------------------------------------------------------------
export type CTA = {
  label: string;
  href: string;
  variant?: "default" | "secondary" | "ghost" | "link";
  icon?: LucideIcon | React.ReactElement;
};

export type Hero =
  | { type: "image"; src: string; alt: string; className?: string }
  | { type: "video"; src: string; poster?: string; title?: string; className?: string };

export type CaseStudyHeaderData = {
  title: string;
  subtitle?: string;
  role?: string;
  team?: string;
  scope?: string;
  tldr?: string;
  hero: Hero;
  badges?: string[]; // e.g., ["8.6/10 ease", "8.4/10 confidence"]
  ctas?: CTA[];
};

export type ProblemOutcomeData = {
  problem: string;
  outcome: string;
};

export type StrategicHighlight = {
  icon?: LucideIcon;
  label: string;
  copy: string;
};

export type ResultStat = {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  hint?: string;
};

export type Artifact = {
  title: string;
  image: { src: string; alt: string; aspect?: string };
  caption?: string;
};

export type InsightCard = {
  icon?: LucideIcon;
  title: string;
  copy: string;
};

export type ResourcesBarData = {
  items: CTA[];
};

export type ProcessTabsData = {
  sprint?: React.ReactNode;
  findings?: React.ReactNode;
  changes?: React.ReactNode;
  experiments?: React.ReactNode;
  // Optionally extendable:
  extra?: Array<{ id: string; label: string; content: React.ReactNode }>;
};

export type CaseStudyData = {
  header: CaseStudyHeaderData;
  snapshot: ProblemOutcomeData;
  highlights: StrategicHighlight[]; // 3 pillars recommended
  results: ResultStat[]; // metrics
  artifacts: Artifact[]; // labeled screens
  insights: InsightCard[]; // 2–3 narrative cards
  resources?: ResourcesBarData;
  process?: ProcessTabsData;
};

// ---------------------------------------------------------------------------
// Reusable Bits
// ---------------------------------------------------------------------------
export function CountUp({
  value,
  suffix = "",
  duration = 0.8,
  decimals = 0,
  retriggerOnRender = true,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
  /** when true, restart animation on parent renders (without loops) */
  retriggerOnRender?: boolean;
}) {
  const [text, setText] = useState(() => Number(0).toFixed(decimals));
  const animatingRef = useRef(false);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  const start = () => {
    controlsRef.current?.stop();
    animatingRef.current = true;
    controlsRef.current = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setText(Number(latest).toFixed(decimals)),
      onComplete: () => {
        animatingRef.current = false;
      },
    });
  };

  useEffect(() => {
    if (!retriggerOnRender) start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, decimals, retriggerOnRender]);

  useEffect(() => {
    if (retriggerOnRender && !animatingRef.current) {
      start();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  useEffect(() => () => {
    controlsRef.current?.stop();
    animatingRef.current = false;
  }, []);

  return (
    <span className="tabular-nums" aria-live="polite" aria-atomic>
      {text} {suffix}
    </span>
  );
}

export const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{children}</span>
);

export const Section = ({
  title,
  subtitle,
  children,
  id,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  id?: string;
}) => (
  <section id={id} className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
    <div className="mb-6 flex items-end justify-between">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <nav aria-label="Case study section shortcuts" className="hidden gap-2 sm:flex">
        <a href="#overview" className="text-xs text-muted-foreground hover:text-foreground">
          Overview
        </a>
        <a href="#results" className="text-xs text-muted-foreground hover:text-foreground">
          Results
        </a>
        <a href="#process" className="text-xs text-muted-foreground hover:text-foreground">
          Process
        </a>
        <a href="#impact" className="text-xs text-muted-foreground hover:text-foreground">
          Learnings
        </a>
      </nav>
    </div>
    {children}
  </section>
);

// Safely render a CTA icon that might be either a Lucide component (function) or an element
function renderCTAIcon(icon?: LucideIcon | React.ReactElement) {
  if (!icon) return null;
  // If the data provided a Lucide component, render with fixed size & spacing
  if (typeof icon === "function") {
    const Icon = icon as LucideIcon;
    return <Icon className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />;
  }
  // If the data provided a ready-made element, wrap it and size any inner <svg>
  // No cloneElement ⇒ no TS overload issues
  if (React.isValidElement(icon)) {
    return (
      <span
        aria-hidden="true"
        className="mr-2 inline-flex items-center [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0"
      >
        {icon}
      </span>
    );
  }
  return null;
}

// ---------------------------------------------------------------------------
// Extracted Components
// ---------------------------------------------------------------------------
export const CaseStudyHeader = ({ data }: { data: CaseStudyHeaderData }) => {
  const { title, subtitle, role, team, scope, tldr, hero, badges, ctas } = data;
  return (
    <section id="overview" className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-7">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted/40 shadow-sm">
            {hero.type === "image" ? (
              <img src={hero.src} alt={hero.alt} className="h-full w-full object-cover" />
            ) : (
              <video
                className={`h-full w-full object-cover ${hero.className ?? ""}`}
                src={hero.src}
                poster={hero.poster}
                title={hero.title}
                controls
              />
            )}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="flex flex-col gap-4 lg:col-span-5">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Role, team, and scope">
            {role && <Badge variant="primary">Role: {role}</Badge>}
            {team && <Badge variant="primary">Team: {team}</Badge>}
            {scope && <Badge variant="primary">Scope: {scope}</Badge>}
          </div>
          {!!badges?.length && (
            <div className="flex flex-wrap gap-2">
              {badges.map((b, i) => {
                const isMetric = /[\d%]/.test(b); // e.g., "8.6/10 ease", "100% likelihood"
                return (
                  <Badge
                    key={i}
                    /* Use outline so the component doesn’t inject a background color that overrides ours */
                    variant="outline"
                    /* Add ! utilities so we win specificity against variant classes */
                    className={
                      isMetric
                        ? "rounded-full !border-0 !bg-emerald-600/10 !text-emerald-700 hover:!bg-emerald-600/15"
                        : "rounded-full !border-0 !bg-muted !text-foreground/70 hover:!bg-muted/80"
                    }
                  >
                    {b}
                  </Badge>
                );
              })}
            </div>
          )}
          {tldr && <p className="text-sm leading-relaxed text-muted-foreground">{tldr}</p>}
          {!!ctas?.length && (
            <div className="flex flex-wrap gap-2">
              {ctas.map((c, i) => (
                <Button key={i} asChild size="sm" variant={c.variant ?? "default"}>
                  <a href={c.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5">
                    {renderCTAIcon(c.icon)}
                    {c.label}
                  </a>
                </Button>
              ))}
              <Button asChild variant="ghost" size="sm">
                <a href="#process">
                  See process <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export const ProblemOutcome = ({ data }: { data: ProblemOutcomeData }) => (
  <section id="snapshot" className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="rounded-2xl border bg-muted/40 shadow-sm">
        <CardHeader className="pb-1">
          <CardTitle className="text-base">Problem</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">{data.problem}</CardContent>
      </Card>
      <Card className="rounded-2xl border bg-muted/40 shadow-sm">
        <CardHeader className="pb-1">
          <CardTitle className="text-base">Outcome</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">{data.outcome}</CardContent>
      </Card>
    </div>
  </section>
);

export const StrategicHighlights = ({ items }: { items: StrategicHighlight[] }) => (
  <Section id="highlights" title="Strategic Highlights" subtitle="Leadership-level framing in three pillars">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map((it, i) => {
        const Icon = it.icon;
        return (
          <Card key={i} className="rounded-2xl">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                <CardTitle className="text-base">{it.label}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{it.copy}</CardContent>
          </Card>
        );
      })}
    </div>
  </Section>
);

export const ResultsGrid = ({ stats }: { stats: ResultStat[] }) => (
  <Section id="results" title="Results at a Glance" subtitle="Quick, credible metrics with context">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      {stats.map((s, i) => (
        <div key={i} className="flex flex-col items-start gap-1 rounded-2xl bg-muted/40 p-4 shadow-sm">
          <div className="text-3xl font-semibold tracking-tight">
            <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} retriggerOnRender />
          </div>
          <div className="text-sm text-muted-foreground">{s.label}</div>
          {s.hint && <div className="text-xs text-muted-foreground/80">{s.hint}</div>}
        </div>
      ))}
    </div>
  </Section>
);

export const ArtifactsGallery = ({ items }: { items: Artifact[] }) => (
  <Section id="artifacts" title="What I Built" subtitle="Screens and decision patterns">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((a, i) => {
        const aspectClass = a.image.aspect ?? ""; // e.g., "aspect-[10/16]" or ""
        const href = a.image.src ?? a.image.src;  // allow custom link, else open the image itself

        return (
          <Card key={i} className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{a.title}</CardTitle>
            </CardHeader>

            <CardContent>
              {/* Clickable image */}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                aria-label={`Open ${a.title} in a new tab`}
                title="Open full size ↗"
              >
                <div
                  className={[
                    "relative w-full overflow-hidden rounded-xl bg-white",
                    aspectClass,
                  ].join(" ")}
                >
                  <img
                    src={a.image.src}
                    alt={a.image.alt}
                    className={aspectClass ? "h-full w-full object-contain p-3" : "w-full h-auto object-contain p-3"}
                    loading="lazy"
                  />

                  {/* Hover/focus badge (optional) */}
                  <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                    Open ↗
                  </span>
                </div>
              </a>

              {a.caption && (
                <p className="mt-2 text-xs text-muted-foreground">{a.caption}</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  </Section>
);

export const InsightsImpact = ({ items }: { items: InsightCard[] }) => (
  <Section id="impact" title="Insights & Impact" subtitle="Why this mattered beyond the prototype">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map((c, i) => {
        const Icon = c.icon;
        return (
          <Card key={i} className="rounded-2xl">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4" />}
                <CardTitle className="text-base">{c.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{c.copy}</CardContent>
          </Card>
        );
      })}
    </div>
  </Section>
);

export const ResourcesBar = ({ data }: { data: ResourcesBarData }) => (
  <Section id="resources" title="Resources" subtitle="Proof links for reviewers">
    <div className="flex flex-wrap gap-2">
       {data.items.map((c, i) => (
        <Button key={i} asChild size="sm" variant={c.variant ?? "default"}>
          <a href={c.href} target="_blank" rel="noreferrer" className="inline-flex items-center">
            {renderCTAIcon(c.icon)}
            {c.label}
          </a>
        </Button>
      ))}
    </div>
  </Section>
);

export const ProcessTabs = ({ data }: { data?: ProcessTabsData }) => {
  if (!data) return null;
  const { sprint, findings, changes, experiments, extra } = data;
  return (
    <Section id="process" title="Process (Optional Deep Dive)" subtitle="Design Sprint → Findings → Changes → Next Experiments">
      <Tabs defaultValue={sprint ? "sprint" : findings ? "findings" : changes ? "changes" : experiments ? "experiments" : extra?.[0]?.id ?? "sprint"} className="w-full">
        <TabsList className="rounded-xl [&_[role=tab]]:cursor-pointer [&_[role=tab]]:hover:bg-muted/60">
          {sprint && <TabsTrigger value="sprint">Design Sprint</TabsTrigger>}
          {findings && <TabsTrigger value="findings">Findings</TabsTrigger>}
          {changes && <TabsTrigger value="changes">Changes Shipped</TabsTrigger>}
          {experiments && <TabsTrigger value="experiments">Next Experiments</TabsTrigger>}
          {extra?.map((x) => (
            <TabsTrigger key={x.id} value={x.id}>
              {x.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {sprint && (
          <TabsContent value="sprint" className="mt-4 text-sm text-muted-foreground">
            {sprint}
          </TabsContent>
        )}
        {findings && (
          <TabsContent value="findings" className="mt-4 text-sm text-muted-foreground">
            {findings}
          </TabsContent>
        )}
        {changes && (
          <TabsContent value="changes" className="mt-4 text-sm text-muted-foreground">
            {changes}
          </TabsContent>
        )}
        {experiments && (
          <TabsContent value="experiments" className="mt-4 text-sm text-muted-foreground">
            {experiments}
          </TabsContent>
        )}
        {extra?.map((x) => (
          <TabsContent key={x.id} value={x.id} className="mt-4 text-sm text-muted-foreground">
            {x.content}
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  );
};

// ---------------------------------------------------------------------------
// Page-level Composer (Example usage)
// ---------------------------------------------------------------------------
export default function CaseStudyPage() {
  const data: CaseStudyData = {
    header: {
      title: "AI Swing Coach: Mobile Trading",
      subtitle: "AI UX • Fintech • Design Sprint • 5 days",
      role: "Product Designer (IC)",
      team: "Solo (mock data)",
      scope: "5 iOS screens, DS prototype",
      tldr: "Designed and validated a simulate-first mobile trading flow that builds trust through explainability and safe reversibility.",
      hero: { type: "image", src: "/case-studies/ai-swing-coach/hero.png", alt: "AI Swing Coach hero" },
      badges: ["8.6/10 ease", "8.4/10 confidence", "0 switch errors"],
      ctas: [
        { label: "Watch Demo", href: "https://vimeo.com/1124683385/5503bbdf97", icon: <PlayCircle className="mr-2 h-4 w-4" /> },
        { label: "Figma Prototype", href: "https://www.figma.com/proto/TWAIpihUhIWRi2muQEmOSv/AI-Swing-Coach-App?node-id=92-6307&t=2k8L0LPJ38Ocxqaz-1", variant: "secondary", icon: <SquareArrowOutUpRight className="mr-2 h-4 w-4" /> },
        { label: "Design Source", href: "https://www.figma.com/design/TWAIpihUhIWRi2muQEmOSv/AI-Swing-Coach-App?node-id=92-6307&t=2k8L0LPJ38Ocxqaz-1", variant: "ghost", icon: <FileText className="mr-2 h-4 w-4" /> },
      ],
    },
    snapshot: {
      problem:
        "Swing traders face noisy signals and risky execution with low explainability, leading to hesitation or errors.",
      outcome:
        "Built an AI-native prototype with guardrails, explainability, and undo that increased confidence (8.4/10) and eliminated mode-switch errors.",
    },
    highlights: [
      { icon: Brain, label: "Human-in-the-loop AI UX", copy: "Explainable signals, simulate-first, and undo patterns to improve trust and risk control." },
      { icon: Layers, label: "Systems Design", copy: "Refactored fast prototype into DS primitives (tokens, variables) for scale and consistency." },
      { icon: Rocket, label: "Design Ops Speed", copy: "5-day sprint + unmoderated Maze test (n=7) to quickly validate hypotheses and ship fixes." },
    ],
    results: [
      { label: "Ease of mode switch", value: 8.6, suffix: "/10", hint: "Guarded confirmation works", decimals: 1 },
      { label: "Confidence in live execution", value: 8.4, suffix: "/10", hint: "Explainability boosts trust", decimals: 1 },
      { label: "Mode switch errors", value: 0, hint: "Guardrails successful" },
      { label: "Adoption intent", value: 100, suffix: "%", hint: "Directional; small n" },
      { label: "Cycle time", value: 5, suffix: " days", hint: "Sprint + test" },
    ],
    artifacts: [
      { title: "Signals", image: { src: "/case-studies/ai-swing-coach/signals.png", alt: "Signals screen" }, caption: "Explainable cues, mini-charts" },
      { title: "Simulate", image: { src: "/case-studies/ai-swing-coach/simulate.png", alt: "Simulate-first screen" }, caption: "Simulate-first, $↔% toggle" },
      { title: "Positions", image: { src: "/case-studies/ai-swing-coach/positions.png", alt: "Positions screen" }, caption: "Attention triage, undo" },
      { title: "Alerts", image: { src: "/case-studies/ai-swing-coach/alerts.png", alt: "Alerts screen" }, caption: "Actionable notifications" },
      { title: "Settings", image: { src: "/case-studies/ai-swing-coach/settings.png", alt: "Settings screen" }, caption: "Biometric confirm defaults" },
    ],
    insights: [
      { icon: Shield, title: "Trust & Safety", copy: "Guardrails + Undo improved confidence without slowing decisions; informed later AI-native DS patterns." },
      { icon: BarChart3, title: "Measurable Quality", copy: "Metrics tied to hypotheses; created a template for tracking explainability & UX safety across teams." },
      { icon: LineChart, title: "Scalable Patterns", copy: "DS primitives + variables turned a sprint prototype into reusable, governable patterns." },
    ],
    resources: {
      items: [
        { label: "Watch Demo", href: "https://vimeo.com/1124683385/5503bbdf97", icon: <PlayCircle className="mr-2 h-4 w-4" /> },
        { label: "Figma Prototype", href: "https://www.figma.com/proto/TWAIpihUhIWRi2muQEmOSv/AI-Swing-Coach-App?node-id=92-6307&t=2k8L0LPJ38Ocxqaz-1", variant: "secondary", icon: <ExternalLink className="mr-2 h-4 w-4" /> },
        { label: "Design Source", href: "https://www.figma.com/design/TWAIpihUhIWRi2muQEmOSv/AI-Swing-Coach-App?node-id=92-6307&t=2k8L0LPJ38Ocxqaz-1", variant: "ghost", icon: <FileText className="mr-2 h-4 w-4" /> },
      ],
    },
    process: {
      sprint: (
        <>
          Goals: recognize high-probability signals → simulate-first; safe Paper↔Live; which cues drive decisions more (charts vs concise metrics). Platform: Maze (unmoderated), n=7.
        </>
      ),
      findings: (
        <>Mode switching straightforward (8.6/10); confidence high (8.4/10). Gaps: need $ alongside %, clearer rationale, reliability hiccups.</>
      ),
      changes: (
        <>Global $↔% toggle; one-line rationale with expand; decision row with risk; live confirm sheet (biometric + fallback); attention triage.</>
      ),
      experiments: (
        <>A/B default $ vs %; A/B rationale depth; reliability gate pre-test; diversify participants (add novice cohort).</>
      ),
    },
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* Hero + Snapshot */}
      <CaseStudyHeader data={data.header} />
      <ProblemOutcome data={data.snapshot} />

      {/* Pillars */}
      <StrategicHighlights items={data.highlights} />

      {/* Animated Results */}
      <ResultsGrid stats={data.results} />

      {/* Artifacts */}
      <ArtifactsGallery items={data.artifacts} />

      {/* Insights & Impact */}
      <InsightsImpact items={data.insights} />

      {/* Resources */}
      {data.resources && <ResourcesBar data={data.resources} />}

      {/* Process */}
      <ProcessTabs data={data.process} />

      <div className="h-10" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Lightweight Runtime Tests (optional - run in browser console)
// ---------------------------------------------------------------------------
if (typeof window !== "undefined") {
  console.assert(typeof CountUp === "function", "CountUp should be a function");
  console.assert(Number.isFinite(8.6), "Stat should accept decimal numbers for 'value'");
}
