// components/CaseStudyBanner.jsx
import { Link } from "react-router-dom";
import { sendEvent } from "../../analytics"; // adjust path if yours differs

export default function CaseStudyBanner({ cs, listId = "case_studies_home" }) {
  const title = cs.header?.title ?? cs.title ?? "View case study";
  const heroSrc =
    cs.header?.banner?.src ??
    cs.header?.hero?.src ??
    (typeof cs.hero === "string" ? cs.hero : cs.hero?.src);

  const href = `/case-studies/${cs.slug}`;

  const handleClick = () => {
    // GA4-friendly: which item from which list was selected
    sendEvent("select_item", {
      item_list_id: listId,
      item_list_name: "Case Studies",
      items: [{ item_id: cs.slug, item_name: cs.title }],
    });
  };

  if (!heroSrc) return null;

  return (
    <Link
      to={href}
      onClick={handleClick}
      aria-label={title}
      className="group block overflow-hidden rounded-2xl border border-zinc-200/70
                 bg-white transition hover:shadow-md focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
    >
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
