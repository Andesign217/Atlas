"use client";

import { useEffect, useState } from "react";
import { LaserFlow } from "@/components/laser-flow";

/**
 * Laser Flow di sfondo per la sezione "Why Atlas".
 * Colore tema-aware: dark → #1C76FF, light → #0260ED.
 */
export function WhyLaser() {
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
    <LaserFlow
      color={dark ? "#1C76FF" : "#0260ED"}
      wispDensity={0.7}
      flowSpeed={0.4}
      verticalSizing={3.4}
      horizontalSizing={1.65}
      fogIntensity={1}
      fogScale={0.1}
      flowStrength={0.55}
      className="h-full w-full"
    />
  );
}
