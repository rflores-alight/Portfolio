export function Card({ className = '', children }) {
  return <div className={`rounded-2xl border border-gray-200 shadow-sm ${className}`}>{children}</div>
}
export function CardHeader({ className = '', children }) {
  return <div className={`p-5 ${className}`}>{children}</div>
}
export function CardTitle({ className = '', children }) {
  return <div className={`text-lg font-semibold ${className}`}>{children}</div>
}
export function CardContent({ className = '', children }) {
  return <div className={`p-5 ${className}`}>{children}</div>
}