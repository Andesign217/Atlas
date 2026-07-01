import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { AtlasLogo } from "@/components/atlas-logo";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { label: "Protocol", href: "#spokes" },
  { label: "Why Atlas", href: "#why" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Partners", href: "#ecosystem" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <a href="#" aria-label="Folks Atlas — home" className="flex items-center">
          <AtlasLogo className="h-6 w-auto text-primary" />
        </a>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-sm text-muted-foreground lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-primary px-4 py-3 font-medium text-primary-foreground transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98]"
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
      </div>
    </header>
  );
}
