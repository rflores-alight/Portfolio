import React from 'react'
export function Button({ asChild=false, variant='default', className='', children, ...props }) {
  const base='inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium border transition'
  const variants={
    default:'bg-black text-white border-transparent hover:opacity-90',
    secondary:'bg-white text-black border-gray-200 hover:bg-gray-50',
    ghost:'bg-transparent text-black border-transparent hover:bg-gray-50',
  }
  const classes=\`\${base} \${variants[variant]||variants.default} \${className}\`
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { className: \`\${classes} \${children.props.className||''}\`, ...props })
  }
  return <button className={classes} {...props}>{children}</button>
}
