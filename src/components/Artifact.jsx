// src/components/Artifact.jsx
import React from "react";

export default function Artifact({ src, alt, caption, aspect }) {
  // Use aspect only when you want uniform tiles. Omit it to show full image height.
  const wrapperStyle = aspect ? { aspectRatio: aspect } : undefined;

  return (
    <a href={src} target="_blank" rel="noopener" className="group block">
      <figure
        className="rounded-2xl ring-1 ring-foreground/10 bg-white hover:ring-foreground/20 transition overflow-hidden"
        style={wrapperStyle}
      >
        <img
          src={src}
          alt={alt}
          className={
            aspect
              ? "w-full h-full object-contain p-3 bg-white"
              : "w-full h-auto object-contain p-3 bg-white"
          }
          loading="lazy"
        />
        <figcaption className="absolute bottom-2 left-2 text-xs px-2 py-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition">
          Open full size ↗
        </figcaption>
      </figure>
      {caption && <div className="mt-2 text-sm text-muted-foreground">{caption}</div>}
    </a>
  );
}
