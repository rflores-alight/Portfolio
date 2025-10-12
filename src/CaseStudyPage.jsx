// CaseStudyPage.jsx  (React Router)
import { useParams, Link } from "react-router-dom";
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

export default function CaseStudyPage() {
  const { slug } = useParams();
  const cs = CASE_STUDIES_NEW.find((c) => c.slug === slug); // same pattern as your old page
  if (!cs) return <div className="mx-auto max-w-3xl px-4 py-10">Not found.</div>;

  return (
    <article className="mx-auto max-w-[88rem] px-4 pt-8 pb-12">
      {/* Keep a simple header bar for back nav if you like */}
      <header className="mx-auto max-w-6xl mb-4 flex items-center justify-between gap-4">
        <Link to="/" className="text-sm underline">← Back</Link>
      </header>

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
    </article>
  );
}
