/**
 * Carosello partner: scorrimento orizzontale lento e continuo (marquee).
 * La lista è duplicata e l'animazione trasla del 50% → loop senza stacchi.
 * I loghi sono renderizzati in MONOCROMIA adattiva (scuri su light mode,
 * bianchi su dark mode) per coerenza visiva e leggibilità in entrambi i temi.
 */

type Partner = {
  name: string;
  url?: string; // sito ufficiale
  logo?: string; // SVG monocromo (filtro per tema)
  lightLogo?: string; // versione a colori per light mode
  darkLogo?: string; // versione a colori per dark mode
};

const partners: Partner[] = [
  { name: "Chainlink", logo: "chainlink.svg", url: "https://chain.link/" },
  { name: "USDC", logo: "usdc.svg", url: "https://www.circle.com/" },
  { name: "EURC", logo: "eurc.svg", url: "https://www.circle.com/" },
  { name: "USDT0", logo: "usdt0.svg", url: "https://usdt0.to/" },
  { name: "Avant", logo: "avant.svg", url: "https://www.avantprotocol.com/" },
  { name: "Solv", logo: "solv.svg", url: "https://solv.finance/" },
  { name: "Stake.Link", logo: "stakelink.svg", url: "https://stake.link/" },
  { name: "Maple", logo: "maple.svg", url: "https://maple.finance/" },
  { name: "Agora", logo: "agora.svg", url: "https://www.agora.finance/" },
  { name: "Ether.fi", logo: "etherfi.svg", url: "https://www.ether.fi/" },
  { name: "LFJ", lightLogo: "lfj-light.png", darkLogo: "lfj-dark.png", url: "https://lfj.gg/" },
  { name: "Lido", logo: "lido.svg", url: "https://lido.fi/" },
  { name: "Alphaping", logo: "alphaping.svg", url: "https://alphaping.ch/" },
  { name: "Re7", logo: "re7.svg", url: "https://re7.capital/" },
  { name: "RockawayX", logo: "rockawayx.svg", url: "https://www.rockawayx.com/" },
];

export function PartnersMarquee() {
  const items = [...partners, ...partners];
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] [transform:translateZ(0)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <ul className="flex w-max items-center gap-x-16 will-change-transform [backface-visibility:hidden] [-webkit-backface-visibility:hidden] motion-safe:animate-[marquee_55s_linear_infinite] group-hover:[animation-play-state:paused]">
        {items.map((p, i) => {
          const dup = i >= partners.length;
          // pointer-events-none + select-none sulle immagini: evita che Safari
          // attivi Live Text/Data Detectors (es. "stake.link" letto come dominio).
          // I click restano sul link <a>; l'hover è gestito a livello di <li>.
          const content =
            p.lightLogo || p.darkLogo ? (
              // Logo illustrato a colori: due versioni, switch per tema (no monocromia)
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/partners/${p.lightLogo}`}
                  alt={p.name}
                  draggable={false}
                  className="pointer-events-none h-6 w-auto select-none opacity-80 transition-opacity duration-300 group-hover/logo:opacity-100 motion-reduce:transition-none [-webkit-user-select:none] md:h-7 dark:hidden"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/partners/${p.darkLogo}`}
                  alt={p.name}
                  draggable={false}
                  className="pointer-events-none hidden h-6 w-auto select-none opacity-80 transition-opacity duration-300 group-hover/logo:opacity-100 motion-reduce:transition-none [-webkit-user-select:none] md:h-7 dark:block"
                />
              </>
            ) : p.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/partners/${p.logo}`}
                alt={p.name}
                draggable={false}
                className="pointer-events-none h-6 w-auto select-none opacity-55 transition-opacity duration-300 [filter:brightness(0)] group-hover/logo:opacity-100 motion-reduce:transition-none [-webkit-user-select:none] md:h-7 dark:opacity-60 dark:[filter:brightness(0)_invert(1)]"
              />
            ) : (
              <span className="whitespace-nowrap text-2xl font-semibold tracking-tight text-foreground/55 transition-colors duration-300 group-hover/logo:text-foreground md:text-3xl">
                {p.name}
              </span>
            );
          return (
            <li
              key={i}
              aria-hidden={dup}
              className="group/logo flex shrink-0 items-center"
            >
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={p.name}
                  tabIndex={dup ? -1 : 0}
                  className="flex items-center"
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
