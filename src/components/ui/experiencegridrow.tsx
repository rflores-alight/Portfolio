// components/ExperienceGridRow.tsx
import * as React from "react";

export interface ExperienceGridRowProps {
  logo: string;
  company: string;
  role: string;
  dates: string;
  /** 1 line: team size, platform scale, strategic focus */
  context: string;
  /** 1 line: key metrics/impact */
  metrics: string;
  /** 1 line (optional): leadership/system influence */
  influence?: string;
}

export function ExperienceGridRow({
  logo,
  company,
  role,
  dates,
  context,
  metrics,
  influence,
}: ExperienceGridRowProps) {
  return (
    <div className="flex flex-col gap-3 pt-6 pb-6 last:border-none">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
          <img
            src={logo}
            alt={`${company} logo`}
            className="h-6 w-6 object-contain"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-2">
            {/* Company stronger, role lighter for skimmability */}
            <h3 className="text-lg font-semibold leading-tight">
              {company}
              <span className="font-normal text-muted-foreground">
                {" "}
                — {role}
              </span>
            </h3>
            <span className="text-sm text-muted-foreground">{dates}</span>
          </div>
        </div>
      </div>

      {/* Body (indented to align under text, not the logo) */}
      <div className="ml-[3.25rem] space-y-1.5 text-sm leading-relaxed text-muted-foreground">
        <p>{context}</p>
        <p>{metrics}</p>
        {influence && (
          <p className="text-foreground/80 before:mr-1 before:content-['→']">
            {influence}
          </p>
        )}
      </div>
    </div>
  );
}
