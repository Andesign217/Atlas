"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Wrapper di regolazione per uno sfondo: applica translate (X/Y), scale (zoom)
 * e, opzionalmente, una rotazione attorno al centro (perno) ai children, e
 * mostra un pannellino di controllo per trovare i valori giusti.
 * NOTA: il pannello è temporaneo — una volta scelti i valori, li fissiamo come
 * default (transform statico) e rimuoviamo i controlli.
 */
export function BgControl({
  children,
  label = "Background",
  initialX = 0,
  initialY = 0,
  initialZoom = 1,
  initialRot = 0,
  rotation = false,
}: {
  children: ReactNode;
  label?: string;
  initialX?: number;
  initialY?: number;
  initialZoom?: number;
  initialRot?: number;
  /** Mostra il controllo di rotazione (perno centrale) */
  rotation?: boolean;
}) {
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  const [zoom, setZoom] = useState(initialZoom);
  const [rot, setRot] = useState(initialRot);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const controls = [
    { k: "X", value: x, set: setX, min: -1000, max: 1000, step: 1 },
    { k: "Y", value: y, set: setY, min: -1000, max: 1000, step: 1 },
    { k: "Zoom", value: zoom, set: setZoom, min: 0.2, max: 4, step: 0.01 },
    ...(rotation
      ? [{ k: "Rotation", value: rot, set: setRot, min: -180, max: 180, step: 1 }]
      : []),
  ];

  // Pannello renderizzato in portal su <body> per sfuggire a opacity/mask/z-index
  // dei wrapper di sfondo.
  const panel = (
    <div className="pointer-events-auto fixed bottom-4 right-4 z-[60] w-60 rounded-xl border border-white/15 bg-black/80 p-4 text-xs text-white shadow-xl backdrop-blur">
      <div className="mb-2 font-semibold uppercase tracking-wider text-white/70">
        {label} controls
      </div>
      {controls.map((c) => (
        <div key={c.k} className="mb-3">
          <div className="mb-1 flex items-center justify-between">
            <span>{c.k}</span>
            <span className="font-mono text-white/80">
              {c.k === "Zoom" ? c.value.toFixed(2) : Math.round(c.value)}
            </span>
          </div>
          <input
            type="range"
            min={c.min}
            max={c.max}
            step={c.step}
            value={c.value}
            onChange={(e) => c.set(parseFloat(e.target.value))}
            className="w-full accent-[#1C76FF]"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setX(initialX);
          setY(initialY);
          setZoom(initialZoom);
          setRot(initialRot);
        }}
        className="mt-1 w-full rounded-md border border-white/20 py-1 text-white/80 hover:bg-white/10"
      >
        Reset
      </button>
      <div className="mt-2 font-mono text-[10px] leading-relaxed text-white/50">
        x={Math.round(x)} y={Math.round(y)} zoom={zoom.toFixed(2)}
        {rotation ? ` rot=${Math.round(rot)}` : ""}
      </div>
    </div>
  );

  return (
    <>
      <div
        className="h-full w-full"
        style={{
          transform: `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${zoom})`,
          transformOrigin: "center",
        }}
      >
        {children}
      </div>
      {mounted ? createPortal(panel, document.body) : null}
    </>
  );
}
