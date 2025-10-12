// components/CaseStudyBanner.jsx  (React Router version)
import { Link } from "react-router-dom";

export default function CaseStudyBanner({ cs }) {
  // normalize fields from your model
  const title =
    cs.header?.title ?? cs.title ?? "View case study";
  const heroSrc =
    cs.header?.banner?.src ?? // prefer a dedicated banner if you have it
    cs.header?.hero?.src ??
    (typeof cs.hero === "string" ? cs.hero : cs.hero?.src);

  const href = `/case-studies/${cs.slug}`;

  if (!heroSrc) return null; // nothing to render

  return (
    <Link
      to={href}
      aria-label={title}
      className="group block overflow-hidden rounded-2xl border border-zinc-200/70
                 bg-white transition hover:shadow-md focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      {/* If you want consistent height, wrap with an aspect box */}
      <div className="relative aspect-[16/9] w-full">
        <img
          src={heroSrc}
          alt={`${title} — case study banner`}
          className="absolute inset-0 h-full w-full object-cover select-none
                     transition-transform duration-300 group-hover:scale-[1.01]"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        {/* optional subtle highlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity
                     group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(90% 100% at 0% 0%, rgba(99,102,241,0.06), transparent 60%)",
          }}
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
