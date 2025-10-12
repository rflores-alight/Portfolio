import React, { forwardRef, memo } from "react";

/**
 * Section
 * - Semantic wrapper with consistent headingicon layout
 * - Props:
 *   - id?: string                          (anchor target)
 *   - title: React.ReactNode               (section title text)
 *   - subtitle?: React.ReactNode           (small helper text)
 *   - icon?: React.ReactNode               (React element; sized automatically)
 *   - as?: keyof JSX.IntrinsicElements     (semantic tag; 'section' by default)
 *   - headingLevel?: 2|3|4|5|6             (h2 by default for page sections)
 *   - className?: string
 */
const ensureSizedIcon = (node) => {
  if (React.isValidElement(node)) {
    return React.cloneElement(node, {
      className: ["h-7 w-7 text-primary", node.props.className]
        .filter(Boolean)
        .join(" "),
    });
  }
  return node;
};

const SectionImpl = (
  { id, title, subtitle, icon, as: Tag = "section", headingLevel = 2, className = "", children },
  ref
  // eslint-disable-next-line comma-dangle
) => {
  const Heading = `h${headingLevel}`;

  return (
    <Tag id={id} ref={ref} className={["max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12", className].join(" ")}>
      {(title || icon) && (
        <div className="flex items-start gap-3 mb-6">
          {icon ? <div className="shrink-0 mt-0.5">{ensureSizedIcon(icon)}</div> : null}
          <div>
            {title ? (
              <Heading className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
                {title}
              </Heading>
            ) : null}
            {subtitle ? <p className="text-sm text-muted-foreground mt-1">{subtitle}</p> : null}
          </div>
        </div>
      )}
      {children}
    </Tag>
  );
};

const Section = memo(forwardRef(SectionImpl));
Section.displayName = "Section";

export { Section };
