/**
 * Impulso blu glow che corre intermittente lungo il perimetro arrotondato
 * di una card: appare, percorre un tratto del bordo, si assottiglia/sparisce,
 * e riappare dopo un po' in un'altra posizione (drift tra le due animazioni).
 * Da usare dentro un contenitore `relative rounded-3xl`.
 */
export function BorderBeam() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      fill="none"
    >
      <rect
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx="24"
        ry="24"
        stroke="var(--primary)"
        strokeWidth="2.6"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="2.5 97.5"
        className="motion-reduce:hidden"
        style={{
          animation:
            "beam-travel 7s linear infinite, beam-pulse 3.6s ease-in-out infinite",
          filter: "drop-shadow(0 0 7px rgba(28,118,255,0.85))",
        }}
      />
    </svg>
  );
}
