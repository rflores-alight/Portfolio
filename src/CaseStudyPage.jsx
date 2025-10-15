// CaseStudyPage.jsx  (React Router)
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CASE_STUDIES_NEW } from "./case-studies";
import { PlayCircle, ExternalLink, SquareArrowOutUpRight, FileText } from "lucide-react";

// Import the extracted components (relative path; adjust if yours differs)
import {
  CaseStudyHeader,
  ProblemOutcome,
  StrategicHighlights,
  ResultsGrid,
  ArtifactsGallery,
  InsightsImpact,
  ResourcesBar,
  ProcessTabs,
} from "./components/case-study/casestudy"; // <- if you split files, update path

function Pager({ prev, next, indexInHome, total, className = "" }) {
  return (
    <nav
      className={`mx-auto max-w-6xl mb-4 flex items-center justify-between gap-4 ${className}`}
      aria-label="Case study pagination"
    >
      {/* Left: Prev (or Case Studies if none) */}
      {prev ? (
        <Link
          to={`/case-studies/${prev.slug}`}
          rel="prev"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 underline"
          aria-label={`Previous case study: ${prev.header?.title || prev.title}`}
        >
          ← Prev <span className="sr-only">: {prev.header?.title || prev.title}</span>
        </Link>
      ) : (
        <Link
          to="/#case-studies"
          className="text-sm underline"
          aria-label="Back to case studies"
        >
          ← Case Studies
        </Link>
      )}

      {/* Middle: position indicator */}
      <div className="text-xs text-zinc-500">
        {indexInHome >= 0 ? `${indexInHome + 1} / ${total}` : null}
      </div>

      {/* Right: Next (or disabled) */}
      {next ? (
        <Link
          to={`/case-studies/${next.slug}`}
          rel="next"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 underline"
          aria-label={`Next case study: ${next.header?.title || next.title}`}
        >
          Next → <span className="sr-only">: {next.header?.title || next.title}</span>
        </Link>
      ) : (
        <span
          className="text-sm text-zinc-400 select-none opacity-60"
          aria-disabled="true"
        >
          Next →
        </span>
      )}
    </nav>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const cs = CASE_STUDIES_NEW.find((c) => c.slug === slug); // same pattern as your old page
  if (!cs) return <div className="mx-auto max-w-3xl px-4 py-10">Not found.</div>;

  // Top pager: only traverse the 3 featured on the homepage
  const HOME_CS = CASE_STUDIES_NEW.slice(0, 3); // must match homepage rendering
  const indexInHome = HOME_CS.findIndex((c) => c.slug === cs.slug);
  const prev = indexInHome > 0 ? HOME_CS[indexInHome - 1] : null;
  const next = indexInHome >= 0 && indexInHome < HOME_CS.length - 1 ? HOME_CS[indexInHome + 1] : null;
  const navigate = useNavigate();

  // Optional: keyboard navigation (← / →) within the trio
  useEffect(() => {
    function onKey(e) {
      if (e.altKey || e.metaKey || e.ctrlKey || e.shiftKey) return;
      if (e.key === "ArrowLeft" && prev) navigate(`/case-studies/${prev.slug}`);
      if (e.key === "ArrowRight" && next) navigate(`/case-studies/${next.slug}`);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, navigate]);

  return (
    <article
      key={slug}
      className="mx-auto max-w-[88rem] px-4 pt-8 pb-12 animate-[cs-enter_260ms_ease-out]"
    >
      {/* Keep a simple header bar for back nav if you like */}
      
      {/* TOP PAGER */}
      <Pager
        prev={prev}
        next={next}
        indexInHome={indexInHome}
        total={HOME_CS.length}
        className="mt-4"
      />

      {/* New sections driven by the new data model */}
      <CaseStudyHeader data={cs.header} />
      <ProblemOutcome data={cs.snapshot} />
      <StrategicHighlights items={cs.highlights} />
      <ResultsGrid stats={cs.results} />
      <ArtifactsGallery items={cs.artifacts} />
      <InsightsImpact items={cs.insights} />
      {cs.resources && <ResourcesBar data={cs.resources} />}
      {cs.process && <ProcessTabs data={cs.process} />}

      <div className="h-10" />
      {/* BOTTOM PAGER */}
      <Pager
        prev={prev}
        next={next}
        indexInHome={indexInHome}
        total={HOME_CS.length}
        className="mt-8 border-t border-zinc-200 pt-4"
      />
    </article>
  );
}
