import React from 'react';

export function Button({
  variant = 'default',
  asChild = false,
  className = '',
  children,
  ...props
}) {
  const base =
    // layout & typography
    'inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-[16px] leading-6 font-medium ' +
    // interaction
    'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ' +
    // disabled
    'disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    default:
      // base solid button
      'bg-zinc-900 text-white shadow-sm ' +
      // hover: slightly lighter bg + soft elevation
      'hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-900/10 ' +
      // pressed: reduce elevation & darken a touch
      'active:bg-zinc-900/90 active:shadow-sm ' +
      // tiny lift on hover, but motion-safe
      'motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0',
    secondary:
      'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:bg-zinc-200/80 border border-zinc-200',
    ghost:
      // match your nav hover color & add a subtle bg for affordance
      'text-muted-foreground hover:text-indigo-700 hover:bg-indigo-50/80 active:bg-indigo-100',
  };

  const classes = `${base} ${variants[variant] ?? variants.default} ${className}`;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${classes} ${children.props.className || ''}`,
      ...props,
    });
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
