import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Layers01Icon,
  CoinsDollarIcon,
  SlidersHorizontalIcon,
  SecurityLockIcon,
  ViewOffSlashIcon,
  JusticeScale01Icon,
  Analytics01Icon,
  ShieldEnergyIcon,
  Globe02Icon,
  DashboardSquare01Icon,
  RepeatIcon,
  SquareLock02Icon,
  GoldIngotsIcon,
  Target01Icon,
  Tick02Icon,
  MinusSignIcon,
  Cancel01Icon,
  PuzzleIcon,
  ApiIcon,
  GiftIcon,
  BankIcon,
  Timer01Icon,
  UserLock02Icon,
  CoinsSwapIcon,
  MoneyAdd02Icon,
  FlashIcon,
} from "@hugeicons/core-free-icons";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/motion/reveal";
import { VaultFlow } from "@/components/vault-flow";
import { ForbesLogo } from "@/components/forbes-logo";
import { HeroRays } from "@/components/hero-rays";
import { WhyLaser } from "@/components/why-laser";
import { RotatingHeadline } from "@/components/rotating-headline";
import { SolarFlow } from "@/components/solar-flow";
import { ContactForm } from "@/components/contact-form";
import { PartnersMarquee } from "@/components/partners-marquee";
import { EcosystemFlow } from "@/components/ecosystem-flow";

const stats = [
  ["5+ years", "of uninterrupted mainnet"],
  ["$13B+", "cumulative deposits"],
  ["240K+", "total unique users"],
  ["9 chains", "supported"],
];

const modules = [
  { icon: SlidersHorizontalIcon, label: "Multi-collateral & multi-borrow" },
  { icon: Analytics01Icon, label: "Custom interest-rate models" },
  { icon: Target01Icon, label: "Targeted borrow rates" },
  { icon: SecurityLockIcon, label: "KYC/AML support" },
  { icon: JusticeScale01Icon, label: "Configurable liquidation engine" },
  { icon: Globe02Icon, label: "Any oracle (Chainlink, Pyth…)" },
  { icon: ViewOffSlashIcon, label: "Privacy module" },
  { icon: ShieldEnergyIcon, label: "Insurance & security modules" },
  { icon: DashboardSquare01Icon, label: "White-label frontend" },
  { icon: PuzzleIcon, label: "Plugins" },
  { icon: SquareLock02Icon, label: "Updatable or immutable" },
  { icon: ApiIcon, label: "Analytics, REST & GraphQL" },
  { icon: GiftIcon, label: "Merkl incentives" },
];

// Comparazione Folks Atlas vs Aave vs Morpho (s: "yes" | "warn" | "no")
const comparison = {
  protocols: ["Atlas", "Aave", "Morpho"],
  rows: [
    {
      cap: "Launch and manage your own lending app",
      cells: [
        { s: "yes" },
        { s: "no", note: "DAO / governance approval needed" },
        { s: "no", note: "Just vaults" },
      ],
    },
    {
      cap: "No-code, live in minutes",
      cells: [{ s: "yes" }, { s: "no" }, { s: "no" }],
    },
    {
      cap: "Multi-collateral + multi-borrow markets",
      cells: [
        { s: "yes" },
        { s: "yes" },
        { s: "no", note: "Single collateral / single borrow" },
      ],
    },
    {
      cap: "Full parameter control",
      cells: [
        { s: "yes" },
        { s: "warn", note: "Limited / governance-driven" },
        { s: "warn", note: "Limited / fixed after deployment" },
      ],
    },
    {
      cap: "Active market management after launch",
      cells: [
        { s: "yes" },
        { s: "warn", note: "Governance dependent" },
        { s: "no", note: "Immutable markets" },
      ],
    },
    {
      cap: "Native KYC / AML & address whitelisting",
      cells: [{ s: "yes" }, { s: "no" }, { s: "warn", note: "Limited" }],
    },
    {
      cap: "Privacy & private-chain deployment",
      cells: [{ s: "yes" }, { s: "no" }, { s: "no" }],
    },
    {
      cap: "RWA-specific lending markets",
      cells: [
        { s: "yes" },
        { s: "warn", note: "General-purpose markets, not issuer-controlled" },
        { s: "warn", note: "Isolated markets, but limited flexibility" },
      ],
    },
    {
      cap: "White-label solution",
      cells: [{ s: "yes" }, { s: "no" }, { s: "no" }],
    },
  ],
} as const;

// Marker "pieni": cerchio colorato + glifo. Giallo → glifo scuro per contrasto.
const STATUS = {
  yes: { glyph: Tick02Icon, circle: "bg-success", glyphColor: "text-white" },
  warn: { glyph: MinusSignIcon, circle: "bg-warning", glyphColor: "text-black/80" },
  no: { glyph: Cancel01Icon, circle: "bg-[#8a8d93]", glyphColor: "text-white" },
} as const;

const useCases = [
  {
    icon: Layers01Icon,
    title: "Generalised lending",
    desc: "Recreate a full multi-asset money market with the collateral and borrow parameters you choose.",
  },
  {
    icon: RepeatIcon,
    title: "LST Looping",
    desc: "List a liquid-staking token as collateral to borrow the underlying asset.",
  },
  {
    icon: CoinsSwapIcon,
    title: "Yield-bearing Stablecoin Looping",
    desc: "List a yield-bearing stablecoin as collateral to borrow more stablecoins and offer looping yield strategies.",
  },
  {
    icon: MoneyAdd02Icon,
    title: "CDP Stablecoin",
    desc: "Launch a lending app that lets users mint your stablecoin against many collateral tokens.",
  },
  {
    icon: CoinsDollarIcon,
    title: "Single pair markets",
    desc: "Isolated collateral and borrow pairs with dedicated risk parameters.",
  },
  {
    icon: GoldIngotsIcon,
    title: "RWA lending",
    desc: "Bring real-world collateral onchain with configurable credit terms, risk controls, and borrower permissions.",
  },
  {
    icon: Timer01Icon,
    title: "Fixed Rate + Duration",
    desc: "Overcollateralised lending at a fixed borrow rate for a fixed term.",
  },
  {
    icon: UserLock02Icon,
    title: "No-Collateral Lending",
    desc: "Whitelisted addresses borrow without supplying any collateral.",
  },
  {
    icon: BankIcon,
    title: "Bank",
    desc: "Launch a lending app ready for institutional use.",
  },
];

const cardHover =
  "transition duration-[400ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform hover:-translate-y-1 hover:bg-[color-mix(in_oklab,var(--card),white_8%)]";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col">
        {/* ---------- HERO ---------- */}
        <section className="relative isolate flex min-h-screen items-center overflow-hidden">
          {/* Light Rays: altezza 65% della viewport, in alto, full-width */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[65vh]">
            <HeroRays />
          </div>
          {/* Scrim radiale: testo leggibile lasciando intravedere i raggi (overlap) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[65vh] bg-[radial-gradient(72%_60%_at_50%_40%,color-mix(in_oklab,var(--background)_60%,transparent)_0%,transparent_72%)]"
          />
          {/* Dissolvenza dei raggi nel background verso il fondo della fascia */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[65vh] bg-[linear-gradient(to_bottom,transparent_55%,var(--background)_100%)]"
          />
          <div className="relative z-10 mx-auto flex w-full max-w-7xl -translate-y-8 flex-col items-center px-6 py-24 text-center md:-translate-y-12">
            <Reveal immediate>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
                <RotatingHeadline />
                <span className="block">product onchain</span>
              </h1>
            </Reveal>
            <Reveal immediate delay={0.16}>
              <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
                Atlas enables anyone to deploy fully-configurable onchain
                lending apps for any scale or sophistication. Speak with our
                team to explore a tailored integration.
              </p>
            </Reveal>
            <Reveal immediate delay={0.24}>
              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98]"
                >
                  Get in touch
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={20}
                    strokeWidth={2}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- ECOSYSTEM FLOW ---------- */}
        <section className="relative z-10 -mt-10 md:-mt-20 lg:-mt-28">
          <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6">
            <Reveal y={16}>
              <EcosystemFlow />
            </Reveal>
          </div>
        </section>

        {/* ---------- PROVEN / STATS ---------- */}
        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-7xl px-6 py-24">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-medium uppercase tracking-wider text-primary">
                  Proven, not experimental
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                  Built on battle-tested foundations
                </h2>
              </div>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(([n, l], i) => (
                <div
                  key={l}
                  className="flex h-full flex-col items-center justify-center bg-card px-6 py-8 text-center"
                >
                  <Reveal delay={i * 0.08} y={16}>
                    <div className="text-4xl font-semibold tracking-tight text-primary">
                      {n}
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">{l}</div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- SPOKES ---------- */}
        <section id="spokes" className="border-t border-border bg-muted/30">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2">
            <Reveal y={24}>
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-primary">
                  Build
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                  Create your own lending app
                </h2>
                <p className="mt-4 text-muted-foreground">
                  A lending app is a fully-configurable lending environment you
                  own and control. List as many collateral and borrow assets as
                  you need, set every parameter to match your strategy and
                  compliance needs, and launch on audited infrastructure.
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                  <HugeiconsIcon
                    icon={FlashIcon}
                    size={20}
                    strokeWidth={2}
                    className="text-primary"
                  />
                  Set up in as little as 10 minutes. No coding required.
                </div>
              </div>
            </Reveal>
            {/* Griglia a hairline unificata: più pulita e moderna dei box separati */}
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {modules.map((m, i) => (
                <div
                  key={m.label}
                  className="group relative overflow-hidden bg-card p-5 transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--card),var(--primary)_7%)]"
                >
                  <Reveal delay={i * 0.04} y={10}>
                    <div className="flex items-center gap-3.5">
                      <span className="shrink-0 text-primary transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-110">
                        <HugeiconsIcon icon={m.icon} size={22} strokeWidth={2} />
                      </span>
                      <span className="text-sm font-medium">{m.label}</span>
                    </div>
                  </Reveal>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-x-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- VAULTS ---------- */}
        <section className="border-t border-border">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1" y={24}>
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <VaultFlow />
              </div>
            </Reveal>
            <Reveal className="order-1 lg:order-2" y={24}>
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-primary">
                  Discover
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                  Explore and interact with apps built on Atlas
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Allows general users to discover every app built on Atlas and
                  interact with them. Browse live lending apps, deposit, earn, or
                  borrow all from one place.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- WHY ATLAS ---------- */}
        <section
          id="why"
          className="relative isolate overflow-hidden border-t border-border bg-muted/30"
        >
          {/* Laser Flow di sfondo (tema-aware), ancorato al bottom, sotto il contenuto.
              mix-blend-screen annulla il fondo nero del canvas → adatto a dark/light. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[201%] opacity-30 mix-blend-screen [mask-image:linear-gradient(to_bottom,transparent_0%,#000_15%,#000_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_15%,#000_100%)]"
          >
            {/* mobile: centrato (visibile) — desktop: posizione fissata */}
            <div className="h-full w-full origin-center md:translate-x-[-347px] md:translate-y-[3px]">
              <WhyLaser />
            </div>
          </div>
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-medium uppercase tracking-wider text-primary">
                  Why Atlas
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                  Built different, so you can build differently.
                </h2>
                <p className="mt-4 text-balance text-muted-foreground">
                  Atlas gives teams the control usually missing from existing
                  lending infrastructure: full customization around their
                  assets, users, risk models, compliance needs, and a fully
                  owned user experience.
                </p>
              </div>
            </Reveal>

            {/* Tabella comparativa Folks Atlas vs Aave vs Morpho */}
            <Reveal y={20} className="mt-14">
              <div className="overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-md">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-5 py-6 text-sm font-medium text-muted-foreground">
                          Capability
                        </th>
                        {comparison.protocols.map((p, i) => (
                          <th
                            key={p}
                            className={`px-5 py-6 text-center text-sm font-semibold ${
                              i === 0
                                ? "bg-primary/[0.07] text-primary"
                                : "text-foreground"
                            }`}
                          >
                            {p}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.rows.map((row) => (
                        <tr
                          key={row.cap}
                          className="border-b border-border/60 last:border-0"
                        >
                          <td className="px-5 py-6 text-sm font-medium text-foreground">
                            {row.cap}
                          </td>
                          {row.cells.map((cell, ci) => {
                            const st = STATUS[cell.s];
                            const note = "note" in cell ? cell.note : null;
                            // Ogni cella mostra la propria icona + eventuale nota
                            return (
                              <td
                                key={ci}
                                className={`px-5 py-6 align-middle ${
                                  ci === 0 ? "bg-primary/[0.07]" : ""
                                }`}
                              >
                                <div className="flex flex-col items-center gap-1.5 text-center">
                                  <span
                                    className={`grid size-5 place-items-center rounded-full ${st.circle} ${st.glyphColor}`}
                                  >
                                    <HugeiconsIcon
                                      icon={st.glyph}
                                      size={12}
                                      strokeWidth={3.5}
                                    />
                                  </span>
                                  {note ? (
                                    <span className="text-[12px] leading-tight text-muted-foreground">
                                      {note}
                                    </span>
                                  ) : null}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            {/* Legenda + disclaimer */}
            <div className="mx-auto mt-6 max-w-4xl">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="grid size-5 place-items-center rounded-full bg-success text-white">
                    <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={3.5} />
                  </span>
                  Supported
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="grid size-5 place-items-center rounded-full bg-warning text-black/80">
                    <HugeiconsIcon icon={MinusSignIcon} size={12} strokeWidth={3.5} />
                  </span>
                  Partial / limited
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="grid size-5 place-items-center rounded-full bg-[#8a8d93] text-white">
                    <HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={3.5} />
                  </span>
                  Not available
                </span>
              </div>
              <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground/70">
                This comparison is provided for informational purposes and
                reflects our good-faith reading of each protocol&apos;s publicly
                available documentation. Lending protocols develop quickly and
                ship capabilities across multiple products, so some features may
                change or be delivered differently; we encourage readers to
                confirm current specifications with each provider. This table is
                independent and is not affiliated with, endorsed by, or intended
                to disparage Aave or Morpho; all trademarks belong to their
                respective owners.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- USE CASES ---------- */}
        <section id="use-cases" className="border-t border-border">
          <div className="mx-auto w-full max-w-7xl px-6 py-24">
            <Reveal>
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-wider text-primary">
                  Use cases
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                  What will you build?
                </h2>
                <p className="mt-4 text-muted-foreground">
                  From permissionless lending markets to permissioned
                  institutional venues and real-world assets, Atlas lets you
                  configure an App for any need and unlock lending use cases
                  that weren&apos;t previously possible onchain.
                </p>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {useCases.map((u, i) => (
                <Reveal key={u.title} delay={(i % 3) * 0.08} y={20}>
                  <div
                    className={`group h-full rounded-2xl border border-border bg-card p-6 ${cardHover}`}
                  >
                    <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-[400ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-110">
                      <HugeiconsIcon icon={u.icon} size={24} strokeWidth={2} />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">
                      {u.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {u.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- FORBES QUOTE ---------- */}
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto w-full max-w-4xl px-6 py-24 text-center">
            <Reveal>
              <ForbesLogo className="mx-auto mb-10 h-8 w-auto text-foreground md:h-9" />
              <p className="text-3xl font-semibold leading-snug tracking-tight md:text-4xl">
                <span className="text-primary">&ldquo;</span>Institutions
                don&apos;t lose control and compliance onchain. Instead, they have
                the opportunity to place it where it matters and operate more
                efficiently<span className="text-primary">&rdquo;</span>
              </p>
              <p className="mx-auto mt-8 max-w-2xl text-muted-foreground">
                In his latest Forbes article, Folks Finance CEO Benedetto Biondi
                explores why more institutions are moving onchain, how control and
                compliance are evolving, and what this could mean for the future of
                financial infrastructure.
              </p>
              <a
                href="https://www.forbes.com/councils/forbestechcouncil/2026/05/08/why-institutions-are-quietly-moving-onchain/"
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-2 font-medium text-primary transition-opacity hover:opacity-80"
              >
                Read article
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={18}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ---------- ECOSYSTEM PARTNERS ---------- */}
        <section id="ecosystem" className="border-t border-border bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-6 py-24">
            <Reveal>
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <p className="text-sm font-medium uppercase tracking-wider text-primary">
                  Ecosystem Partners
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                  Supporting new financial use cases onchain
                </h2>
              </div>
            </Reveal>
            <PartnersMarquee />
          </div>
        </section>

        {/* ---------- FINAL CTA ---------- */}
        <section id="contact" className="border-t border-border">
          <div className="mx-auto w-full max-w-7xl px-6 py-24">
            <Reveal y={24}>
              {/* Pannello a tema invertito rispetto alla pagina → forte contrasto */}
              <div className="surface-invert relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-16 text-center text-foreground md:px-16 md:py-20">
                {/* Sfondo "sistema solare" minimal, dietro al contenuto */}
                <div className="pointer-events-none absolute inset-0 -z-0 opacity-80">
                  {/* mobile: centrato e visibile — desktop: posizione fissata */}
                  <div className="h-full w-full origin-center translate-x-0 translate-y-0 rotate-[-11deg] scale-[1.12] md:translate-x-[231px] md:translate-y-[115px] md:scale-[1.59]">
                    <SolarFlow />
                  </div>
                </div>
                <div className="relative z-10">
                  <h2 className="mx-auto max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
                    Launch your lending app with Atlas
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-balance text-muted-foreground">
                    We&apos;re onboarding a select group of projects, curators,
                    institutions and partners ahead of launch. Let&apos;s build
                    together.
                  </p>
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
