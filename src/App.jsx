import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ShieldCheck, Sparkles, Cpu, Briefcase, Lightbulb, X, Linkedin, TrendingUp, Users2, BrainCircuit, MonitorSmartphone, ArrowRight} from "lucide-react";
import { Button } from "@/components/ui/button";
import Glow from "@/components/ui/glow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CASE_STUDIES_NEW, CaseStudyContent } from "./case-studies";
import CaseStudyBanner from "./components/case-study/CaseStudyBanner";
import { Section } from "@/components/ui/section.jsx";
import { ExperienceGridRow } from "./components/ui/experiencegridrow";

// helper to render images with a graceful fallback
function SafeImage({ src, alt, className }) {
  const [ok, setOk] = React.useState(Boolean(src));
  if (!ok || !src) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setOk(false)}
      className={className}
    />
  );
}

// === Generic Portfolio Content (Wealth • Health • Design Systems • A11y • Content) ===
const PROFILE = {
  name: "RAFAEL FLORES",
  title: "Product Designer & Design Leader",
  subtitle: "Build systems that scale. Ship products. Human-centered AI.",
  email: "ralf.flores@gmail.com",
  linkedin: "https://www.linkedin.com/in/flashflores/",
  summary: (
    <>
      I’m a hands-on systems designer and design leader who blends enterprise rigor with startup velocity. Over 15+ years across health, wealth/fintech, and insurance, I’ve helped teams modernize how they design and deliver while keeping people at the center.
      <p></p><br></br>
      I specialize in design systems, accessibility, and AI-assisted quality tooling. In parallel, I design AI-native workflows that keep humans in control, with explainability, uncertainty cues, and safe fallbacks that make complex decisions feel trustworthy.
      <p></p><br></br>
      <b>TL;DR:</b> I scale design quality and team health through systems, accessibility, and coaching—bridging the pace of startups with the reliability enterprises require.
      <br></br>
    </>
  ),
  highlights: [
    // IMPACT
    {
      label: "Quality & Velocity",
      icon: <TrendingUp className="h-5 w-5 text-current" />,
      caption: "reduced issues • faster handoffs",
      tone: "good",
    },
    {
      label: "Coaching & Team Health",
      icon: <Users2 className="h-5 w-5 text-current" />,
      caption: "mentorship • research cadence",
      tone: "info",
    },

    // FOCUS
    {
      label: "AI-Native UX",
      icon: <BrainCircuit className="h-5 w-5 text-current" />,
      caption: "explainability • uncertainty cues • safe fallbacks",
      tone: "info",
    },
    {
      label: "Platforms",
      icon: <MonitorSmartphone className="h-5 w-5 text-current" />,
      caption: "Web • iOS • Android parity via DS",
      tone: "info",
    },
  ],
};

export const CORE_GROUPS = [
  {
    title: "Systems & Scale",
    items: [
      "Design systems & theming (Tokens/Variables)",
      "Multi-brand, versioning/deprecation, release trains",
      "Platform parity: Web • iOS • Android",
    ],
  },
  {
    title: "AI & Quality",
    items: [
      "AI-native UX: explainability, uncertainty cues, fallbacks",
      "AI design ops: drift detection, linting, eval harnesses",
      "Prompt/policy ops and telemetry for model health",
    ],
  },
  {
    title: "Accessibility & Content",
    items: [
      "WCAG 2.2+ and semantic structure",
      "Privacy-by-design & inclusive copy standards",
      "Content governance: voice/tone, microcopy, release notes",
    ],
  },
  {
    title: "Design→Code Pipeline",
    items: [
      "Figma ↔ Storybook ↔ Zeroheight sync",
      "CI/visual regression & component stewardship",
      "Pattern libraries and adoption playbooks",
    ],
  },
  {
    title: "Research & Measurement",
    items: [
      "Study cadence; quant + qual synthesis",
      "A/B tests & telemetry for outcomes",
      "Centralized repo and lightweight ops",
    ],
  },
  {
    title: "Regulated Domains & Leadership",
    items: [
      "Fintech: money movement, statements",
      "Healthcare: member/clinical workflows",
      "Team leadership, coaching, quality gates",
    ],
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
    tags: ["AI", "Platform", "Ops"],
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

/** ===================== Core Strengths (Visual) ===================== **/
function StrengthsVisual() {
  const cards = [
    {
      title: "Systems & Scale",
      metric: "Defects ↓50%",
      tags: ["Tokens", "Multi-brand", "Release trains"],
      caption: "Design systems that keep code and design in sync across Web, iOS, Android.",
      proofHref: "#case-studies",
      Icon: TokensDiagram,
    },
    {
      title: "AI & Quality",
      metric: "Release predictability ↑",
      tags: ["Explainability", "Uncertainty cues", "Eval harnesses"],
      caption: "AI-native UX for users; AI-assisted checks for teams and CI.",
      proofHref: "#case-studies",
      Icon: HumanInLoopIcon,
    },
    {
      title: "A11y & Content",
      metric: "A11y debt ↓",
      tags: ["WCAG 2.2", "Semantic", "Governance"],
      caption: "Accessible patterns and copy standards baked into the system.",
      proofHref: "#case-studies",
      Icon: A11yContrastIcon,
    },
    {
      title: "Research & Measurement",
      metric: "App rating ↑ 2.2→4.2",
      tags: ["Study cadence", "A/B", "Telemetry"],
      caption: "Lightweight ops to turn research into measurable outcomes.",
      proofHref: "#case-studies",
      Icon: ResearchCadenceIcon,
    },
  ];

  return (
    <div className="rounded-2xl bg-card p-5 md:p-6">
      

      <section className="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-6">
        {cards.map((c) => (
          <StrengthCard key={c.title} {...c} />
        ))}
      </section>

      <footer className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Domains:</span>
        <Chip>Fintech</Chip>
        <Chip>Healthcare</Chip>
        <Chip>Enterprise SaaS</Chip>
        <span className="ml-3 font-medium text-foreground">Teams led:</span>
        <Chip>8 designers</Chip>
      </footer>
    </div>
  );
}

function StrengthCard({ title, metric, tags, caption, proofHref, Icon }) {
  return (
    <a
      href={proofHref}
      className="group relative block rounded-2xl bg-background p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      aria-label={`${title} — view proof`}
    >
      {/* Metric chip */}
      <div className="absolute right-4 top-4">
        <Chip intent="metric">{metric}</Chip>
      </div>

      {/* Icon */}
      <div className="mb-4 text-indigo-600 dark:text-indigo-300" aria-hidden="true">
        <Icon className="w-12 h-12" />
      </div>

      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-muted-foreground text-sm leading-6">{caption}</p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>

      {/* Footer link */}
      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-indigo-600">
        <span>View proof</span>
        <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </div>

      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-indigo-200"></div>
    </a>
  );
}

function Chip({ children, intent }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold leading-5 border";

  const styles =
    intent === "metric"
      ? // Success badge (emerald) — stable in sRGB; dark gets translucent bg
        "border-emerald-200 bg-emerald-50 text-emerald-700 " +
        "dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-300"
      : // Neutral tag (slate)
        "border-slate-200 bg-slate-100 text-slate-700 " +
        "dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200";

  return <span className={`${base} ${styles}`}>{children}</span>;
}

/* ===================== Icons / Mini-diagrams (pure SVG) ===================== */
function ArrowRightIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// TokensDiagram: stacked tokens → components → apps
function TokensDiagram({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>
      {/* Tokens row */}
      <rect x="4" y="6" width="12" height="8" rx="2" fill="url(#g1)" opacity=".85" />
      <rect x="20" y="6" width="12" height="8" rx="2" fill="#6366f1" opacity=".6" />
      <rect x="36" y="6" width="12" height="8" rx="2" fill="#22c55e" opacity=".6" />
      {/* Arrow */}
      <path d="M10 20h44" stroke="#94a3b8" strokeWidth="2" />
      <path d="M50 17l6 3-6 3" fill="#94a3b8" />
      {/* Components row */}
      <rect x="10" y="28" width="16" height="10" rx="2" fill="#e0e7ff" stroke="#6366f1" />
      <rect x="28" y="28" width="16" height="10" rx="2" fill="#dcfce7" stroke="#22c55e" />
      {/* Arrow */}
      <path d="M18 44h28" stroke="#94a3b8" strokeWidth="2" />
      <path d="M42 41l6 3-6 3" fill="#94a3b8" />
      {/* Apps */}
      <rect x="24" y="50" width="16" height="8" rx="2" fill="#f1f5f9" stroke="#94a3b8" />
    </svg>
  );
}

// Human-in-the-loop diagram: model ↔ reviewer with gate
function HumanInLoopIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      {/* Model */}
      <circle cx="16" cy="20" r="8" fill="#e0e7ff" stroke="#6366f1" />
      <text x="16" y="23" fontSize="8" textAnchor="middle" fill="#6366f1">M</text>
      {/* Human */}
      <circle cx="48" cy="20" r="8" fill="#dcfce7" stroke="#22c55e" />
      <text x="48" y="23" fontSize="8" textAnchor="middle" fill="#16a34a">H</text>
      {/* Bidirectional arrows */}
      <path d="M24 20h16" stroke="#94a3b8" strokeWidth="2" />
      <path d="M38 17l6 3-6 3M26 23l-6-3 6-3" fill="#94a3b8" />
      {/* Gate */}
      <rect x="28" y="36" width="8" height="8" rx="1.5" fill="#fef3c7" stroke="#f59e0b" />
      <path d="M20 40h8M36 40h8" stroke="#94a3b8" strokeWidth="2" />
      <text x="32" y="58" fontSize="7" fill="#64748b" textAnchor="middle">review gate</text>
    </svg>
  );
}

// A11y contrast icon: AA meter  semantic mark
function A11yContrastIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="6" y="10" width="52" height="12" rx="6" fill="#e2e8f0" />
      <rect x="6" y="10" width="34" height="12" rx="6" fill="#0f172a" />
      <text x="10" y="19" fontSize="8" fill="#fff">4.5:1</text>
      <text x="40" y="19" fontSize="8" fill="#0f172a">AA</text>
      {/* semantic brackets */}
      <path d="M16 36v16M48 36v16" stroke="#94a3b8" strokeWidth="2" />
      <text x="32" y="48" fontSize="7" textAnchor="middle" fill="#64748b">semantic</text>
    </svg>
  );
}

// Research cadence icon: calendar  sparkline
function ResearchCadenceIcon({ className }) {
  const dots = Array.from({ length: 9 }, (_, i) => {
    const col = i % 3;
    const row = (i / 3) | 0; // integer division
    return { cx: 16 + col * 12, cy: 30 + row * 8 };
  });

  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      {/* calendar ... */}
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="2" fill="#6366f1" opacity={0.6} />
      ))}
    </svg>
  );
}

// A teaser card for each case study
const CaseStudyCard = ({ cs }) => {
   const title = cs.header?.title || cs.title;
   const subtitle = cs.header?.subtitle || cs.subtitle;
   const summary = cs.snapshot?.problem || cs.summary;
   const tags = cs.tags || cs.header?.badges || [];
   return (
  <Card className="rounded-2xl shadow-sm h-full hover:shadow-md transition-shadow">
    <CardHeader>
      <CardTitle className="text-base">{title}</CardTitle>
       {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
       {Array.isArray(tags) && tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-3">
          {tags.map((t) => (
            <Pill key={t} variant="outline" size="sm">{t}</Pill>
          ))}
        </div>
      )}
      {summary && <p className="text-sm text-muted-foreground mt-1">{summary}</p>}
      
    </CardHeader>

    <CardContent>
      <Button
        variant="secondary"
        size="sm"
        className="cursor-pointer"
        asChild
      >
        <Link to={`/case-studies/${cs.slug}`} aria-label={`Read case study: ${cs.header?.title || cs.title}`}>
          Read case study
        </Link>
      </Button>
    </CardContent>
  </Card>
);}

// Lightweight modal (no extra libs)
const CaseStudyModal = ({ cs, onClose }) => {
  const dialogRef = useRef(null);
  // Keep only artifacts that actually have a src
  const validArtifacts = (cs.artifacts || []).filter(
    a => typeof a.src === "string" && a.src.trim() !== ""
  );
  useEffect(() => {
    // focus first focusable element
    const el = dialogRef.current;
    const focusables = el?.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && focusables?.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
  <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/50"
       role="dialog" aria-modal="true" aria-labelledby={`cs-${cs.slug}-title`}>
    <div ref={dialogRef} className="bg-background w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl m-4">
      <div className="p-6">
          {/* Sticky header keeps title + Close visible while scrolling */}
          <div className="sticky top-0 z-20 -mx-6 -mt-6 px-6 py-4
                          bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
                          border-b rounded-t-2xl flex items-start justify-between gap-4">
          <div>
            <h3 id={`cs-${cs.slug}-title`} className="text-xl font-semibold">{cs.title}</h3>
            <p className="text-sm text-muted-foreground">{cs.subtitle}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close"
            className="
              rounded-full
              text-zinc-500 hover:text-zinc-800
              hover:bg-zinc-100
              dark:text-zinc-400 dark:hover:text-zinc-100
              dark:hover:bg-zinc-800
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-zinc-300 dark:focus-visible:ring-zinc-700
              cursor-pointer
            "
          >
            <X className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </Button>

        </div>

        <CaseStudyContent cs={cs} />
      </div>
    </div>
  </div>
);
};

const Metric = ({ value, label, icon, caption, tone }) => {
  const isTuple = Array.isArray(value);

  const toneCls =
    tone === "good"
      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
      : tone === "warn"
      ? "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
      : tone === "info"
      ? "bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300"
      : "bg-muted text-foreground/90";

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6 flex items-center gap-4">
        {icon ? (
          <div className={`shrink-0 h-12 w-12 rounded-xl grid place-items-center ${toneCls}`} aria-hidden>
            {/* ensure icon has h-5 w-5 or similar */}
            {icon}
          </div>
        ) : (
          <div className="shrink-0">
            {isTuple ? (
              <>
                <div className="text-4xl font-semibold leading-tight">{value[0]}</div>
                <div className="text-2xl font-semibold leading-tight md:whitespace-nowrap">
                  {value[1]}
                </div>
              </>
            ) : (
              <div className="text-3xl font-semibold leading-none">{value}</div>
            )}
          </div>
        )}

        <div className="min-w-0">
          <div className="text-sm font-medium leading-tight">{label}</div>
          {caption ? (
            <div className="text-xs text-muted-foreground mt-0.5">{caption}</div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

const ProjectCard = ({ p }) => (
  <Card className="rounded-2xl shadow-sm h-full hover:shadow-md transition-shadow pb-4">
    <CardHeader>
      <CardTitle className="text-base">{p.title}</CardTitle>
      {Array.isArray(p.tags) && p.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-3">
          {p.tags.map((t) => (
            <Pill key={t} variant="outline" size="sm">{t}</Pill>
          ))}
        </div>
      )}
      {p.summary && <p className="text-sm text-muted-foreground mt-1">{p.summary}</p>}
      
    </CardHeader>
  </Card>
);

function LightboxModal({ open, src, alt, onClose }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      <img
        src={src}
        alt={alt || ""}
        loading="lazy" decoding="async"
        className="max-h-[85vh] max-w-[92vw] rounded-xl shadow-2xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default function Portfolio() {
  const [lightbox, setLightbox] = useState({ open: false, src: "", alt: "" });
  const openAsset  = (src, alt) => setLightbox({ open: true, src, alt });
  const closeAsset = () => setLightbox(s => ({ ...s, open: false }));
  const [activeCS, setActiveCS] = useState(null);

  // Optional deep link: open modal if URL has #cs=slug
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const slug = params.get("cs");
    if (slug) {
      const match = CASE_STUDIES_NEW.find(c => c.slug === slug);
      if (match) setActiveCS(match);
    }
  }, []);

  const openCaseStudy = (cs) => {
    setActiveCS(cs);
    document.body.style.overflow = "hidden";
    const params = new URLSearchParams(window.location.hash.slice(1));
    params.set("cs", cs.slug);
    window.history.replaceState(null, "", `#${params.toString()}`);
  };

  const closeCaseStudy = () => {
    setActiveCS(null);
    document.body.style.overflow = "";
    const params = new URLSearchParams(window.location.hash.slice(1));
    params.delete("cs");
    const suffix = params.toString();
    window.history.replaceState(null, "", suffix ? `#${suffix}` : "#");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      <main className="rf-container">
        {/* Intro */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
              {PROFILE.title}
            </h1>

            {PROFILE.subtitle && (
              <div className="text-xl sm:text-2xl font-semibold tracking-tight mt-1.5 sm:mt-2 text-foreground">
                {PROFILE.subtitle}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              <Pill variant="primary" size="sm" icon={Sparkles}>Design Systems</Pill>
              <Pill variant="soft" size="sm" icon={Cpu}>AI Strategy</Pill>
              <Pill variant="outline" size="sm" icon={ShieldCheck}>A11y & Content</Pill>
            </div>

            <div className="text-muted-foreground max-w-3xl mt-3 sm:mt-4 pt-4">
              {PROFILE.summary}
            </div>
            
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
            {PROFILE.highlights.map((m) => (
              <Metric key={m.label} {...m} />
            ))}
          </div>
        </section>

        <Separator />
        
        {/* Core Strengths (Visual) */}
        <Section
          id="strengths"
          title="Core Strengths"
          subtitle="I help teams ship faster and smarter by designing systems that connect craft, quality, and data."
          icon={
            <Glow>
              <Sparkles className="h-6 w-6 text-zinc-900 dark:text-zinc-100" aria-hidden="true" />
            </Glow>
          }
        >
          <StrengthsVisual />
        </Section>

        <Separator />
        
        {/* Case Studies */}
        <Section
          id="case-studies"
          title="Case Studies"
          subtitle="Selected Work: From Systems to Strategy"
          icon={<Glow><Lightbulb className="h-6 w-6 text-zinc-900 dark:text-zinc-100" aria-hidden="true" /></Glow>}
        >
          <ol className="space-y-4">
            {CASE_STUDIES_NEW.slice(0, 3).map((cs) => (
              <li key={cs.slug}>
                <CaseStudyBanner cs={cs} />
              </li>
            ))}
          </ol>
        </Section>
      
        {/* Lightbox + Modal mounts */}
        <LightboxModal open={lightbox.open} src={lightbox.src} alt={lightbox.alt} onClose={closeAsset} />
        {activeCS && <CaseStudyModal cs={activeCS} onClose={closeCaseStudy} />}
        
         <Separator />

        {/* Experience */}
        <Section id="experience" title="Experience" icon={<Glow><Briefcase className="h-6 w-6 text-zinc-900 dark:text-zinc-100" aria-hidden="true" /></Glow> }>
          {/* Impact grid: logo · title · domain · one metric · dates */}
          <ul className="divide-y divide-[color:rgba(226,232,240,.9)] bg-background">
            
            {/* Alight Solutions */}
            <ExperienceGridRow
              logo="/logos/alight.png"
              company="Alight Solutions"
              role="Product Design Director"
              context="Scaled design systems & a11y for enterprise HR SaaS"
              metrics="Late-stage defects ↓50% · Lead time ↓30% · Design system adoption ↑ org-wide"
              influence="Led 8-person design org; partnered with FE to operationalize tokens; established A11y governance and design ops"
              dates="2020–2025"
            />
           
            <ExperienceGridRow
              logo="/logos/bmo.png"
              company="BMO Financial Group"
              role="User Experience Team Lead"
              context="Money movement & servicing (mobile)"
              metrics="App rating ↑ 2.2 → 4.2 · Friction in key flows ↓"
              influence="Led 2 designers across 2 agile pods while acting as senior IC; instituted design reviews and research cadence with PM/Eng"
              dates="2019–2020"
            />

            <ExperienceGridRow
              logo="/logos/walgreens.png"
              company="Walgreens"
              role="Senior Mobile Product/Interaction Designer (Contract)"
              context="Checkout and service flows for consumer health & retail"
              metrics="Shared standards/components → delivery predictability ↑; QA issues ↓"
              influence="Worked across multiple flows; partnered with PM/Eng; formalized specs and redlines to streamline handoff"
              dates="2018–2019"
            />

            <ExperienceGridRow
              logo="/logos/hyatt.png"
              company="Hyatt"
              role="Lead Mobile Product Designer (Contract)"
              context="Booking, loyalty, and trip management"
              metrics="Conversion and engagement ↑ via flow optimizations"
              influence="Led optimization and new features; collaborated with brand/loyalty and research; produced journey maps and competitive analysis to inform roadmap"
              dates="2017–2018"
            />
          </ul>
          <div className="mt-4">
            <Button
              asChild
              variant="ghost"
              className="
                group inline-flex items-center gap-2
                h-auto p-0
                text-sm font-medium text-indigo-600
                hover:text-indigo-700 hover:bg-transparent
                focus-visible:ring-2 focus-visible:ring-indigo-500
              "
            >
              <a href="/RafaelFlores-Resume.pdf" target="_blank" rel="noopener">
                <span>View full resume</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform translate-x-0 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </Button>
          </div>
        </Section>
        
        

        {/* Projects */}
        {/*
        <Separator />
        <Section 
          id="projects" 
          title="Other Projects" 
          subtitle="Wealth • Health • Systems • A11y • Content"
          icon={<Glow><Cpu className="h-6 w-6 text-zinc-900 dark:text-zinc-100" aria-hidden="true" /></Glow>}>
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
        </Section>*/}
            
      </main>
    </div>
  );
}
