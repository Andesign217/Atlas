/**
 * Diagramma animato del flusso di un Vault verso i suoi Spoke.
 * Un deposito (USDC) confluisce nel Vault e viene distribuito su più Spoke:
 * lungo le linee scorre in loop un "pulse" luminoso (CSS, rispetta reduced-motion).
 */
const routes = [
  "M280 72 C 280 150 91 150 91 226", // → Spoke A
  "M280 72 L 280 226", //               → Spoke B
  "M280 72 C 280 150 469 150 469 226", // → Spoke C
];

const spokes = [
  { label: "Spoke A", x: 6, cx: 91 },
  { label: "Spoke B", x: 195, cx: 280 },
  { label: "Spoke C", x: 384, cx: 469 },
];

export function VaultFlow() {
  return (
    <svg
      viewBox="0 0 560 292"
      className="h-auto w-full"
      role="img"
      aria-label="A vault deposit in USDC flowing into multiple lending spokes"
    >
      {/* Vault deposit box */}
      <rect x="6" y="6" width="548" height="58" rx="14" className="[fill:var(--muted)]" />
      <text
        x="28"
        y="41"
        className="font-sans [fill:var(--foreground)]"
        fontSize="19"
        fontWeight="600"
      >
        Vault deposit
      </text>
      <text
        x="526"
        y="41"
        textAnchor="end"
        className="font-sans [fill:var(--muted-foreground)]"
        fontSize="16"
      >
        USDC
      </text>

      {/* Linee di base */}
      {routes.map((d, i) => (
        <path
          key={`base-${i}`}
          d={d}
          fill="none"
          className="[stroke:var(--border)]"
          strokeWidth="1.5"
        />
      ))}

      {/* Pulse animato che scorre dal Vault agli Spoke */}
      {routes.map((d, i) => (
        <path
          key={`pulse-${i}`}
          d={d}
          fill="none"
          pathLength={100}
          strokeLinecap="round"
          strokeWidth="2.5"
          strokeDasharray="14 86"
          className="vault-pulse [stroke:var(--primary)]"
          style={{
            animation: "vault-flow 2.4s linear infinite",
            animationDelay: `${i * 0.8}s`,
            filter: "drop-shadow(0 0 6px rgba(28,118,255,0.7))",
          }}
        />
      ))}

      {/* Nodo di origine (Vault) con alone pulsante */}
      <circle
        cx="280"
        cy="72"
        r="11"
        className="vault-node [fill:var(--primary)]"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          animation: "vault-node-pulse 2.4s ease-in-out infinite",
        }}
      />
      <circle cx="280" cy="72" r="4" className="[fill:var(--primary)]" />

      {/* Spoke */}
      {spokes.map((s) => (
        <g key={s.label}>
          <rect
            x={s.x}
            y="226"
            width="170"
            height="58"
            rx="12"
            fillOpacity="0.5"
            strokeWidth="1"
            className="[fill:var(--muted)] [stroke:var(--border)]"
          />
          <circle cx={s.cx} cy="226" r="3.5" className="[fill:var(--primary)]" />
          <text
            x={s.cx}
            y="260"
            textAnchor="middle"
            className="font-sans [fill:var(--muted-foreground)]"
            fontSize="15"
            fontWeight="500"
          >
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
