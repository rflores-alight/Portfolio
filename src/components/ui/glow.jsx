import React from "react";

/**
 * Glow — asymmetric “aurora” blob behind small icons.
 * Usage: <Glow><Lightbulb className="h-5 w-5 text-indigo-600" /></Glow>
 */
export default function Glow({
  children,
  className = "",
  angle = 8,   // rotate the blob to move bright area
  scale = 1.8, // enlarge blob bounds slightly
  shadow = true // add a subtle drop-shadow to the SVG
}) {
  return (
    <span
      className={[
        // padding + overflow-visible ensure the glow can show beyond the icon box
        "relative inline-grid place-items-center isolate rounded-xl overflow-visible p-1.5",
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      {/* Gradient layer: child span ensures consistent rendering across builds */}
      <span
        aria-hidden
        className="pointer-events-none absolute z-0 blur-2xl"
        style={{
          // expand a bit beyond the wrapper so the glow "escapes"
          top:  -8, right: -8, bottom: -8, left: -8,
          backgroundImage:
            "radial-gradient(60% 55% at 30% 35%, rgba(79,70,229,0.9), rgba(79,70,229,0) 70%), radial-gradient(45% 40% at 70% 60%, rgba(147,51,234,0.35), rgba(147,51,234,0) 70%), radial-gradient(30% 30% at 60% 30%, rgba(99,102,241,0.45), rgba(99,102,241,0) 72%)",
          transform: `rotate(${angle}deg) scale(${scale})`,
          borderRadius: "inherit",
          opacity: 0.9
        }}
      />
      <span className="relative z-10">
        {React.isValidElement(children) && shadow
          ? React.cloneElement(children, {
              className: `${children.props.className || ""} drop-shadow-[0_0_14px_rgba(79,70,229,0.45)]`
            })
          : children}
      </span>
    </span>
  );
}

Glow.displayName = "Glow";
