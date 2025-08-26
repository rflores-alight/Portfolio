import React from "react";

export function Badge({ variant = "soft", className = "", children, ...props }) {
  const variants = {
    soft: "rf-badge",                 // light grey
    blue: "rf-badge rf-badge--blue",  // light blue
    secondary: "rf-badge secondary",  // (kept for pills on white)
    outline: "rf-badge outline",
  };
  const classes = `${variants[variant] || variants.soft} ${className}`;
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
