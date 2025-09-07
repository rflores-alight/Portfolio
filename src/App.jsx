import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Download, ShieldCheck, Layers, Sparkles, Cpu, Briefcase, Calendar, Lightbulb, X, Linkedin} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Artifact from "@/components/Artifact";

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
  name: "Rafael Flores",
  title: "Director of Product Design",
  subtitle: "AI, Platforms & Design Systems",
  email: "ralf.flores@gmail.com",
  linkedin: "https://www.linkedin.com/in/flashflores/",
  summary: (
    <>
      I lead teams that turn complex, regulated workflows into trustworthy, measurable experiences across Web/iOS/Android. I’ve merged legacy systems, embedded accessibility and content standards, and used AI to raise craft without slowing teams - <strong>late-stage defects ↓50%</strong>, <strong>design→dev lead time ↓30%</strong>, <strong>component adoption ~50%</strong>. Current work spans AI-assisted quality tooling (drift detection, linting, internal DS chatbot) and DS modernization (tokens/Variables, release trains).
    </>
  ),
  highlights: [
    { label: "Designers coached", value: "20" },
    { label: "Late‑stage defects", value: "↓ 50%" },
    { label: "DS component adoption", value: "~50%" },
    { label: "Design→Dev lead time", value: "↓ 30%" },
    { label: "Research cadence", value: ["2", "studies/quarter"] },
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
    //role: "Product Design Director — Design Systems & Accessibility",
    roleTitle: "Product Design Director",
    roleSub: "Design Systems & A11y",
    period: "2021 – Aug 2025 • Remote",
    bullets: [
      "AI strategy: LLM drift detection in Slack/design guidance; internal dev chatbot; Figma plugin to lint tokens/variants & accessibility rules.",
      "Owned end‑to‑end design & a11y; aligned discovery with PMs.",
      "Scaled a cross‑platform Design System (tokens/Variables, versioning/deprecation, release trains) aligned to Figma ↔ Storybook ↔ Zeroheight with CI & visual regression.",
      "Standardized states for trust‑critical flows (accounts, contributions, payouts, statements); embedded WCAG 2.1/2.2; late‑stage defects ↓50%.",
      "Instrumented CSAT/NPS, adoption, error/defect rate, time‑to‑merge; maintained a delivery calendar aligned to release trains.",
      "Partnered with Product, Engineering & BA counterparts; design→dev lead time ↓30%; component adoption ~50%.",
      "Content governance: voice/tone, microcopy & disclosure patterns; release notes & migration guides in DS.",
    ],
    tags: ["AI", "Design Systems", "Accessibility", "Content"],
  },
  {
    company: "BMO Financial Group",
    roleTitle: "User Experience Team Lead",
    period: "Jan 2019 – Nov 2020 • Chicago",
    bullets: [
      "Led cross-functional UX for retail & business banking across Web/iOS/Android; owned experience architecture for money movement and servicing.",
      "Owned experience architecture for money movement & servicing; facilitated vision workshops/design sprints.",
      "Established design‑system governance (tokens/Variables, content & accessibility guidelines); partnered with engineering on component APIs & quality gates.",
      "Shipped unified patterns for limits, error/recovery, and review/undo in high-trust flows.",
      "Contributed to raising the mobile app rating from ~2.2 → ~4.2 on the app stores.",
    ],
    tags: ["Wealth", "Banking", "Design Systems"],
  },
  {
    company: "Walgreens (Contract)",
    roleTitle: "Senior Product/Interaction Designer",
    period: "Feb 2018 – Dec 2018 • Chicago",
    bullets: [
      "Drove mobile standards and engineering rituals to raise delivery quality & speed for consumer health/retail experiences.",
      "Established patterns and review cadences that reduced rework and improved consistency across iOS/Android.",
      "Partnered closely with engineering to harden component APIs and acceptance criteria.",
    ],
    tags: ["Health", "Mobile"],
  },
  {
    company: "Earlier Roles",
    roleTitle: "UX & Engineering",
    period: "—",
    bullets: [
      "Hyatt (Lead Mobile Product Designer).",
      "Manifest (Sr Experience Designer).",
      "InnerWorkings (Lead UX).",
      "TandemSeven (UX) — wealth clients incl. Goldman Sachs & JPMorgan.",
      "American College of Surgeons: clinician‑facing data workflows (NCDB).",
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

// === Case Studies (story-first) ===
const CASE_STUDIES = [
  {
    slug: "wealth-ds-ops",
    title: "Cutting late-stage defects with Design System guardrails",
    subtitle: "Wealth • Design Systems • A11y",
    summary:
      "We reduced late-stage defects ~50% in a regulated benadmin platform by instrumenting DS guardrails, a11y, and a sprint cadence.",
    tags: ["Wealth", "Design Systems", "A11y"],
    hero: "/case-studies/wealth-hero.png", // put images in /public/case-studies
    context: {
      role: "Director, Product Design",
      team: "4 designers, 3 FE engineers",
      timeframe: "6 months",
      constraints: [
        "Regulatory/compliance requirements",
        "Legacy component library + multiple codebases",
        "Aggressive PI"
      ],
    },
    problem:
      "Inconsistent component usage and missed a11y checks were creating late-stage defects and rework.",
    approach: [
      "Mapped failure points from retro + defect logs; converted backlog stories.",
      "Scaled DS components/patterns, versioning & deprecation; created migration guides.",
      "Introduced a11y and CI checks; added visual regression gating.",
      "Published change notes and microcopy standards in DS site."
    ],
    built: [
      "Figma ↔ Storybook ↔ Zeroheight pipeline with CI quality gates.",
      "Lint plugin for browser and figma (design + code).",
      "Agile team with ceremonies."
    ],
    metrics: [
      { label: "Late-stage defects", before: "—", after: "↓ 50%" },
      { label: "Design→Dev lead time", before: "—", after: "↓ 30%" },
      { label: "DS component adoption", before: "—", after: "~ 50%" },
    ],
    artifacts: [
      { src: "/case-studies/drift-dashboard.png", caption: "Drift detection dashboard in Slack" },
      { src: "/case-studies/slackbot-arch.png", caption: "High-level architecture" },
    ],
    quote: {
      text: "We ship more predictably and with fewer rollbacks.",
      author: "Eng Director"
    },
    lessons: [
      "Ship more predictably and with fewer rollbacks.",
      "Dashboards beat docs for changing behavior."
    ]
  },

  {
    slug: "automation-tradingview-aws-alpaca",
    title: "Automation Platform: TradingView → AWS → Alpaca",
    subtitle: "Wealth • Automation • Ops",
    summary:
      "Serverless webhooks + job runner with simulate/paper/live modes, feature flags, kill-switch, audit logs, and alerting—operational guardrails for finance workflows.",
    tags: ["Wealth", "Automation", "Ops"],
    hero: "/case-studies/automation-hero.png",
    context: {
      role: "Product Design Director / Builder",
      team: "Solo",
      timeframe: "4 months",
      constraints: [
        "3rd-party API limits & reliability",
        "Need for safe non-production modes",
        "Operational risk & observability"
      ],
    },
    problem:
      "Manual trade execution and ad-hoc scripts were brittle, lacked guardrails, and slowed experimentation; rollbacks were risky.",
    approach: [
      "Designed end-to-end flow: TradingView alerts → API Gateway → Lambda jobs → Alpaca APIs.",
      "Created simulate/paper/live modes with feature flags, env separation, and a global kill-switch.",
      "Added auditing (request/response), idempotency keys, retries, and alerting (SNS).",
      "Documented runbooks, failure modes, and rate-limit handling; added smoke tests."
    ],
    built: [
      "Serverless architecture (API Gateway, Lambda, DynamoDB queue, Step-Functions-style orchestration).",
      "Ops console: job history, status, and replay with guardrails.",
      "Alerting + dashboards; structured logs for traceability."
    ],
    metrics: [
      { label: "Rollback time", after: "→ instant via kill-switch" },
      { label: "Execution safety", after: "simulate/paper/live modes reduce risk" },
      { label: "Operational visibility", after: "full audit & alerts" },
    ],
    artifacts: [
      { src: "/case-studies/automation-arch.png", caption: "High-level architecture & data flow" },
      { src: "/case-studies/ops-console.svg", caption: "Ops console mockup with job history & replay" },
    ],
    quote: {
      text: "This takes the emotions out of live trading.",
      author: "Me"
    },
    lessons: [
      "Takes the emotions out of live trading.",
      "Treat observability as a product feature, not a dev nicety."
    ]
  },
  {
    slug: "bmo-design-strategy",
    title: "Design Strategy & Innovation: Raising Mobile Quality at BMO",
    subtitle: "Wealth • Money Movement • Design Strategy",
    summary:
      "Led UX for money-movement & servicing; research-backed sprints and DS governance improved quality and app ratings.",
    tags: ["Wealth", "Banking", "Design Systems"],
    hero: "/case-studies/bmo-hero.png",
    context: {
      role: "User Experience Team Lead",
      team: "Cross-functional UX with 2 ICs; partnered closely with PM & Eng",
      timeframe: "2019–2020",
      constraints: [
        "Regulatory/compliance requirements",
        "Multiple platforms (Web/iOS/Android)",
        "Legacy patterns/components"
      ]
    },
    problem:
      "Inconsistent patterns and unclear content in high-trust flows (money movement, servicing) created friction and contributed to poor mobile ratings.",
    approach: [
      "Vision workshops and design sprints with research to align on a North Star and test quickly.",
      "Mapped end-to-end journeys and failure modes; clarified disclosures and trust-critical content.",
      "Established design-system governance (tokens/Variables) and a11y standards; partnered with engineering on component APIs and quality gates.",
      "Set a recurring review cadence across PM/Design/Eng to keep quality bars visible."
    ],
    built: [
      "Unified money-movement patterns (limits, error/recovery, review/undo).",
      "Content standards and microcopy for trust-critical moments.",
      "Design-system guardrails and contribution model; migration guides.",
      "Mobile standards across iOS/Android; cross-surface coherence."
    ],
    metrics: [
      { label: "Mobile app rating", after: "↑ 2.2 → 4.2" }
    ],
    artifacts: [
      { src: "/case-studies/bmo-journey-map.png", caption: "Journey map, omnichannel" },
      {
        src: "/case-studies/bmo-2up-combined.png",
        caption: "Account summary + transfer flow"
      }
    ],
    lessons: [
      "Research-backed content is as critical as UI for money movement.",
      "Design-system guardrails accelerate consistency without slowing teams."
    ]
  },
  {
    slug: "global-collab-research",
    title: "Culture & Collaborative Software",
    subtitle: "Global user research comparing two organizations",
    summary:
      "Mixed-methods study—on-site observations, interviews, and Hofstede’s VSM08—to understand how culture shapes the way teams adopt and adapt collaboration tools.",
    tags: ["Research", "Culture", "Collaboration"],
    hero: "/case-studies/collab-hero.png", // optional cover image
    context: {
      role: "Lead Researcher (Graduate)",
      team: "Solo with faculty advisement",
      timeframe: "One semester",
      constraints: [
        "Small N (two orgs; two employees each)",
        "Cross-cultural sensitivity & confidentiality"
      ],
    },
    problem:
      "Organizations with different cultures were adopting the same collaboration platforms, but outcomes varied. We needed to understand how cultural values influenced collaboration norms, tool configuration, and practices.",
    approach: [
      "Planned a mixed-methods study and obtained consent/approvals.",
      "Conducted contextual observation in two organizations; interviewed two employees at each (semi-structured).",
      "Administered Hofstede’s VSM08 survey; scored cultural dimensions to compare orgs.",
      "Coded interview transcripts; triangulated qualitative themes with VSM08 scores.",
      "Synthesized implications for adapting collaborative software to local norms."
    ],
    built: [
      "Study protocol & interview guide",
      "VSM08 survey administration & scoring workbook",
      "Affinity map & coded themes",
      "Recommendations for configuration, onboarding, and governance"
    ],
    // optional: no quantitative product metrics for this academic study
    artifacts: [
      
    ],
    resources: [
      { label: "Collaborative Technologies Presentation", href: "/case-studies/HCI514CollaborativeTechnologies.pdf" },
      { label: "Collaborative Technologies Paper",       href: "/case-studies/CollaborativeTechnologiesFinal.pdf" }
    ],
    lessons: [
      "Tools reflect and reinforce local cultural norms—configure, don’t copy-paste practices.",
      "Pair platform rollouts with culture-aware onboarding and governance.",
      "Quant (VSM08) + qual (interviews/observation) yields more actionable guidance than either alone."
    ]
  },
  {
  slug: "curb-appeal",
  title: "Curb Appeal — Street Food Finder (Graduate Project)",
  subtitle: "Marketplace • Mobile • Research-first",
  summary:
    "A research-driven mobile concept that helps people discover nearby food trucks and helps vendors communicate location, hours, and menus.",
  tags: ["Early Work", "Research", "Mobile", "Marketplace"],
  hero: "/case-studies/curb-appeal-hero.png",
  context: {
    role: "Research lead & Interaction designer",
    team: "4 grad students",
    timeframe: "6 weeks"
  },
  problem:
    "Discovery was fragmented: patrons couldn’t reliably find who was nearby and open; vendors lacked simple ways to signal location and availability.",
  approach: [
    "Semi-structured interviews with patrons and vendors + an online survey",
    "Competitive scan of early food-truck apps to identify gaps",
    "Requirements → personas → conceptual models → group sketches/wireframes",
    "Prototype to test discover → evaluate → navigate"
  ],
  built: [
    "Mobile IA with availability cues (open/closed, hours, location confidence)",
    "Detail view with concise content (menu preview, distance, ETA)",
    "Map hand-off for ‘navigate to truck’"
  ],
  // keep metrics out (academic project); the modal hides this if empty
  metrics: [],
  artifacts: [
  ],
  resources: [
    { label: "Prototype (Vimeo)", href: "https://vimeo.com/24522436" }
  ],
  lessons: [
    "Clarity wins: Real-time open/closed, last updated location, and wait time build trust on both sides.",
    "Loop, don’t leap: Weekly 5-user tests + field intercepts beat assumptions and directly refine requirements.",
    "Design the decision: Prototype the discover → evaluate → navigate path so users can choose fast and confidently."
  ]
}
];

// KPI row used inside the modal
const Kpi = ({ label, after }) => (
  <div className="rounded-xl bg-muted/40 ring-1 ring-foreground/10 px-4 py-3">
    <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
    <div className="text-lg font-semibold">{after}</div>
  </div>
);

// A teaser card for each case study
const CaseStudyCard = ({ cs, onOpenModal }) => (
  <Card className="rounded-2xl shadow-sm h-full">
    <CardHeader>
      <CardTitle className="text-base">{cs.title}</CardTitle>
      <p className="text-sm text-muted-foreground mt-1">{cs.summary}</p>
    </CardHeader>

    <CardContent>
      <Button
        variant="secondary"
        size="sm"
        className="cursor-pointer"
        onClick={() => onOpenModal(cs)}
      >
        Read case study
      </Button>
    </CardContent>
  </Card>
);

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
            aria-label="Close case study dialog"
            className="rounded-full ring-1 ring-foreground/10 hover:ring-foreground/20 cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Close</span>Close
          </Button>
        </div>

        {cs.hero ? (
          <SafeImage
            src={cs.hero}
            alt={`${cs.title} — hero`}
            className="mt-4 rounded-xl ring-1 ring-foreground/10"
          />
        ) : null}

        {/* Context */}
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <Kpi label="Role"   after={cs.context.role} />
          <Kpi label="Team"   after={cs.context.team} />
          <Kpi label="Timeframe" after={cs.context.timeframe} />
        </div>

        {/* Problem */}
        <div className="mt-6">
          <h4 className="font-semibold">Problem</h4>
          <p className="text-sm text-muted-foreground mt-1">{cs.problem}</p>
        </div>

        {/* Approach */}
        <div className="mt-6">
          <h4 className="font-semibold">Approach</h4>
          <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc pl-5">
            {cs.approach.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>

        {/* What we built */}
        <div className="mt-6">
          <h4 className="font-semibold">What we built</h4>
          <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc pl-5">
            {cs.built.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>

        {/* Metrics */}
        {cs.metrics?.length ? (
          <div className="mt-6">
            <h4 className="font-semibold">Impact</h4>
            <div className="mt-2 grid sm:grid-cols-3 gap-3">
              {cs.metrics.map((m, i) => <Kpi key={i} label={m.label} after={m.after} />)}
            </div>
          </div>
        ) : null}

        {/* Artifacts (only if we have valid images) */}
        {validArtifacts.length > 0 ? (
          <div className="mt-6">
            <h4 className="font-semibold">Artifacts</h4>
            <div className="mt-2 grid sm:grid-cols-2 gap-3">
              {validArtifacts.map((a, i) => (
                <figure
                  key={i}
                  className="rounded-xl overflow-hidden ring-1 ring-foreground/10"
                >
                  <div
                    className="relative bg-muted/20 aspect-[4/3] sm:aspect-[16/10] rounded-lg"
                    // If you don't have Tailwind aspect-ratio plugin, uncomment:
                    // style={!a.aspect ? { aspectRatio: "4 / 3" } : undefined}
                  >
                    <img
                      src={a.src}
                      alt={a.caption || ""}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-contain p-2"
                      onError={(e) => {
                        // Hide the figure if the image can't load
                        const fig = e.currentTarget.closest("figure");
                        if (fig) fig.style.display = "none";
                      }}
                    />
                  </div>
                  <figcaption className="text-xs text-muted-foreground p-2">
                    {a.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : null}

        {/* Resources / Links */}
        {cs.resources?.length ? (
          <div className="mt-6">
            <h4 className="font-semibold">Resources</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {cs.resources.map((r, i) => (
                <Button
                  key={i}
                  variant="secondary"
                  asChild
                  className="cursor-pointer"
                >
                  <a href={r.href} target="_blank" rel="noopener noreferrer">
                    {r.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        ) : null}

        {/* Lessons */}
        {cs.lessons?.length ? (
          <div className="mt-6">
            <h4 className="font-semibold">Lessons / Next</h4>
            <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5 space-y-1">
              {cs.lessons.map((l, i) => <li key={i}>{l}</li>)}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  </div>
);
};
const Section = ({ id, title, subtitle, icon, children }) => (
  <section id={id} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="flex items-start gap-3 mb-6">
      {/* Icon wrapper keeps a consistent size + subtle vertical nudge */}
      <div className="shrink-0 mt-0.5">
        {React.cloneElement(icon, { className: "h-7 w-7 text-primary" })}
      </div>
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

const Metric = ({ value, label }) => {
  const isTuple = Array.isArray(value);
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6">
        {isTuple ? (
          <>
            <div className="text-4xl font-semibold leading-tight">{value[0]}</div>
            <div className="text-2xl font-semibold leading-tight md:whitespace-nowrap">
              {value[1]}
            </div>
          </>
        ) : (
          <div className="text-3xl font-semibold mb-1">{value}</div>
        )}
        <div className="text-sm text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
};

const RoleChip = ({ title, sub, className = "" }) => (
  <>
    {/* Desktop/tablet: small content-hugging pill on the right */}
    <div
      className={`hidden sm:inline-flex flex-col items-start w-fit
                  rounded-full border bg-muted/40 px-4 py-2 text-sm leading-tight
                  text-foreground ${className}`}
    >
      <span className="font-medium">{title}</span>
      {sub ? <span className="text-muted-foreground">{sub}</span> : null}
    </div>

    {/* Mobile: show the same pill under the company name */}
    <div
      className="sm:hidden mt-2 inline-flex flex-col items-start w-fit
                 rounded-full border bg-muted/40 px-4 py-2 text-sm leading-tight
                 text-foreground"
    >
      <span className="font-medium">{title}</span>
      {sub ? <span className="text-muted-foreground">{sub}</span> : null}
    </div>
  </>
);


const RolePill = ({ title, sub }) => (
   <div className="inline-flex max-w-full flex-col rounded-full px-4 py-2
                   bg-background ring-1 ring-foreground/15 shadow-sm">
     <span className="text-sm font-semibold leading-tight text-foreground">
       {title}
     </span>
     {sub && (
       <span className="text-sm leading-tight text-muted-foreground">
         {sub}
       </span>
     )}
   </div>
 );

const ExperienceCard = ({ item }) => {
  const roleText = item.roleTitle
    ? `${item.roleTitle}${item.roleSub ? " — " + item.roleSub : ""}`
    : (item.role || "");

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between gap-3">
          <span className="font-semibold">{item.company}</span>
          {/* Desktop pill (soft) */}
          <Pill variant="soft" size="sm" className="hidden sm:inline-flex">
            <span className="flex flex-col items-start leading-tight">
              <span className="font-semibold">{item.roleTitle}</span>
              <span className="text-muted-foreground">{item.roleSub}</span>
            </span>
          </Pill>
        </CardTitle>

       

        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
          <Calendar size={16} />
          <span>{item.period}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {item.tags?.map((t) => (
            <Pill key={t} variant="outline" size="sm">{t}</Pill>
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
};


const ProjectCard = ({ p }) => (
  <Card className="rounded-2xl shadow-sm h-full">
    <CardHeader>
      <CardTitle className="text-base">{p.title}</CardTitle>
      <div className="flex gap-2 flex-wrap justify-left mt-2">
        {p.tags.map((t) => (
          <Pill key={t} variant="outline" size="sm">{t}</Pill>
        ))}
      </div>
    </CardHeader>
    <CardContent className="text-sm text-muted-foreground">
      {p.summary}
    </CardContent>
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
      const match = CASE_STUDIES.find(c => c.slug === slug);
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

            {PROFILE.subtitle && (
              <div className="text-xl sm:text-2xl font-semibold tracking-tight mt-1 sm:mt-2 text-foreground">
                {PROFILE.subtitle}
              </div>
            )}
            <p className="text-muted-foreground max-w-3xl mt-3 sm:mt-4">
              {PROFILE.summary}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Pill variant="primary" size="sm" icon={Sparkles}>Design Systems</Pill>
              <Pill variant="soft" size="sm" icon={Cpu}>AI Strategy</Pill>
              <Pill variant="outline" size="sm" icon={ShieldCheck}>A11y & Content</Pill>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
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
        
        {/* Case Studies */}
      <Section
          id="case-studies"
          title="Case Studies"
          subtitle="Deeper dives into Wealth, Health, Design Systems, A11y & Content"
          icon={<Lightbulb className="text-primary" />}
        >
        <div className="grid md:grid-cols-2 gap-5">
          {CASE_STUDIES.map(cs => (
            <CaseStudyCard
              key={cs.slug}
              cs={cs}
              onOpenModal={openCaseStudy}
            />
          ))}
        </div>
        </Section>
      
        {/* Lightbox + Modal mounts */}
        <LightboxModal open={lightbox.open} src={lightbox.src} alt={lightbox.alt} onClose={closeAsset} />
        {activeCS && <CaseStudyModal cs={activeCS} onClose={closeCaseStudy} />}
        
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
                  {/* Footer LinkedIn button (shows on all viewports) */}
                  <Button variant="secondary" size="icon" asChild>
                    <a href={PROFILE.linkedin}
                       target="_blank"
                       rel="noopener me"
                       aria-label="LinkedIn (opens in a new tab)">
                      <Linkedin className="h-6 w-6 text-[#0A66C2]" aria-hidden="true" />
                      <span className="sr-only">LinkedIn</span>
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
