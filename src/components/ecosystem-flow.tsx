"use client";

import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ExchangeIcon,
  BlockchainIcon,
  Building06Icon,
  BankIcon,
  PiggyBankIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";

type Pt = { x: number; y: number };

// Coordinate in spazio 0..100. h = layout orizzontale (desktop), v = verticale (tablet/mobile)
const FOLKS = { h: { x: 4, y: 50 }, v: { x: 50, y: 5 } };
const USERS = { h: { x: 96, y: 50 }, v: { x: 50, y: 95 } };
const NODES = [
  { icon: ExchangeIcon, label: "Exchanges", h: { x: 30, y: 15 }, v: { x: 28, y: 22 } },
  { icon: BlockchainIcon, label: "Fintechs", h: { x: 30, y: 50 }, v: { x: 72, y: 36 } },
  { icon: Building06Icon, label: "Institutions", h: { x: 30, y: 85 }, v: { x: 28, y: 50 } },
  { icon: BankIcon, label: "Banks", h: { x: 68, y: 30 }, v: { x: 72, y: 64 } },
  { icon: PiggyBankIcon, label: "Asset Managers", h: { x: 68, y: 70 }, v: { x: 28, y: 78 } },
];

const routePath = (a: Pt, m: Pt, b: Pt, vertical: boolean) => {
  if (vertical) {
    const c1 = a.y + (m.y - a.y) * 0.5;
    const c2 = m.y + (b.y - m.y) * 0.5;
    return `M ${a.x} ${a.y} C ${a.x} ${c1}, ${m.x} ${c1}, ${m.x} ${m.y} C ${m.x} ${c2}, ${b.x} ${c2}, ${b.x} ${b.y}`;
  }
  const c1 = a.x + (m.x - a.x) * 0.5;
  const c2 = m.x + (b.x - m.x) * 0.5;
  return `M ${a.x} ${a.y} C ${c1} ${a.y}, ${c1} ${m.y}, ${m.x} ${m.y} C ${c2} ${m.y}, ${c2} ${b.y}, ${b.x} ${b.y}`;
};

const DUR_MS = 3600; // andata Folks→Users (poi ritorno: ping-pong)

export function EcosystemFlow() {
  const [vertical, setVertical] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const pulseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setVertical(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const fc = vertical ? FOLKS.v : FOLKS.h;
  const uc = vertical ? USERS.v : USERS.h;
  const routes = NODES.map((n) =>
    routePath(fc, vertical ? n.v : n.h, uc, vertical),
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0,
      H = 0;
    let lengths: number[] = [];
    let centers: { cx: number; cy: number; half: number; el: HTMLDivElement }[] = [];
    const measure = () => {
      const rb = wrap.getBoundingClientRect();
      W = rb.width;
      H = rb.height;
      lengths = pathRefs.current.map((p) => (p ? p.getTotalLength() : 0));
      centers = nodeRefs.current.filter(Boolean).map((el) => {
        const b = (el as HTMLDivElement).getBoundingClientRect();
        return {
          cx: b.left - rb.left + b.width / 2,
          cy: b.top - rb.top + b.height / 2,
          half: Math.max(b.width, b.height) / 2,
          el: el as HTMLDivElement,
        };
      });
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
      const cycle = DUR_MS * 2;
      const e = (t - startT) % cycle;
      const prog = e < DUR_MS ? e / DUR_MS : 2 - e / DUR_MS; // 0→1→0 (ping-pong, sincronizzato)
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
        pulse.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) rotate(${ang}rad)`;
        pulsePts.push({ x: cx, y: cy });
      });

      for (const c of centers) {
        let g = 0;
        for (const p of pulsePts) {
          const dist = Math.hypot(c.cx - p.x, c.cy - p.y);
          g = Math.max(g, 1 - dist / (c.half + 48));
        }
        g = Math.max(0, g);
        if (g > 0.02) {
          c.el.style.boxShadow = `0 0 ${(30 * g).toFixed(1)}px rgba(28,118,255,${(0.4 * g).toFixed(3)}), 0 0 ${(60 * g).toFixed(1)}px rgba(28,118,255,${(0.2 * g).toFixed(3)})`;
          c.el.style.borderColor = `rgba(28,118,255,${(0.2 + 0.55 * g).toFixed(3)})`;
        } else {
          c.el.style.boxShadow = "";
          c.el.style.borderColor = "";
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [vertical]);

  const order = [
    { type: "folks" as const, c: fc },
    ...NODES.map((n) => ({
      type: "chip" as const,
      icon: n.icon,
      label: n.label,
      c: vertical ? n.v : n.h,
    })),
    { type: "users" as const, c: uc },
  ];

  return (
    <div
      ref={wrapRef}
      className={`relative mx-auto w-full ${
        vertical
          ? "h-[540px] max-w-md sm:max-w-lg md:max-w-3xl"
          : "h-[460px] max-w-6xl"
      }`}
    >
      {/* Linee (route Folks → nodo → Users) */}
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

      {/* 5 impulsi allungati (uno per linea, sincronizzati, ping-pong) */}
      {routes.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            pulseRefs.current[i] = el;
          }}
          className="pointer-events-none absolute left-0 top-0 z-0 h-[3px] w-7 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent [box-shadow:0_0_10px_2px_rgba(28,118,255,0.55)]"
        />
      ))}

      {/* Nodi */}
      {order.map((n, i) => (
        <div
          key={i}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          style={{ left: `${n.c.x}%`, top: `${n.c.y}%` }}
          className="absolute z-[1] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card px-3.5 py-2 backdrop-blur-sm"
        >
          {n.type === "folks" ? (
            <span className="text-sm font-semibold">Folks</span>
          ) : n.type === "users" ? (
            <>
              <HugeiconsIcon icon={UserGroupIcon} size={18} strokeWidth={2} />
              <span className="text-sm font-semibold">Users</span>
            </>
          ) : (
            <>
              <HugeiconsIcon
                icon={n.icon}
                size={18}
                strokeWidth={2}
                className="text-primary"
              />
              <span className="text-sm text-muted-foreground">{n.label}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
