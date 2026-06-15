"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Sfondo "sistema solare" minimal: ellissi concentriche (orbite) con sfere
 * (pianeti) disposte sopra, e beam blu allungati che scorrono lungo le orbite
 * illuminando il pianeta per prossimità — stesso linguaggio visivo del flusso
 * istituzioni. Orbite/beam asincroni, asimmetrici e leggermente inclinati.
 * Rispetta prefers-reduced-motion (render statico).
 */

type Orbit = {
  rx: number; // semiasse x in spazio 0..100
  ry: number; // semiasse y
  tilt: number; // inclinazione orbita (gradi)
  planetA: number; // angolo del pianeta lungo l'orbita (gradi)
  planet: number; // diametro pianeta (px)
  durMs: number; // periodo orbitale del beam
  dir: 1 | -1; // senso di rotazione del beam
  phase: number; // offset iniziale (0..1)
  planetDur: number; // periodo orbitale del pianeta (molto lento)
  planetDir: 1 | -1; // senso di rotazione del pianeta
};

const CX = 50;
const CY = 50;

// Stelle lontane sparse (twinkle blu intermittente, asincrone)
const STARS = [
  { x: 13, y: 24, s: 3, dur: 3.7, delay: 0 },
  { x: 85, y: 17, s: 4, dur: 5.3, delay: 2.3 },
  { x: 71, y: 73, s: 3, dur: 4.1, delay: 0.9 },
  { x: 22, y: 79, s: 4, dur: 6.2, delay: 3.7 },
  { x: 49, y: 12, s: 2.5, dur: 3.4, delay: 1.5 },
  { x: 92, y: 52, s: 3, dur: 5.7, delay: 4.4 },
];

// Asimmetrici: dimensioni, inclinazioni, velocità e fasi tutte diverse.
const ORBITS: Orbit[] = [
  { rx: 15, ry: 9, tilt: -10, planetA: 35, planet: 9, durMs: 6400, dir: 1, phase: 0.0, planetDur: 64000, planetDir: 1 },
  { rx: 26, ry: 15, tilt: 8, planetA: 210, planet: 13, durMs: 10200, dir: -1, phase: 0.32, planetDur: 98000, planetDir: -1 },
  { rx: 37, ry: 21, tilt: -6, planetA: 315, planet: 8, durMs: 14800, dir: 1, phase: 0.62, planetDur: 132000, planetDir: 1 },
  { rx: 47, ry: 28, tilt: 12, planetA: 130, planet: 11, durMs: 20500, dir: -1, phase: 0.12, planetDur: 116000, planetDir: -1 },
];

const ellipsePoint = (o: Orbit, a: number) => {
  // punto + tangente (in spazio 0..100) per angolo a (rad), con inclinazione
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  const lx = o.rx * cos;
  const ly = o.ry * sin;
  const dlx = -o.rx * sin;
  const dly = o.ry * cos;
  const fr = (o.tilt * Math.PI) / 180;
  const cf = Math.cos(fr);
  const sf = Math.sin(fr);
  return {
    x: CX + lx * cf - ly * sf,
    y: CY + lx * sf + ly * cf,
    dx: dlx * cf - dly * sf,
    dy: dlx * sf + dly * cf,
  };
};

// Punto su ellisse in spazio PIXEL (niente stretch non uniforme): inclinazione
// applicata come vera rotazione → coerente con i beam-dash renderizzati sul path.
const ellipsePx = (o: Orbit, a: number, w: number, h: number) => {
  const rxp = (o.rx / 100) * w;
  const ryp = (o.ry / 100) * h;
  const lx = rxp * Math.cos(a);
  const ly = ryp * Math.sin(a);
  const dlx = -rxp * Math.sin(a);
  const dly = ryp * Math.cos(a);
  const fr = (o.tilt * Math.PI) / 180;
  const cf = Math.cos(fr);
  const sf = Math.sin(fr);
  return {
    x: w / 2 + lx * cf - ly * sf,
    y: h / 2 + lx * sf + ly * cf,
    dx: dlx * cf - dly * sf,
    dy: dlx * sf + dly * cf,
  };
};

export function SolarFlow() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const beamRefs = useRef<(SVGEllipseElement | null)[]>([]);
  const planetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const w = wrap.offsetWidth;
      const h = wrap.offsetHeight;
      sizeRef.current = { w, h };
      setSize({ w, h });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);

    if (reduce) {
      beamRefs.current.forEach((b) => b && (b.style.display = "none"));
      return () => ro.disconnect();
    }

    let raf = 0;
    let startT: number | null = null;
    const tick = (t: number) => {
      if (startT == null) startT = t;
      const el = t - startT;
      const { w: W, h: H } = sizeRef.current;
      const beamPts: { x: number; y: number }[] = [];

      // Beam: dash CORTO a lunghezza FISSA che scorre SUL path dell'ellisse →
      // segue la curva, estremità morbide (round cap + glow), niente "tangente".
      const DASH = 16; // lunghezza fissa del dash (unità viewBox px)
      ORBITS.forEach((o, i) => {
        const beam = beamRefs.current[i];
        if (!beam || !W) return;
        const L = beam.getTotalLength();
        if (!L) return;
        let prog = (el / o.durMs) * o.dir + o.phase;
        prog -= Math.floor(prog); // [0,1)
        // gap = L - DASH → periodo del pattern = perimetro esatto: il dash
        // attraversa il "seam" dell'ellisse in modo continuo (niente sparizioni).
        beam.style.strokeDasharray = `${DASH} ${(L - DASH).toFixed(1)}`;
        beam.style.strokeDashoffset = `${(-prog * L).toFixed(1)}`;
        // posizione del dash per il glow dei pianeti (punto sul path + tilt)
        const pt = beam.getPointAtLength(prog * L);
        const fr = (o.tilt * Math.PI) / 180;
        const rxp = pt.x - W / 2;
        const ryp = pt.y - H / 2;
        beamPts.push({
          x: W / 2 + rxp * Math.cos(fr) - ryp * Math.sin(fr),
          y: H / 2 + rxp * Math.sin(fr) + ryp * Math.cos(fr),
        });
      });

      // Pianeti: scorrono MOLTO lentamente lungo la propria ellisse (asincroni)
      const planetPts: { x: number; y: number; half: number }[] = [];
      ORBITS.forEach((o, i) => {
        const pl = planetRefs.current[i];
        if (!pl || !W) return;
        const a =
          (o.planetA * Math.PI) / 180 +
          (el / o.planetDur) * Math.PI * 2 * o.planetDir;
        const p = ellipsePx(o, a, W, H);
        pl.style.left = `${p.x}px`;
        pl.style.top = `${p.y}px`;
        planetPts.push({ x: p.x, y: p.y, half: o.planet / 2 });
      });

      // Glow dei pianeti: persistente, si intensifica quando un beam passa sopra
      planetRefs.current.forEach((el2, i) => {
        if (!el2 || !planetPts[i]) return;
        const pc = planetPts[i];
        let g = 0;
        for (const b of beamPts) {
          const dist = Math.hypot(pc.x - b.x, pc.y - b.y);
          g = Math.max(g, 1 - dist / (pc.half + 34));
        }
        g = Math.max(0, g);
        const r1 = 7 + 22 * g;
        const r2 = 15 + 40 * g;
        el2.style.boxShadow = `0 0 ${r1.toFixed(1)}px ${(1 + 2 * g).toFixed(1)}px rgba(28,118,255,${(0.5 + 0.45 * g).toFixed(3)}), 0 0 ${r2.toFixed(1)}px rgba(28,118,255,${(0.22 + 0.3 * g).toFixed(3)})`;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const { w, h } = size;

  return (
    <div ref={wrapRef} className="absolute inset-0 h-full w-full">
      {/* Orbite + beam (viewBox in pixel → niente stretch, dash sul path) */}
      <svg
        aria-hidden
        viewBox={`0 0 ${w || 1} ${h || 1}`}
        className="absolute inset-0 h-full w-full"
      >
        {w > 0 &&
          ORBITS.map((o, i) => {
            const rx = (o.rx / 100) * w;
            const ry = (o.ry / 100) * h;
            const tf = `rotate(${o.tilt} ${w / 2} ${h / 2})`;
            return (
              <g key={`orbit-${i}`}>
                {/* Linea di base */}
                <ellipse
                  cx={w / 2}
                  cy={h / 2}
                  rx={rx}
                  ry={ry}
                  transform={tf}
                  fill="none"
                  stroke="var(--border)"
                  strokeOpacity={0.55}
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
                {/* Beam: dash corto che scorre sul path (segue la curva) */}
                <ellipse
                  ref={(elx) => {
                    beamRefs.current[i] = elx;
                  }}
                  cx={w / 2}
                  cy={h / 2}
                  rx={rx}
                  ry={ry}
                  transform={tf}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  style={{
                    filter:
                      "drop-shadow(0 0 3px rgba(28,118,255,0.95)) drop-shadow(0 0 7px rgba(28,118,255,0.6))",
                  }}
                />
              </g>
            );
          })}
      </svg>

      {/* Stelle lontane (twinkle) */}
      {STARS.map((st, i) => (
        <div
          key={`star-${i}`}
          className="star-twinkle pointer-events-none absolute rounded-full"
          style={{
            left: `${st.x}%`,
            top: `${st.y}%`,
            width: `${st.s}px`,
            height: `${st.s}px`,
            background: "#9cc4ff",
            boxShadow:
              "0 0 6px 1px rgba(28,118,255,0.9), 0 0 12px 3px rgba(28,118,255,0.45)",
            animation: `star-twinkle ${st.dur}s ease-in-out ${st.delay}s infinite`,
          }}
        />
      ))}

      {/* Sole centrale */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, #4d97ff, #1C76FF 55%, #0a3a8a)",
          boxShadow: "0 0 18px 2px rgba(28,118,255,0.55), 0 0 42px 6px rgba(28,118,255,0.25)",
        }}
      />

      {/* Pianeti (sfere) sulle orbite */}
      {ORBITS.map((o, i) => {
        const p = ellipsePoint(o, (o.planetA * Math.PI) / 180);
        return (
          <div
            key={i}
            ref={(elx) => {
              planetRefs.current[i] = elx;
            }}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${o.planet}px`,
              height: `${o.planet}px`,
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle at 35% 35%, #7db0ff, #1C76FF 70%)",
              boxShadow: "0 0 8px 1px rgba(28,118,255,0.5)",
            }}
          />
        );
      })}

    </div>
  );
}
