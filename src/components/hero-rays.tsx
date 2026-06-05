"use client";

import { useEffect, useState } from "react";
import LightRays from "@/components/light-rays";

/**
 * Wrapper tema-aware per i Light Rays dell'hero.
 * Il colore dei raggi segue il primary del tema attivo:
 *  - dark  → #1C76FF
 *  - light → #0260ED
 * Osserva la classe `.dark` su <html> per aggiornarsi al toggle.
 */
export function HeroRays() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setDark(el.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <LightRays
      raysOrigin="top-center"
      raysColor={dark ? "#1C76FF" : "#0260ED"}
      lightSpread={0.7}
      rayLength={1.8}
      pulsating
      fadeDistance={2.7}
      saturation={1.6}
      followMouse={false}
      noiseAmount={0.1}
      className="h-full w-full opacity-50 dark:opacity-100"
    />
  );
}
