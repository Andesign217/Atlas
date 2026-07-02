"use client";

import { useEffect, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  RepeatIcon,
  GoldIngotsIcon,
  BankIcon,
  CoinsSwapIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";

/**
 * Diagramma animato del flusso di scoperta: "User" al centro, 4 App
 * costruite su Atlas ai vertici. Gli impulsi percorrono ogni linea in una
 * sola direzione, User → App, poi ripartono in loop dal centro.
 * Stesso linguaggio visivo del flusso Vault/istituzioni: impulsi allungati a
 * gradiente (rAF) e box che si illuminano per prossimità (proximity glow).
 * Rispetta prefers-reduced-motion.
 */

type Pt = { x: number; y: number };

// Coordinate in spazio 0..100 (preserveAspectRatio none → x e y indipendenti)
const CENTER: Pt = { x: 50, y: 50 };
const APPS = [
  { label: "App A", type: "LST Looping", icon: RepeatIcon, conn: { x: 15, y: 14 } },
  { label: "App B", type: "RWA Lending", icon: GoldIngotsIcon, conn: { x: 85, y: 14 } },
  { label: "App C", type: "Bank", icon: BankIcon, conn: { x: 15, y: 86 } },
  { label: "App D", type: "Stablecoin Looping", icon: CoinsSwapIcon, conn: { x: 85, y: 86 } },
];

// Tutti gli impulsi partono da User in sincrono
const PULSE_PHASE = [0, 0, 0, 0];
const TRAVEL_MS = 1900; // durata della corsa User → App
const PAUSE_MS = 2000; // pausa all'arrivo prima che riparta il prossimo impulso
const CYCLE_MS = TRAVEL_MS + PAUSE_MS;

const cornerPath = (a: Pt, b: Pt) =>
  `M ${a.x} ${a.y} C ${a.x} ${b.y}, ${b.x} ${a.y}, ${b.x} ${b.y}`;

export function DiscoverFlow() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const pulseRefs = useRef<(HTMLDivElement | null)[]>([]);
  // box[0] = You (centro), box[1..4] = App A/B/C/D
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  const routes = APPS.map((a) => cornerPath(CENTER, a.conn));
  // Punto di "aggancio" di ogni box (dove la linea lo tocca) per il glow di prossimità
  const conns: Pt[] = [CENTER, ...APPS.map((a) => a.conn)];

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

    let raf = 0;
    let startT: number | null = null;
    const tick = (t: number) => {
      if (startT == null) startT = t;
      const elapsed = t - startT;
      const pulsePts: Pt[] = [];

      pathRefs.current.forEach((path, i) => {
        const pulse = pulseRefs.current[i];
        if (!path || !pulse || !lengths[i]) return;
        const len = lengths[i];
        const cyclePos = (elapsed + PULSE_PHASE[i] * CYCLE_MS) % CYCLE_MS;
        // In pausa (impulso arrivato): niente impulso visibile, niente glow
        if (cyclePos >= TRAVEL_MS) {
          pulse.style.opacity = "0";
          return;
        }
        // Corsa unidirezionale User → App
        const pos = cyclePos / TRAVEL_MS;
        const s = pos * len;
        const c = path.getPointAtLength(s);
        const a1 = path.getPointAtLength(Math.max(0, s - 0.8));
        const a2 = path.getPointAtLength(Math.min(len, s + 0.8));
        const cx = (c.x / 100) * W;
        const cy = (c.y / 100) * H;
        const ang = Math.atan2(((a2.y - a1.y) / 100) * H, ((a2.x - a1.x) / 100) * W);
        // dissolvenza ai due estremi → niente "teletrasporto" al reset del loop
        const fade = Math.max(0, Math.min(1, pos / 0.12, (1 - pos) / 0.12));
        pulse.style.opacity = fade.toFixed(3);
        pulse.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) rotate(${ang}rad)`;
        pulsePts.push({ x: cx, y: cy });
      });

      const FALLOFF = 32; // px: distanza oltre la quale il glow si annulla
      boxRefs.current.forEach((el, i) => {
        if (!el || !connPx[i]) return;
        let g = 0;
        for (const p of pulsePts) {
          const dist = Math.hypot(connPx[i].x - p.x, connPx[i].y - p.y);
          g = Math.max(g, 1 - dist / FALLOFF);
        }
        g = Math.max(0, g);
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
    <div ref={wrapRef} className="relative h-[320px] w-full sm:h-[360px]">
      {/* Linee di base (User ↔ App) */}
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

      {/* Impulsi allungati a gradiente (uno per linea, andata e ritorno) */}
      {routes.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            pulseRefs.current[i] = el;
          }}
          className="pointer-events-none absolute left-0 top-0 z-0 h-[3px] w-7 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent [box-shadow:0_0_10px_2px_rgba(28,118,255,0.55)]"
        />
      ))}

      {/* User (al centro) */}
      <div
        ref={(el) => {
          boxRefs.current[0] = el;
        }}
        style={{ left: "50%", top: "50%" }}
        className="absolute z-[1] flex w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-xl border border-border bg-muted px-3 py-4 text-center backdrop-blur-sm transition-[box-shadow,border-color] duration-200 ease-out"
      >
        <span className="text-primary">
          <HugeiconsIcon icon={UserIcon} size={18} strokeWidth={2} />
        </span>
        <span className="text-sm font-semibold text-foreground">User</span>
        <span className="text-xs text-muted-foreground">Exploring Apps</span>
      </div>

      {/* App (ai 4 vertici) */}
      {APPS.map((a, i) => (
        <div
          key={a.label}
          ref={(el) => {
            boxRefs.current[i + 1] = el;
          }}
          style={{ left: `${a.conn.x}%`, top: `${a.conn.y}%` }}
          className="absolute z-[1] flex w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-xl border border-border bg-muted/50 px-2 py-3 text-center backdrop-blur-sm transition-[box-shadow,border-color] duration-300 ease-out"
        >
          <span className="text-primary">
            <HugeiconsIcon icon={a.icon} size={18} strokeWidth={2} />
          </span>
          <span className="text-xs font-medium text-muted-foreground sm:text-sm">
            {a.label}
          </span>
          <span className="text-[11px] font-medium text-primary sm:text-xs">
            {a.type}
          </span>
        </div>
      ))}
    </div>
  );
}
