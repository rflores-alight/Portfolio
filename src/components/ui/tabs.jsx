import React from 'react'
const Ctx = React.createContext(null)
export function Tabs({ defaultValue, className='', children }) {
  const [value, setValue] = React.useState(defaultValue)
  return <Ctx.Provider value={{ value, setValue }}><div className={className}>{children}</div></Ctx.Provider>
}
export function TabsList({ children }) {
  return <div className="inline-flex gap-1 rounded-xl border p-1">{children}</div>
}
export function TabsTrigger({ value, children }) {
  const { value:cur, setValue } = React.useContext(Ctx)
  const active = cur===value
  const base='px-3 py-1.5 text-sm rounded-lg'
  return <button onClick={()=>setValue(value)} className={`${base} ${active?'bg-black text-white':'bg-white text-gray-900 hover:bg-gray-50'}`}>{children}</button>
}
export function TabsContent({ value, className='', children }) {
  const { value:cur } = React.useContext(Ctx)
  if (cur!==value) return null
  return <div className={className}>{children}</div>
}
