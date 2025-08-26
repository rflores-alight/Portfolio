export function Badge({ variant = 'default', className = '', children }) {
  const base = 'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border'
  const variants = {
    default: 'bg-black text-white border-transparent',
    secondary: 'bg-gray-100 text-gray-900 border-gray-200',
    outline: 'bg-white text-gray-900 border-gray-300',
  }
  return <span className={`${base} ${variants[variant] || variants.default} ${className}`}>{children}</span>
}