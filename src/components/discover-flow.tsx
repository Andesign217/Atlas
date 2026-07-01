"use client";

import { useEffect, useRef } from "react";

/**
 * Diagramma animato del flusso di scoperta: un utente esplora più App
 * costruite su Atlas e interagisce con esse (deposit / earn / borrow).
 * Stesso linguaggio visivo del flusso Vault/istituzioni: impulsi allungati a
 * gradiente che scorrono lungo le linee (rAF) e box che si illuminano per
 * prossimità (proximity glow). Rispetta prefers-reduced-motion.
 */

type Pt = { x: number; y: number };

// Coordinate in spazio 0..100 (preserveAspectRatio none → x e y indipendenti)
const ORIGIN: Pt = { x: 50, y: 22 };
const APPS = [
  { label: "Lending App A", action: "Deposit", conn: { x: 16, y: 78 } },
  { label: "Lending App B", action: "Earn", conn: { x: 50, y: 78 } },
  { label: "Lending App C", action: "Borrow", conn: { x: 84, y: 78 } },
];

const routePath = (a: Pt, b: Pt) => {
  if (a.x === b.x) return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  const cy = a.y + (b.y - a.y) * 0.5;
  return `M ${a.x} ${a.y} C ${a.x} ${cy}, ${b.x} ${cy}, ${b.x} ${b.y}`;
};

const DUR_MS = 2600; // discesa Explorer → App (loop)

export function DiscoverFlow() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const pulseRefs = useRef<(HTMLDivElement | null)[]>([]);
  // box[0] = Explorer, box[1..3] = App A/B/C
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  const routes = APPS.map((a) => routePath(ORIGIN, a.conn));
  // Punto di "aggancio" di ogni box (dove la linea lo tocca) per il glow di prossimità
  const conns: Pt[] = [ORIGIN, ...APPS.map((a) => a.conn)];

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0,
      H = 0;
    let lengths: number[] = [];
    let connPx: Pt[] = [];
    const measure = () => {
      const rb = wrap.getBoundingClientRect();
      W = rb.width;
      H = rb.height;
      lengths = pathRefs.current.map((p) => (p ? p.getTotalLength() : 0));
      connPx = conns.map((c) => ({ x: (c.x / 100) * W, y: (c.y / 100) * H }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);

    if (reduce) {
      pulseRefs.current.forEach((p) => p && (p.style.display = "none"));
      return () => ro.disconnect();
    }

    const FALLOFF = 32; // px: distanza oltre la quale il glow si annulla (stretto → si accende solo all'arrivo del beam)

    let raf = 0;
    let startT: number | null = null;
    const tick = (t: number) => {
      if (startT == null) startT = t;
      const prog = ((t - startT) % DUR_MS) / DUR_MS; // 0→1 in loop (discesa)
      // dissolvenza ai due estremi → niente "teletrasporto" al reset
      const fade = Math.max(0, Math.min(1, prog / 0.12, (1 - prog) / 0.12));
      const pulsePts: Pt[] = [];

      pathRefs.current.forEach((path, i) => {
        const pulse = pulseRefs.current[i];
        if (!path || !pulse || !lengths[i]) return;
        const len = lengths[i];
        const s = prog * len;
        const c = path.getPointAtLength(s);
        const a1 = path.getPointAtLength(Math.max(0, s - 0.8));
        const a2 = path.getPointAtLength(Math.min(len, s + 0.8));
        const cx = (c.x / 100) * W;
        const cy = (c.y / 100) * H;
        const ang = Math.atan2(((a2.y - a1.y) / 100) * H, ((a2.x - a1.x) / 100) * W);
        pulse.style.opacity = fade.toFixed(3);
        pulse.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) rotate(${ang}rad)`;
        pulsePts.push({ x: cx, y: cy });
      });

      boxRefs.current.forEach((el, i) => {
        if (!el || !connPx[i]) return;
        let g = 0;
        for (const p of pulsePts) {
          const dist = Math.hypot(connPx[i].x - p.x, connPx[i].y - p.y);
          g = Math.max(g, 1 - dist / FALLOFF);
        }
        g = Math.max(0, g) * fade;
        if (g > 0.02) {
          el.style.boxShadow = `0 0 ${(30 * g).toFixed(1)}px rgba(28,118,255,${(0.4 * g).toFixed(3)}), 0 0 ${(60 * g).toFixed(1)}px rgba(28,118,255,${(0.2 * g).toFixed(3)})`;
          el.style.borderColor = `rgba(28,118,255,${(0.2 + 0.55 * g).toFixed(3)})`;
        } else {
          el.style.boxShadow = "";
          el.style.borderColor = "";
        }
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[280px] w-full sm:h-[300px]">
      {/* Linee di base (Explorer → App) */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {routes.map((d, i) => (
          <path
            key={i}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            d={d}
            fill="none"
            stroke="var(--border)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Impulsi allungati a gradiente (uno per linea) */}
      {routes.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            pulseRefs.current[i] = el;
          }}
          className="pointer-events-none absolute left-0 top-0 z-0 h-[3px] w-7 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent [box-shadow:0_0_10px_2px_rgba(28,118,255,0.55)]"
        />
      ))}

      {/* Explorer box (in alto, larghezza piena) */}
      <div
        ref={(el) => {
          boxRefs.current[0] = el;
        }}
        className="absolute inset-x-0 top-0 z-[1] flex items-center justify-between rounded-xl border border-border bg-muted px-4 py-3 backdrop-blur-sm"
      >
        <span className="text-sm font-semibold text-foreground">You</span>
        <span className="text-sm text-muted-foreground">Exploring Atlas</span>
      </div>

      {/* App (in basso) */}
      {APPS.map((a, i) => (
        <div
          key={a.label}
          ref={(el) => {
            boxRefs.current[i + 1] = el;
          }}
          style={{ left: `${a.conn.x}%`, top: `${a.conn.y}%` }}
          className="absolute z-[1] flex w-[30%] -translate-x-1/2 flex-col items-center justify-center gap-1 rounded-xl border border-border bg-muted/50 px-2 py-3 text-center backdrop-blur-sm"
        >
          <span className="text-xs font-medium text-muted-foreground sm:text-sm">
            {a.label}
          </span>
          <span className="text-[11px] font-medium text-primary sm:text-xs">
            {a.action}
          </span>
        </div>
      ))}
    </div>
  );
}
