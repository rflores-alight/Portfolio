// src/components/ui/pill.jsx
import React from "react";
import clsx from "clsx";

export function Pill({
  children,
  icon: Icon,          // pass the icon component (e.g., Sparkles)
  variant = "soft",    // "primary" | "soft" | "outline"
  size = "md",         // "sm" | "md"
  className = "",
  ...props
}) {
  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
  };

  const base =
    "inline-flex items-center gap-2 rounded-full whitespace-nowrap transition-colors";

  const variants = {
    primary:
      "bg-[#0D1320] text-white border border-transparent " +
      "shadow-[0_1px_0_rgba(2,6,23,0.10),0_6px_16px_rgba(2,6,23,0.10)]",
    soft:
      "bg-[#F3F6FD] text-[#0D1320] border border-[#E1E7F5] hover:bg-[#EEF3FF]",
    outline:
      "bg-white text-[#0D1320] border border-[#CBD5E1] hover:border-[#94A3B8]",
  };

  return (
    <span className={clsx(base, sizes[size], variants[variant], className)} {...props}>
      {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
      <span className="font-medium leading-none">{children}</span>
    </span>
  );
}
