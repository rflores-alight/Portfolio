import React from 'react'

export function Button({
  variant = 'default',
  asChild = false,
  className = 'cursor-pointer',
  children,
  ...props
}) {
  const base = 'rf-btn'
  // “ghost” maps to the light pill style you want
  const v = variant === 'secondary' ? 'secondary'
          : variant === 'ghost'     ? 'ghost'
          : 'default'

  const classes = `${base} ${v} ${className}`

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${classes} ${children.props.className || ''}`,
      ...props,
    })
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
