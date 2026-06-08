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
  LockKeyIcon,
  Target01Icon,
  UserGroupIcon,
  SourceCodeIcon,
  GithubIcon,
  BookOpen01Icon,
} from "@hugeicons/core-free-icons";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/motion/reveal";
import { VaultFlow } from "@/components/vault-flow";
import { ForbesLogo } from "@/components/forbes-logo";
import { HeroRays } from "@/components/hero-rays";
import { WhyLaser } from "@/components/why-laser";
import { RotatingHeadline } from "@/components/rotating-headline";
import { BorderBeam } from "@/components/border-beam";
import { ContactForm } from "@/components/contact-form";
import { EcosystemFlow } from "@/components/ecosystem-flow";

const stats = [
  ["5+", "years of uninterrupted mainnet operation"],
  ["$13B", "deposited"],
  ["240K+", "total unique users"],
  ["9", "chains supported"],
];

const modules = [
  { icon: SlidersHorizontalIcon, label: "Multi-collateral & multi-borrow" },
  { icon: Analytics01Icon, label: "Custom interest rate models" },
  { icon: SecurityLockIcon, label: "KYC / AML & whitelists" },
  { icon: JusticeScale01Icon, label: "Configurable liquidation engine" },
  { icon: Globe02Icon, label: "Any oracle (Chainlink, Pyth…)" },
  { icon: ViewOffSlashIcon, label: "Privacy module" },
  { icon: ShieldEnergyIcon, label: "Insurance & security modules" },
  { icon: DashboardSquare01Icon, label: "White-label frontend" },
];

const whyCards = [
  {
    k: "Custom Lending Environments: Spokes",
    v: "Create specialized lending environments for any asset class. Configure risk parameters, oracles, interest rate models, liquidations, compliance requirements, and custom modules while maintaining full control.",
  },
  {
    k: "Launch with liquidity from day one: courtesy of the Hubs",
    v: "Access liquidity from the Atlas Hubs to bootstrap new lending markets without facing the cold-start problem and systemic risks.",
  },
  {
    k: "Curated Capital Allocation: Vaults",
    v: "Provide a single entry point to your users with Vaults. Liquidity can be routed across approved Spokes according to predefined allocation limits, risk constraints, and rebalancing logic, enabling tailored lending and yield strategies.",
  },
];

const useCases = [
  {
    icon: Layers01Icon,
    title: "Generalised lending",
    desc: "Recreate a full multi-asset money market with the collateral and borrow parameters you choose.",
  },
  {
    icon: RepeatIcon,
    title: "Efficiency lending",
    desc: "Basket correlated assets together to offer higher LTV ratios for looping and LST strategies.",
  },
  {
    icon: CoinsDollarIcon,
    title: "Single pair markets",
    desc: "Isolated collateral and borrow pairs with dedicated risk parameters.",
  },
  {
    icon: SquareLock02Icon,
    title: "Permissioned lending",
    desc: "Closed environments for institutions and banks, with access control and private deployments.",
  },
  {
    icon: LockKeyIcon,
    title: "Private lending",
    desc: "Formalise off-chain agreements on-chain, with under-collateralised options.",
  },
  {
    icon: Target01Icon,
    title: "Intent-based lending",
    desc: "Fixed-term, fixed-rate positions matched between lenders and borrowers.",
  },
];

const builderPoints = [
  "Deploy your own lending use case in days instead of months or years",
  "Host a white-label frontend under your own brand and domain",
  "Embed yield directly into your product",
  "Manage capital allocation across differentiated strategies",
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
          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-center">
            <Reveal immediate>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
                <RotatingHeadline />
                <span className="block">product onchain</span>
              </h1>
            </Reveal>
            <Reveal immediate delay={0.16}>
              <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
                Folks Atlas enables institutions and builders to deploy
                fully-configurable lending environments for any type of asset
                without the need of rebuilding the stack. Speak with our team to
                explore a tailored integration.
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
        <section className="relative z-10 -mt-20 md:-mt-32 lg:-mt-48">
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
                <p className="mt-4 text-balance text-muted-foreground">
                  Atlas is the next generation of Folks Finance, opened up for
                  everyone to build on.
                </p>
              </div>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(([n, l], i) => (
                <Reveal key={l} delay={i * 0.08} y={16}>
                  <div className="h-full bg-card px-6 py-8 text-center">
                    <div className="text-4xl font-semibold tracking-tight text-primary">
                      {n}
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">{l}</div>
                  </div>
                </Reveal>
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
                  Spokes
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                  Build your own lending environment
                </h2>
                <p className="mt-4 text-muted-foreground">
                  A Spoke is an isolated lending environment you fully control.
                  List as many collateral and borrow assets as you need, then
                  configure every parameter to match your strategy and compliance
                  needs.
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                  <HugeiconsIcon icon={UserGroupIcon} size={20} strokeWidth={2} />
                  Designed for institutions and builders
                </div>
              </div>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {modules.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.05} y={12}>
                  <div
                    className={`flex items-center gap-3 rounded-xl border border-border bg-card p-4 ${cardHover}`}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <HugeiconsIcon icon={m.icon} size={20} strokeWidth={2} />
                    </span>
                    <span className="text-sm font-medium">{m.label}</span>
                  </div>
                </Reveal>
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
                  Vaults
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                  Curated yield, one click away for your users
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Curators can package approved Spokes, allocation targets, and
                  risk controls into a single Vault. Users deposit once and earn
                  yield automatically, while curators manage allocations and
                  rebalancing behind the scenes.
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                  <HugeiconsIcon icon={UserGroupIcon} size={20} strokeWidth={2} />
                  Designed for curators and asset managers
                </div>
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
            <WhyLaser />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-medium uppercase tracking-wider text-primary">
                  Why Atlas
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                  Launch with liquidity from day one
                </h2>
                <p className="mt-4 text-balance text-muted-foreground">
                  Monolithic money markets concentrate liquidity into a single
                  set of rules. Modular systems allow customization, but liquidity
                  becomes fragmented. Atlas introduces a new lending architecture:
                  shared liquidity at the Hubs, and fully configurable lending
                  environments at the Spokes.
                </p>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {whyCards.map((item, i) => (
                <Reveal key={item.k} delay={i * 0.08}>
                  <div className={`h-full rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md ${cardHover}`}>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {item.k}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.v}
                    </p>
                  </div>
                </Reveal>
              ))}
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
                  One protocol, every lending market
                </h2>
                <p className="mt-4 text-muted-foreground">
                  From permissionless lending markets to permissioned
                  institutional venues and real-world assets, configure a Spoke
                  for any need.
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

        {/* ---------- RESEARCH ---------- */}
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-6 py-24">
            <Reveal>
              <div className="flex flex-col items-start gap-8 rounded-3xl border border-border bg-card p-8 md:flex-row md:items-center md:p-12">
                <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <HugeiconsIcon icon={BookOpen01Icon} size={28} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium uppercase tracking-wider text-primary">
                    Research
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                    Onchain Lending: State of the Art
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    We&apos;ve spent over five years building lending products
                    onchain and studying the architectures behind every major
                    lending protocol. This report explores the models, trade-offs,
                    and innovations shaping the future of onchain lending. Read it
                    to understand what we&apos;re building and where we&apos;re
                    coming from, and why it may matter for you.
                  </p>
                </div>
                <a
                  href="#"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Read report
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={18}
                    strokeWidth={2}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- FOR BUILDERS ---------- */}
        <section id="builders" className="border-t border-border">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2">
            <Reveal y={24}>
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-primary">
                  For builders
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                  Ship lending products, not infrastructure
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Focus on your core business and users while Atlas handles the
                  lending engine. Deploy, customize and integrate with developer
                  tooling.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://docs.folks.finance"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98]"
                  >
                    <HugeiconsIcon icon={SourceCodeIcon} size={18} strokeWidth={2} />
                    Read the docs
                  </a>
                  <a
                    href="https://github.com/Folks-Finance"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <HugeiconsIcon icon={GithubIcon} size={18} strokeWidth={2} />
                    GitHub
                  </a>
                </div>
              </div>
            </Reveal>
            <ul className="space-y-4">
              {builderPoints.map((p, i) => (
                <Reveal key={p} delay={i * 0.08} y={16}>
                  <li
                    className={`flex items-center gap-3 rounded-2xl border border-border bg-card p-4 ${cardHover}`}
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={2.5} />
                    </span>
                    <span className="text-sm">{p}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
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
                href="#"
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

        {/* ---------- FINAL CTA ---------- */}
        <section id="contact" className="border-t border-border">
          <div className="mx-auto w-full max-w-7xl px-6 py-24">
            <Reveal y={24}>
              <div className="relative rounded-3xl border border-border bg-muted/30 px-8 py-16 text-center md:px-16 md:py-20">
                <BorderBeam />
                <h2 className="mx-auto max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
                  Launch your lending environment with Atlas
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-balance text-muted-foreground">
                  We&apos;re onboarding a select group of curators, institutions and
                  partners ahead of launch. Let&apos;s build together.
                </p>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
