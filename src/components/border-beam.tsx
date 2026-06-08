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
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="14 86"
        className="motion-reduce:hidden"
        style={{
          animation:
            "beam-travel 13s linear infinite, beam-flash 8s ease-in-out infinite",
          filter: "drop-shadow(0 0 6px rgba(28,118,255,0.7))",
        }}
      />
    </svg>
  );
}
