"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Ritardo in secondi (utile per stagger su griglie) */
  delay?: number;
  /** Spostamento iniziale sull'asse Y in px (default 16) */
  y?: number;
  /** Anima all'ingresso nel viewport (default) o subito al mount */
  immediate?: boolean;
  /** Anima una sola volta (default true). Se false, ri-anima ad ogni ingresso. */
  once?: boolean;
};

// Easing morbido "professionale" (cubic-bezier simile a quello di Linear/Vercel)
const EASE = [0.22, 0.61, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  immediate = false,
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  // Accessibilità: nessuna trasformazione se l'utente preferisce meno movimento
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const animateProps = immediate
    ? { animate: { opacity: 1, y: 0 } }
    : {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once, amount: 0.25, margin: "0px 0px -10% 0px" },
      };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      {...animateProps}
    >
      {children}
    </motion.div>
  );
}
