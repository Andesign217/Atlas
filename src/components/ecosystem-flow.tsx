"use client";

import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { AtlasLogo } from "@/components/atlas-logo";
import {
  ExchangeIcon,
  BlockchainIcon,
  Building06Icon,
  BankIcon,
  PiggyBankIcon,
  UserGroupIcon,
  SmartPhone01Icon,
  CubeIcon,
  RealEstate01Icon,
} from "@hugeicons/core-free-icons";

type Pt = { x: number; y: number };

// Coordinate in spazio 0..100. h = layout orizzontale (desktop), v = verticale (tablet/mobile)
const FOLKS = { h: { x: 2, y: 50 }, v: { x: 50, y: 2 } };
const USERS = { h: { x: 98, y: 50 }, v: { x: 50, y: 98 } };
const NODES = [
  { icon: ExchangeIcon, label: "Exchanges", h: { x: 23, y: 14 }, v: { x: 28, y: 18 } },
  { icon: BlockchainIcon, label: "Fintechs", h: { x: 50, y: 28 }, v: { x: 72, y: 27 } },
  { icon: Building06Icon, label: "Institutions", h: { x: 23, y: 50 }, v: { x: 28, y: 36 } },
  { icon: BankIcon, label: "Banks", h: { x: 75, y: 16 }, v: { x: 72, y: 45 } },
  { icon: PiggyBankIcon, label: "Asset Managers", h: { x: 75, y: 84 }, v: { x: 28, y: 55 } },
  { icon: SmartPhone01Icon, label: "Neobanks", h: { x: 75, y: 50 }, v: { x: 72, y: 64 } },
  { icon: CubeIcon, label: "DeFi Projects", h: { x: 23, y: 86 }, v: { x: 28, y: 74 } },
  { icon: RealEstate01Icon, label: "RWA Issuers", h: { x: 50, y: 72 }, v: { x: 72, y: 83 } },
];

// Modalità "hero": flusso verticale a piena altezza che incornicia il content.
// Folks in alto-centro (sopra al titolo), chip ai lati, Users in basso (oltre la piega).
const HERO_FOLKS = { x: 50, y: 7 };
const HERO_USERS = { x: 50, y: 88 };
const HERO_NODES = [
  { icon: ExchangeIcon, label: "Exchanges", c: { x: 10, y: 22 } },
  { icon: BlockchainIcon, label: "Fintechs", c: { x: 90, y: 30 } },
  { icon: Building06Icon, label: "Institutions", c: { x: 9, y: 40 } },
  { icon: BankIcon, label: "Banks", c: { x: 91, y: 48 } },
  { icon: PiggyBankIcon, label: "Asset Managers", c: { x: 11, y: 58 } },
  { icon: SmartPhone01Icon, label: "Neobanks", c: { x: 90, y: 66 } },
  { icon: CubeIcon, label: "DeFi Projects", c: { x: 11, y: 76 } },
  { icon: RealEstate01Icon, label: "RWA Issuers", c: { x: 90, y: 82 } },
];

const routePath = (a: Pt, m: Pt, b: Pt, vertical: boolean) => {
  if (vertical) {
    // Spline Catmull-Rom attraverso [a, m, b]: curve morbide con continuità C1
    // al nodo (niente curvature brusche quando il nodo è vicino a un estremo).
    const k = 1 / 6;
    const cp1 = { x: a.x + (m.x - a.x) * k, y: a.y + (m.y - a.y) * k };
    const cp2 = { x: m.x - (b.x - a.x) * k, y: m.y - (b.y - a.y) * k };
    const cp3 = { x: m.x + (b.x - a.x) * k, y: m.y + (b.y - a.y) * k };
    const cp4 = { x: b.x - (b.x - m.x) * k, y: b.y - (b.y - m.y) * k };
    return `M ${a.x} ${a.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${m.x} ${m.y} C ${cp3.x} ${cp3.y}, ${cp4.x} ${cp4.y}, ${b.x} ${b.y}`;
  }
  const c1 = a.x + (m.x - a.x) * 0.5;
  const c2 = m.x + (b.x - m.x) * 0.5;
  return `M ${a.x} ${a.y} C ${c1} ${a.y}, ${c1} ${m.y}, ${m.x} ${m.y} C ${c2} ${m.y}, ${c2} ${b.y}, ${b.x} ${b.y}`;
};

// Tempistiche per-route: durata (andata Folks→Users) e fase iniziale (ms) diverse
// per ogni linea → i 5 beam sono asincroni (ping-pong avanti/indietro).
const PULSE_DUR = [3600, 4500, 3000, 5200, 4000, 4800, 3400, 5600];
const PULSE_PHASE = [0, 1700, 3200, 800, 2500, 4100, 1200, 3600];

export function EcosystemFlow({ hero = false }: { hero?: boolean } = {}) {
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

  // In hero il layout è sempre verticale; coordinate dedicate (chip ai lati).
  const isVertical = hero ? true : vertical;
  const fc = hero ? HERO_FOLKS : isVertical ? FOLKS.v : FOLKS.h;
  const uc = hero ? HERO_USERS : isVertical ? USERS.v : USERS.h;
  const nodeList = hero
    ? HERO_NODES
    : NODES.map((n) => ({
        icon: n.icon,
        label: n.label,
        c: isVertical ? n.v : n.h,
      }));
  const routes = nodeList.map((n) => routePath(fc, n.c, uc, isVertical));

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
      const el = t - startT;
      const pulsePts: Pt[] = [];

      pathRefs.current.forEach((path, i) => {
        const pulse = pulseRefs.current[i];
        if (!path || !pulse || !lengths[i]) return;
        // ping-pong asincrono: durata e fase per-route
        const dur = PULSE_DUR[i % PULSE_DUR.length];
        const cycle = dur * 2;
        const e = (el + PULSE_PHASE[i % PULSE_PHASE.length]) % cycle;
        const prog = e < dur ? e / dur : 2 - e / dur; // 0→1→0
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
  }, [isVertical]);

  const order = [
    { type: "folks" as const, c: fc },
    ...nodeList.map((n) => ({
      type: "chip" as const,
      icon: n.icon,
      label: n.label,
      c: n.c,
    })),
    { type: "users" as const, c: uc },
  ];

  return (
    <div
      ref={wrapRef}
      className={`relative w-full ${
        hero
          ? "h-full"
          : isVertical
            ? "mx-auto h-[820px] max-w-md sm:h-[860px] sm:max-w-lg md:max-w-3xl"
            : "mx-auto h-[540px] w-full max-w-7xl"
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
      {order.map((n, i) => {
        // Il nodo "Folks" mostra il logo ATLAS dentro la chip (coerente con gli altri)
        const logoFolks = n.type === "folks";
        return (
        <div
          key={i}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          style={{ left: `${n.c.x}%`, top: `${n.c.y}%` }}
          className={`absolute z-[1] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card backdrop-blur-sm ${
            logoFolks ? "px-6 py-3.5" : "px-3.5 py-2"
          }`}
        >
          {n.type === "folks" ? (
            logoFolks ? (
              <AtlasLogo className="h-6 w-auto text-primary md:h-7" />
            ) : (
              <span className="text-sm font-semibold">Folks Atlas</span>
            )
          ) : n.type === "users" ? (
            <>
              <HugeiconsIcon icon={UserGroupIcon} size={18} strokeWidth={2} />
              <span className="text-sm font-semibold">End Users</span>
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
        );
      })}
    </div>
  );
}
