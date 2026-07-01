import { HugeiconsIcon } from "@hugeicons/react";
import {
  NewTwitterIcon,
  Linkedin01Icon,
  MediumIcon,
  DiscordIcon,
  TelegramIcon,
  InstagramIcon,
  RedditIcon,
  GithubIcon,
  BookOpen01Icon,
} from "@hugeicons/core-free-icons";
import { AtlasLogo } from "@/components/atlas-logo";

const columns = [
  {
    title: "About",
    links: [
      { label: "Folks Finance", href: "https://folks.finance" },
      { label: "$FOLKS", href: "#" },
      { label: "Governance", href: "#" },
      { label: "Brand Assets", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy & Cookie Policy", href: "#" },
      { label: "Folks Finance DeFi T&C", href: "#" },
      { label: "FOLKS Token T&C", href: "#" },
    ],
  },
];

const socials = [
  { icon: NewTwitterIcon, label: "X", href: "https://x.com/FolksFinance" },
  { icon: Linkedin01Icon, label: "LinkedIn", href: "https://www.linkedin.com/company/folksfinance/" },
  { icon: MediumIcon, label: "Medium", href: "https://folksfinance.medium.com/" },
  { icon: DiscordIcon, label: "Discord", href: "https://discord.com/invite/folksfinance" },
  { icon: TelegramIcon, label: "Telegram", href: "https://t.me/FolksfinanceOfficial" },
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/folksfinance/" },
  { icon: RedditIcon, label: "Reddit", href: "https://www.reddit.com/r/FolksFinance/" },
  { icon: GithubIcon, label: "GitHub", href: "https://github.com/Folks-Finance" },
  { icon: BookOpen01Icon, label: "Docs", href: "https://docs.folks.finance" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-16">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <AtlasLogo className="h-6 w-auto text-primary" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The open infrastructure layer for onchain lending. Built by Folks
              Finance.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map((s) => {
                const external = s.href.startsWith("http");
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    {...(external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    aria-label={s.label}
                    className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <HugeiconsIcon icon={s.icon} size={18} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {col.links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(external
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className="transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Separazione full-width + riga copyright con padding simmetrico */}
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <span>© 2026 Folks Finance. All rights reserved.</span>
          <span>Folks Atlas - infrastructure for lending.</span>
        </div>
      </div>
    </footer>
  );
}
