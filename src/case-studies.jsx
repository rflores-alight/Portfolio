import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  PlayCircle,
  ExternalLink,
  SquareArrowOutUpRight,
  FileText,
  Brain,
  Layers,
  Rocket,
  Shield,
  BarChart3,
  LineChart,
  Compass,
  GitBranch,
  Users,
  Gauge,
  ClipboardList,
} from "lucide-react";

function RenderMaybeHtml({ value }) {
  if (value == null) return null;
  if (typeof value === "string") {
    return (
      <div
        className="prose prose-sm dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }
  return value; // already JSX/ReactNode
}

// --- Move your data here (copy from App.jsx) ---
export const CASE_STUDIES = [
  // ... paste the array you currently have in App.jsx ...
    {
        header: {
          title: "AI Swing Coach: Mobile Trading",
          subtitle: "AI UX • Fintech • Design Sprint • 5 days • Framing refinement in progress (Kellogg exec-ed)",
          role: "Product Designer",
          team: "IC (mock data)",
          scope: "5 iOS screens, DS prototype",
          tldr: "Designed and validated a simulate-first mobile trading flow that builds trust through explainability and safe reversibility.",
          hero: { type: "image", src: "/case-studies/ai-swing-coach/hero.png", alt: "AI Swing Coach hero" },
          banner: { type: "image", src: "/case-studies/ai-swing-coach/banner.png", alt: "AI Swing Coach hero" },
          badges: ["8.6/10 ease", "8.4/10 confidence", "0 switch errors", "In progress"],
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
            "Built an AI-native prototype with guardrails, explainability, and undo that increased confidence (8.4/10) and eliminated mode-switch errors. Currently refining packaging and GTM based on a structured product-strategy framework.",
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
          { title: "Signals", image: { src: "/case-studies/ai-swing-coach/Signals.png", alt: "Signals screen" }, caption: "Explainable cues, mini-charts" },
          { title: "Simulate", image: { src: "/case-studies/ai-swing-coach/Simulate.png", alt: "Simulate-first screen" }, caption: "Simulate-first, $↔% toggle" },
          { title: "Positions", image: { src: "/case-studies/ai-swing-coach/Positions.png", alt: "Positions screen" }, caption: "Attention triage, undo" },
          { title: "Alerts", image: { src: "/case-studies/ai-swing-coach/Alerts.png", alt: "Alerts screen" }, caption: "Actionable notifications" },
          { title: "Activity", image: { src: "/case-studies/ai-swing-coach/Activity.png", alt: "Activity screen" }, caption: "Activity and transaction audit" },
        ],
        insights: [
          { icon: Shield, title: "Trust & Safety", copy: "Guardrails + Undo improved confidence without slowing decisions; informed later AI-native DS patterns." },
          { icon: BarChart3, title: "Measurable Quality", copy: "Metrics tied to hypotheses; created a template for tracking explainability & UX safety across teams." },
          { icon: LineChart, title: "Scalable Patterns", copy: "DS primitives + variables turned a sprint prototype into reusable, governable patterns." },
          { icon: ClipboardList, title: "Product Framing", copy: "Discovery → UX acceptance → pricing/GTM now being formalized; updates will note deltas." },
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
              <b className="mt-0">Goals:</b>
              <ul>
                <li>Recognize high-probability signals → simulate-first.</li>
                <li>Safe Paper ↔ Live handoff.</li>
                <li>Identify which cues drive decisions more (charts vs. concise metrics).</li>
              </ul>

              <b>Current status:</b>
              <p className="text-muted-foreground">
                Framing updates in progress using a structured product-strategy approach
                (discovery → UX acceptance criteria → pricing/GTM). Results and artifacts
                 will note what changed.
              </p>
              
              <b>Platform:</b>
              <ul>
                <li>Maze (unmoderated), n = 7.</li>
              </ul>
            </>
          ),

          findings: (
            <>
              <ul>
                <li>Mode switching ease: <strong>8.6/10</strong>.</li>
                <li>Decision confidence: <strong>8.4/10</strong>.</li>
                <li>Gaps: show <strong>$ alongside %</strong>, add <strong>one-line rationale</strong>, address <strong>reliability hiccups</strong>.</li>
              </ul>
            </>
          ),

          changes: (
            <>
              <ul>
                <li>Global <strong>$ ↔ %</strong> toggle.</li>
                <li>One-line rationale with “expand for detail”.</li>
                <li>Decision row with explicit risk indicator.</li>
                <li>Live confirm sheet (biometric + fallback).</li>
                <li>Attention triage (focus users on highest-impact cues).</li>
              </ul>
            </>
          ),

          experiments: (
            <>
              <ul>
                <li>A/B: default state (<strong>$ vs. %</strong>).</li>
                <li>A/B: rationale depth (one-line vs. expanded default).</li>
                <li>Reliability gate pre-test before exposing Live.</li>
                <li>Diversify participants: add novice cohort.</li>
                <li className="text-muted-foreground">Next: pricing interviews + tiered packaging, then update store-safe copy.</li>
              </ul>
            </>
          ),
        },
        footerNotes: [
          // one unobtrusive line; brand mention is factual, not boastful
          "Methods currently informed by an executive-level product strategy course; updates will reflect changes to discovery, UX acceptance, pricing, and GTM."
        ]
      },
  
      {
        header: {
          title: "Cutting Late-Stage Defects with Design System Guardrails",
          subtitle: "BenAdmin • Design Systems • A11y • 6 months",
          role: "Director, Product Design",
          team: "4 Designers • 3 FE Engineers • Dedicated Agile Squad",
          scope: "Alight Worklife DS • CI guardrails • A11y automation",
          tldr: "Led the transformation from legacy systems to a governed, automated Design System (AWLDS), cutting late-stage defects 50% and reducing a11y issues by 95%.",
          hero: { type: "image", src: "/case-studies/alight/alight-hero.png", alt: "Alight Worklife Design System" },
          banner: { type: "image", src: "/case-studies/alight/banner.png", alt: "Alight Worklife Design System" },
          badges: ["↓ 50% defects", "↓ 95% a11y issues", "CI + DS automation"],
          ctas: [
            { label: "View AWLDS", href: "https://design.alight.com", icon: <SquareArrowOutUpRight className='mr-2 h-4 w-4' /> },
            { label: "Architecture Diagram", href: "/case-studies/slackbot-arch.png", variant: "secondary", icon: <GitBranch className='mr-2 h-4 w-4' /> },
          ],
        },

        snapshot: {
          problem:
            "Legacy systems (UPoint and Thrive) lacked documentation, a11y checks, and DS governance—causing late-stage defects and costly rework in a regulated benefits platform.",
          outcome:
            "Established Alight Worklife DS (AWLDS) with Figma→Storybook→Zeroheight pipelines, CI guardrails, and a11y automation—improving reliability and accelerating safe delivery.",
        },

        highlights: [
          { icon: Layers, label: "Systems Governance", copy: "Built the first unified AWLDS with versioning, migration guides, and CI gates across two legacy platforms." },
          { icon: Shield, label: "A11y & Quality Automation", copy: "Implemented automated a11y checks via GitHub Actions and Storybook tests; 95% reduction in issues on migrated pages." },
          { icon: Gauge, label: "Agile Transformation", copy: "Shifted from waterfall to a dedicated sprint cadence; established ceremonies, Jira workflows, and defect tracking dashboards." },
        ],

        results: [
          { label: "Late-Stage Defects", value: 50, suffix: "% ↓", hint: "Quarterly average reduction after AWLDS adoption" },
          { label: "A11y Issues", value: 95, suffix: "% ↓", hint: "On migrated pages compared to legacy DS" },
          { label: "Adoption", value: 50, suffix: "% ↑", hint: "Components transitioned to AWLDS" },
        ],

        artifacts: [
          { title: "Drift Dashboard", image: { src: "/case-studies/alight/drift-dashboard.png", alt: "Slack Drift Detection Dashboard" }, caption: "Automated Slack reports surfaced a11y and component drift in real time." },
          { title: "AWLDS Inspector", image: { src: "/case-studies/alight/AWLDSInspector.png", alt: "DS Conformance Inspector" }, caption: "Inspects html for AWLDS conformance." },
          { title: "Intake Process", image: { src: "/case-studies/alight/intakeprocess.png", alt: "Intake Process" }, caption: "A structured workflow to capture, prioritize, and manage requests for new components or updates." },
          { title: "UI Request", image: { src: "/case-studies/alight/componentrequest.png", alt: "Component Request Form" }, caption: "A standardized document used to request new UI elements." },
          { title: "Definition of Done", image: { src: "/case-studies/alight/dod.png", alt: "Definition of Done" }, caption: "Criteria that a product increment must meet for the team to consider it complete and ready for customers." },
        ],

        insights: [
          { icon: BarChart3, title: "Operational Quality", copy: "Automated DS guardrails and CI checks halved defect rates without slowing release cadence (biweekly)." },
          { icon: Brain, title: "Behavioral Change", copy: "Replacing manual audits with AI-based drift detection shifted teams from reactive QA to proactive prevention." },
          { icon: GitBranch, title: "Cross-Discipline Alignment", copy: "Close PM collaboration ensured DS backlog aligned with upcoming feature work for predictability." },
        ],

        resources: {
          items: [
            { label: "AWLDS Site", href: "https://design.alight.com", icon: <SquareArrowOutUpRight className='mr-2 h-4 w-4' /> },
            { label: "Architecture Diagram", href: "/case-studies/slackbot-arch.png", variant: "secondary", icon: <GitBranch className='mr-2 h-4 w-4' /> },
          ],
        },

        process: {
          sprint: (
            <>
              <h4 className="mt-0">Goal (Design System Modernization):</h4>
              <ul>
                <li>Consolidate legacy DS assets into one source of truth.</li>
                <li>Enforce CI + accessibility guardrails to prevent regressions.</li>
                <li>Reduce rework and defect rates across product teams.</li>
                <li>Align DS roadmap with the product backlog for predictable delivery.</li>
              </ul>
              <p className="text-sm text-gray-600">
                <strong>Outcome:</strong> ↓ rework, ↓ a11y rollbacks, ↑ DS adoption, faster release confidence.
              </p>
            </>
          ),

          findings: (
            <>
              <h4 className="mt-0">What We Discovered:</h4>
              <ul>
                <li>Inconsistent component usage; gaps and drift across teams.</li>
                <li>Missing/dated documentation slowed onboarding and reviews.</li>
                <li>Accessibility failures clustered late in QA → rollbacks + cost overruns.</li>
              </ul>
              <p className="text-sm text-gray-600">
                <strong>Evidence:</strong>PRs flagged for DS drift, a11y failures found in QA.
              </p>
            </>
          ),

          changes: (
            <>
              <h4 className="mt-0">What We Shipped:</h4>
              <ul>
                <li>Built <strong>AWLDS</strong> with versioned packages and migration guides.</li>
                <li>Added CI gates: automated lint checks, visual regression tests, Slack reporting.</li>
                <li>Transitioned teams to agile delivery cadences aligned to the DS roadmap.</li>
              </ul>
              <p className="text-sm text-gray-600">
                <strong>Impact:</strong> ↑ pre-commit catches, ↓ production defects, ↓ review cycle time, ↑ DS package adoption.
              </p>
            </>
          ),

          experiments: (
            <>
              <h4 className="mt-0">How We Validated:</h4>
              <ul>
                <li>Automated <strong>drift detection</strong> vs. manual audits (compare precision/recall + time saved).</li>
                <li>Quarterly <strong>defect-rate</strong> tracking to verify guardrail efficacy.</li>
                <li>Adoption monitoring via <strong>CI logs + dashboard analytics</strong> (install/use over time).</li>
              </ul>
              <p className="text-sm text-gray-600">
              </p>
            </>
          ),
        },

        quote: {
          text: "We ship more predictably and with fewer rollbacks.",
          author: "Engineering Director",
        },
      },
      
      {
      header: {
        title: "Design Strategy & Innovation: Raising Mobile Quality at BMO",
        subtitle: "Wealth • Money Movement • Design Strategy • 10 days",
        role: "UX Team Lead",
        team: "Cross-functional (2 ICs) + PM & Eng partners",
        scope: "Money movement flows • Mobile standards • DS governance",
        tldr: "Led UX strategy to unify high-trust flows and design-system governance, improving app quality and mobile ratings (↑2.2 → 4.2).",
        hero: { type: "image", src: "/case-studies/bmo/bmo-hero.png", alt: "BMO mobile app" },
        banner: { type: "image", src: "/case-studies/bmo/banner.png", alt: "BMO mobile app" },
        badges: ["↑2.2→4.2 rating", "10-day sprint", "A11y + DS alignment"],
        ctas: [
          { label: "Design source", href: "https://www.figma.com/design/0fwfVqe95OqaiEGgFVwbHT/UI-Transfers?node-id=0-654&t=2jESVCrRPepeLcDI-1", icon: <SquareArrowOutUpRight className="mr-2 h-4 w-4" /> },
        ],
      },

      snapshot: {
        problem:
          "Inconsistent patterns and unclear content in money movement and servicing flows reduced trust and contributed to low app ratings.",
        outcome:
          "Aligned design, product, and engineering on a unified money-movement system with governed patterns and trust-first content, raising app quality and consistency.",
      },

      highlights: [
        { icon: Compass, label: "Vision & Alignment", copy: "Facilitated workshops and sprints to align on a North Star for trust-critical flows." },
        { icon: Layers, label: "Design Systems", copy: "Established DS governance with tokens, variables, and component APIs to ensure scalability and a11y." },
        { icon: FileText, label: "Content Strategy", copy: "Standardized disclosures, error/recovery patterns, and microcopy for clarity and compliance." },
      ],

      results: [
        { label: "Mobile App Rating", value: 4.2, prefix: "↑", hint: "From 2.2 baseline after unified patterns rollout", decimals: 1 },
        { label: "Consistency Score", value: 95, suffix: "%", hint: "Cross-platform DS compliance (post-audit)" },
        { label: "Cycle Time", value: 10, suffix: " days", hint: "From sprint to validated prototypes" },
      ],

      artifacts: [
        
        { title: "Transfer", image: { src: "/case-studies/bmo/2.png", alt: "Start a transfer" }, caption: "Start a transfer" },
        { title: "Setup", image: { src: "/case-studies/bmo/3.png", alt: "Setup the transfer" }, caption: "Setup the transfer" },
        { title: "Date picker", image: { src: "/case-studies/bmo/4.png", alt: "Datepicker" }, caption: "Choose a date" },
        { title: "Preview", image: { src: "/case-studies/bmo/5.png", alt: "Preview" }, caption: "Preview a transfer" },
        { title: "Success", image: { src: "/case-studies/bmo/6.png", alt: "Success" }, caption: "Success confirmation" },
        
      ],

      insights: [
        { icon: Shield, title: "Trust Through Clarity", copy: "Microcopy and disclosure alignment proved as critical as UI polish for confidence in money movement." },
        { icon: GitBranch, title: "Governed Scale", copy: "Design-system guardrails enabled consistency and velocity without over-centralization." },
        { icon: Users, title: "Cross-functional Partnership", copy: "Recurring PM-Design-Eng reviews sustained visibility into quality bars and DS adoption." },
      ],

      resources: {
        items: [
          { label: "Design source", href: "https://www.figma.com/design/0fwfVqe95OqaiEGgFVwbHT/UI-Transfers?node-id=0-654&t=2jESVCrRPepeLcDI-1", icon: <SquareArrowOutUpRight className="mr-2 h-4 w-4" /> },
        ],
      },

      process: {
        sprint: (
          <>
            <h4 className="mt-0">Goals:</h4>
            <ul>
              <li>Align trust-critical content and pattern consistency across surfaces.</li>
              <li>Define the <strong>North Star</strong> experience for money movement.</li>
              <li>Establish a pragmatic <strong>DS governance model</strong> (tokens, reviews, ownership).</li>
            </ul>
            <p className="text-sm text-gray-600">
              <strong>Outcome:</strong> ↑ completion rate, ↑ perceived trust, ↓ support tickets, ↓ compliance defects.
            </p>
          </>
        ),

        findings: (
          <>
            <h4 className="mt-0">What We Learned:</h4>
            <ul>
              <li>Users trusted consistent, transparent steps; clear compliance copy reduced anxiety.</li>
              <li>Gaps: legacy components and copy drift across platforms created friction and risk.</li>
            </ul>
            <p className="text-sm text-gray-600">
              <strong>Evidence:</strong> step-completion drop-offs at variance points, copy inconsistencies flagged by compliance, parity audit results.
            </p>
          </>
        ),

        changes: (
          <>
            <h4 className="mt-0">What We Shipped:</h4>
            <ul>
              <li>Unified <strong>money-movement flows</strong> with shared decision points and disclosures.</li>
              <li>Established <strong>token-based DS rules</strong> (semantic tokens → component APIs).</li>
              <li>Codified <strong>content standards</strong> for disclosures, tone, and error states.</li>
              <li>Implemented <strong>a11y + quality gates</strong> in CI (lint, visual regression, copy checks).</li>
            </ul>
            <p className="text-sm text-gray-600">
              <strong>Impact:</strong> ↓ copy drift, ↓ variance defects, ↑ DS adoption, ↑ first-pass compliance clearance.
            </p>
          </>
        ),

        experiments: (
          <>
            <h4 className="mt-0">How We Validated:</h4>
            <ul>
              <li>Piloted cross-platform <strong>pattern-parity audits</strong> (web, iOS, Android).</li>
              <li>Tested <strong>disclosure vs. no-disclosure</strong> variants (trust/understanding vs. friction).</li>
              <li>Monitored <strong>app ratings</strong> and <strong>DS adoption</strong> in dashboards.</li>
            </ul>
            <p className="text-sm text-gray-600">
            </p>
          </>
        ),
      },
    },

    {
      slug: "automation-tradingview-aws-alpaca",
      title: "Automation Platform: TradingView → AWS → Alpaca",
      subtitle: "Wealth • Automation • Ops",
      summary:
        "Serverless webhooks + job runner with simulate/paper/live modes, feature flags, kill-switch, audit logs, and alerting—operational guardrails for finance workflows.",
      tags: ["Fintech", "Automation", "Ops"],
      hero: "/case-studies/automation-hero.png",
      context: {
        role: "Product Design Director / Builder",
        team: "Individual Contributor (IC)",
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
      slug: "global-collab-research",
      title: "Culture & Collaborative Software",
      subtitle: "Global user research comparing two organizations",
      summary:
        "Mixed-methods study—on-site observations, interviews, and Hofstede’s VSM08—to understand how culture shapes the way teams adopt and adapt collaboration tools.",
      tags: ["Research", "Culture", "Collaboration"],
      hero: "/case-studies/collab-hero.png", // optional cover image
      context: {
        role: "Lead Researcher (Graduate)",
        team: "Individual Contributor (IC) with faculty advisory",
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

function ProcessTabs({ process }) {
  const { sprint, findings, changes, experiments } = process || {};
  // Nothing to render if no panes exist
  if (!sprint && !findings && !changes && !experiments) return null;

  // Set a sensible default tab
  const defaultValue =
    (sprint && "sprint") ||
    (findings && "findings") ||
    (changes && "changes") ||
    "experiments";

  return (
    <div className="mt-10">
      <div className="mb-2">
        <h3 className="text-lg font-semibold">
          Process <span className="text-muted-foreground">(Optional Deep Dive)</span>
        </h3>
      </div>
      <Tabs defaultValue={defaultValue} className="w-full">
        <TabsList className="flex flex-wrap gap-1">
          {sprint && <TabsTrigger value="sprint">Design Sprint</TabsTrigger>}
          {findings && <TabsTrigger value="findings">Findings</TabsTrigger>}
          {changes && <TabsTrigger value="changes">Changes Shipped</TabsTrigger>}
          {experiments && (
            <TabsTrigger value="experiments">Next Experiments</TabsTrigger>
          )}
        </TabsList>

        {sprint && (
          <TabsContent value="sprint" className={`process-pane ${paneCls}`}>
            {sprint}
          </TabsContent>
        )}
        {findings && (
          <TabsContent value="findings" className={`process-pane ${paneCls}`}>
            {findings}
          </TabsContent>
        )}
        {changes && (
          <TabsContent value="changes" className={`process-pane ${paneCls}`}>
            {changes}
          </TabsContent>
        )}
        {experiments && (
          <TabsContent value="experiments" className={`process-pane ${paneCls}`}>
            {experiments}
          </TabsContent>
        )}
        {/* Scoped styles (work in any React env; not Next.js-specific) */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .process-pane ul{
                list-style: disc !important;
                padding-left: 1.25rem !important; /* pl-5 */
                margin: 0.25rem 0 0.5rem !important;
              }
              .process-pane ol{
                list-style: decimal !important;
                padding-left: 1.25rem !important;
                margin: 0.25rem 0 0.5rem !important;
              }
              .process-pane li{ margin-top: 0.25rem !important; }
              .process-pane h4{ margin-top: 0 !important; font-weight: 600; font-size: 1rem; }
            `,
          }}
        />
      </Tabs>
    </div>
  );
}

export function Kpi({ label, before, after, delta }) {
  return (
    <div className="rounded-lg p-3 ring-1 ring-foreground/10 bg-muted/10">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">
        {after}
        {typeof before !== "undefined" && (
          <span className="text-muted-foreground"> (was {before})</span>
        )}
      </div>
      {typeof delta !== "undefined" && (
        <div className={`text-xs ${delta >= 0 ? "text-green-600" : "text-red-600"}`}>
          {delta >= 0 ? "▲" : "▼"} {delta}
        </div>
      )}
    </div>
  );
}

Kpi.defaultProps = { before: undefined, delta: undefined };

// If you used SafeImage/Button previously, import them from wherever they live in your app
// or inline minimal fallbacks here:
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


export function CaseStudyContent({ cs }) {
  const validArtifacts = (cs.artifacts || [])
    .map(a => (a?.image?.src ? { src: a.image.src, caption: a.caption } : a))
    .filter(a => typeof a?.src === "string" && a.src.trim() !== "");
  return (
    <>
      {cs.hero ? (
        <SafeImage
          src={cs.hero}
          alt={`${cs.title} — hero`}
          className="mt-4 rounded-xl ring-1 ring-foreground/10"
        />
      ) : null}

      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        <Kpi label="Role" after={cs.context.role} />
        <Kpi label="Team" after={cs.context.team} />
        <Kpi label="Timeframe" after={cs.context.timeframe} />
      </div>

      <div className="mt-6">
        <h4 className="font-semibold">Problem</h4>
        <p className="text-sm text-muted-foreground mt-1">{cs.problem}</p>
      </div>

      {/* Process (new data model) */}
      {cs.process ? (
        <ProcessTabs key={`process-${cs.slug}`} process={cs.process} />
      ) : null}

      {cs.design_sprint ? (
        <div className="mt-6">
          <h4 className="font-semibold">Design Sprint</h4>
          <div className="mt-2 grid sm:grid-cols-3 gap-3">
            {cs.design_sprint.framing && <Kpi label="Framing" after={cs.design_sprint.framing} />}
            {cs.design_sprint.test_platform && <Kpi label="Test Platform" after={cs.design_sprint.test_platform} />}
            {cs.design_sprint.participants && <Kpi label="Participants" after={cs.design_sprint.participants} />}
          </div>
          {cs.design_sprint.goals?.length ? (
            <div className="mt-4">
              <div className="text-sm font-medium">Goals</div>
              <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5 space-y-1">
                {cs.design_sprint.goals.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </div>
          ) : null}
          {cs.design_sprint.key_findings?.length ? (
            <div className="mt-4">
              <div className="text-sm font-medium">Key Findings</div>
              <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5 space-y-1">
                {cs.design_sprint.key_findings.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          ) : null}
          {(cs.design_sprint.changes_shipped?.length || cs.design_sprint.next_experiments?.length) && (
            <div className="mt-4 grid sm:grid-cols-2 gap-6">
              {cs.design_sprint.changes_shipped?.length ? (
                <div>
                  <div className="text-sm font-medium">Changes Shipped</div>
                  <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5 space-y-1">
                    {cs.design_sprint.changes_shipped.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              ) : null}
              {cs.design_sprint.next_experiments?.length ? (
                <div>
                  <div className="text-sm font-medium">Next Experiments</div>
                  <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5 space-y-1">
                    {cs.design_sprint.next_experiments.map((n, i) => <li key={i}>{n}</li>)}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </div>
      ) : null}

      <div className="mt-6">
        <h4 className="font-semibold">Approach</h4>
        <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc pl-5">
          {cs.approach.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold">What We Built</h4>
        <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc pl-5">
          {cs.built.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>

      {cs.metrics?.length ? (
        <div className="mt-6">
          <h4 className="font-semibold">Impact</h4>
          <div className="mt-2 grid sm:grid-cols-3 gap-3">
            {cs.metrics.map((m, i) => (
              <Kpi key={i} label={m.label} before={m.before} after={m.after} delta={m.delta} />
            ))}
          </div>
        </div>
      ) : null}

      {validArtifacts.length > 0 ? (
        <div className="mt-6">
          <h4 className="font-semibold">Artifacts</h4>
          <div className="mt-2 grid sm:grid-cols-2 gap-3">
            {validArtifacts.map((a, i) => (
              <figure key={i} className="rounded-xl overflow-hidden ring-1 ring-foreground/10">
                <div className="relative bg-muted/20 aspect-[4/3] sm:aspect-[16/10] rounded-lg">
                  <img src={a.src} alt={a.caption || ""} loading="lazy" decoding="async"
                       className="absolute inset-0 h-full w-full object-contain p-2" />
                </div>
                <figcaption className="text-xs text-muted-foreground p-2">{a.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      ) : null}

      {cs.resources?.length ? (
        <div className="mt-6">
          <h4 className="font-semibold">Resources</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {cs.resources.map((r, i) => (
              <Button key={i} variant="secondary" asChild className="cursor-pointer">
                <a href={r.href} target="_blank" rel="noopener noreferrer">{r.label}</a>
              </Button>
            ))}
          </div>
        </div>
      ) : null}

      {cs.lessons?.length ? (
        <div className="mt-6">
          <h4 className="font-semibold">Key Takeaways</h4>
          <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5 space-y-1">
            {cs.lessons.map((l, i) => <li key={i}>{l}</li>)}
          </ul>
        </div>
      ) : null}
    </>
  );
}

const paneCls = [
  "pt-4 text-sm leading-6 text-foreground/90",
  "[&_p]:text-muted-foreground"
].join(" ");
 
//Add a generic mapper → new component data model (JS-safe)
function toNewCaseStudyModel(cs) {
  // --- helpers ---
  const first = (arr, n = 1) => (Array.isArray(arr) ? arr.slice(0, n) : []);
  const text = (v) => (typeof v === "string" ? v : "");
  const num = (v) => (typeof v === "number" ? v : Number(v));
  const parseScore = (s) => {
    // examples: "8.6/10 (n=7)", "100%", "5 days", "↓ 50%"
    if (!s || typeof s !== "string") return { value: null, suffix: "", decimals: 0 };
    const percent = s.match(/(-?\d+(?:\.\d+)?)\s*%/);
    if (percent) return { value: Number(percent[1]), suffix: "%", decimals: percent[1].includes(".") ? 1 : 0 };

    const xOfTen = s.match(/(-?\d+(?:\.\d+)?)\s*\/\s*10/);
    if (xOfTen) return { value: Number(xOfTen[1]), suffix: "/10", decimals: xOfTen[1].includes(".") ? 1 : 0 };

    const days = s.match(/(-?\d+(?:\.\d+)?)\s*days?/i);
    if (days) return { value: Number(days[1]), suffix: " days", decimals: 0 };

    // arrows like "↓ 50%" → return 50%
    const arrowPct = s.match(/[↑↓]\s*(-?\d+(?:\.\d+)?)\s*%/);
    if (arrowPct) return { value: Number(arrowPct[1]), suffix: "%", decimals: arrowPct[1].includes(".") ? 1 : 0 };

    const plainNum = s.match(/-?\d+(?:\.\d+)?/);
    return plainNum ? { value: Number(plainNum[0]), suffix: "", decimals: plainNum[0].includes(".") ? 1 : 0 } : { value: null, suffix: "", decimals: 0 };
  };

  const headerBadgesFromStudyResults = () => {
    const sr = Array.isArray(cs.study_results) ? cs.study_results : [];
    const interesting = sr
      .map((r) => {
        const { value, suffix, decimals } = parseScore(text(r.value));
        return value != null ? `${value}${suffix ? suffix : ""} ${r.label.toLowerCase().split(" ")[0]}` : null;
      })
      .filter(Boolean);
    return first(interesting, 3);
  };

  // Choose an icon per item (by label/href). Returns a Lucide component.
  const iconFor = (label = "", href = "") => {
    const l = label.toLowerCase();
    const h = (href || "").toLowerCase();
    if (l.includes("watch") || l.includes("demo") || h.includes("vimeo")) return PlayCircle;
    if (l.includes("figma") || l.includes("prototype")) return SquareArrowOutUpRight;
    if (l.includes("design source") || h.endsWith(".pdf")) return FileText;
    return ExternalLink;
  };

  const headerCTAs = () => {
    const items = Array.isArray(cs.resources) ? cs.resources : [];
    return items.map((r, i) => ({
      label: r.label,
      href: r.href,
      variant: i === 0 ? "default" : i === 1 ? "secondary" : "ghost",
      icon: iconFor(r.label, r.href), // <-- IMPORTANT
    }));
  };

  const resultsFromStudyAndMetrics = () => {
    const stats = [];
    // Prefer structured study_results → CountUp tiles
    if (Array.isArray(cs.study_results)) {
      cs.study_results.forEach((r) => {
        const { value, suffix, decimals } = parseScore(text(r.value));
        if (value != null) {
          stats.push({ label: r.label, value, suffix, decimals, hint: undefined });
        }
      });
    }
    // Optionally derive “Cycle time” from timeframe (e.g., “5 days (+ test)”)
    const timeframe = text(cs?.context?.timeframe || "");
    const tf = parseScore(timeframe);
    if (tf.value != null && !stats.find((s) => /cycle time/i.test(s.label))) {
      stats.push({ label: "Cycle time", value: tf.value, suffix: tf.suffix || " days", decimals: tf.decimals, hint: "From timeframe" });
    }
    return stats;
  };

  const artifacts = Array.isArray(cs.artifacts)
    ? cs.artifacts.map((a, idx) => ({
        title: a.caption ? a.caption.split(":")[0] : `Artifact ${idx + 1}`,
        image: { src: a.src, alt: a.caption || `${cs.title} artifact ${idx + 1}` },
        caption: a.caption,
      }))
    : [];

  const insights = first(Array.isArray(cs.lessons) ? cs.lessons : [], 3).map((l, i) => ({
    title: i === 0 ? "Key Insight" : i === 1 ? "Impact" : "Pattern",
    copy: l,
  }));

  const process = cs.design_sprint
    ? {
        sprint: (
          <>
            <strong>Framing:</strong> {text(cs.design_sprint.framing)} • <strong>Platform:</strong>{" "}
            {text(cs.design_sprint.test_platform)} • <strong>Participants:</strong>{" "}
            {text(cs.design_sprint.participants)}
          </>
        ),
        findings: (
          <>
            <ul className="list-disc pl-5 space-y-1">
              {(cs.design_sprint.key_findings || []).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </>
        ),
        changes: (
          <>
            <ul className="list-disc pl-5 space-y-1">
              {(cs.design_sprint.changes_shipped || []).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </>
        ),
        experiments: (
          <>
            <ul className="list-disc pl-5 space-y-1">
              {(cs.design_sprint.next_experiments || []).map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </>
        ),
      }
    : undefined;

  // Build highlights (map first 3 tags → icons for the cards)
  const TAG_ICON = {
    "AI UX": Brain,
    "Design Systems": Layers,
    "Design Sprint": Rocket,
  };
  const highlights = (cs.tags || []).slice(0, 3).map((t) => ({
    icon: TAG_ICON[t] || Brain, // pick a sensible default if not found
    label: t,
    copy: (cs.approach && cs.approach[0]) || cs.summary || "",
  }));

  // Outcome: try to summarize from key findings or summary
  const outcome =
    (cs.design_sprint?.key_findings && cs.design_sprint.key_findings[0]) ||
    text(cs.summary);

  return {
    header: {
      title: cs.title,
      subtitle: cs.subtitle,
      role: cs?.context?.role,
      team: cs?.context?.team,
      scope: cs?.context?.timeframe,
      tldr: cs.summary,
      hero: { type: "image", src: cs.hero, alt: `${cs.title} hero` },
      badges: headerBadgesFromStudyResults(),
      ctas: headerCTAs(),
    },
    snapshot: {
      problem: cs.problem,
      outcome,
    },
    highlights,
    results: resultsFromStudyAndMetrics(),
    artifacts,
    insights,
    resources: { items: headerCTAs() },
    process,
  };
}

const slugify = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** @param {any} cs */
function isNewCaseStudyModel(cs) {
  // "New" if it has a header.title and a snapshot
  return Boolean(cs && cs.header && cs.header.title && cs.snapshot);
}

/** @param {any} cs */
function normalizeCaseStudy(cs) {
  if (isNewCaseStudyModel(cs)) {
    const slug = cs.slug || slugify(cs.header.title);
    return { slug, ...cs };
  }
  // Old model → map to new
  const mapped = toNewCaseStudyModel(cs);
  const title = mapped && mapped.header ? mapped.header.title : "";
  const slug = cs.slug || slugify(title);
  return { slug, ...mapped };
}

//export const CASE_STUDIES_NEW = CASE_STUDIES.map((cs) => ({
//  slug: cs.slug,                // <-- keep slug for routing
//  ...toNewCaseStudyModel(cs),   // <-- from the mapper we added earlier
//}));

// Export the transformed array for your new components:
export const CASE_STUDIES_NEW = CASE_STUDIES.map(normalizeCaseStudy);