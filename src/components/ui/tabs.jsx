import React, { createContext, useContext, useState } from "react";

const Ctx = createContext();

export function Tabs({ defaultValue, tone = "grey", className = "", children }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <Ctx.Provider value={{ value, setValue, tone }}>
      <div className={className}>{children}</div>
    </Ctx.Provider>
  );
}

export function TabsList({ className = "", children }) {
  const { tone } = useContext(Ctx);
  return <div className={`rf-tabs ${tone === "blue" ? "rf-tabs--blue" : ""} ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, className = "", children }) {
  const { value: sel, setValue } = useContext(Ctx);
  const active = sel === value;
  return (
    <button
      type="button"
      className={`rf-tab ${active ? "active" : ""} ${className}`}
      onClick={() => setValue(value)}
      aria-selected={active}
      role="tab"
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className = "", children }) {
  const { value: sel } = useContext(Ctx);
  if (sel !== value) return null;
  return <div className={className}>{children}</div>;
}
