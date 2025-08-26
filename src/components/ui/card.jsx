export function Card({ className='', children }) {
  return <div className={`rf-card ${className}`}>{children}</div>
}
export function CardHeader({ className='', children }) {
  return <div className={`rf-card-header ${className}`}>{children}</div>
}
export function CardTitle({ className='', children }) {
  return <div className={`rf-card-title ${className}`}>{children}</div>
}
export function CardContent({ className='', children }) {
  return <div className={`rf-card-content ${className}`}>{children}</div>
}
