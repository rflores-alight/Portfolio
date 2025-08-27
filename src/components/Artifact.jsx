// src/components/Artifact.jsx
import React from "react";

export default function Artifact({ src, alt, caption, aspect = "4 / 3" }) {
  return (
    <a href={src} target="_blank" rel="noopener" className="group block">
      <figure
        className="relative overflow-hidden rounded-2xl ring-1 ring-foreground/10 bg-white hover:ring-foreground/20 transition"
        style={{ aspectRatio: aspect }}  // keeps cards the same size
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-contain"
        />
        <figcaption className="absolute bottom-2 left-2 text-xs px-2 py-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition">
          Open full size ↗
        </figcaption>
      </figure>
      {caption && (
        <div className="mt-2 text-sm text-muted-foreground">{caption}</div>
      )}
    </a>
  );
}
