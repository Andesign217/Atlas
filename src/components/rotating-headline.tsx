"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const WORDS = ["lending", "credit", "RWA", "yield", "vault", "stablecoin"];
const EASE = [0.22, 0.61, 0.36, 1] as const;

const TYPE_MS = 90; // velocità digitazione (per carattere)
const DELETE_MS = 45; // velocità cancellazione
const HOLD_MS = 1500; // pausa a parola completa
const EMPTY_MS = 450; // pausa a parola vuota

/**
 * Prima riga dell'H1: "Launch your [parola]".
 * La parola viene digitata e cancellata un carattere alla volta (typing).
 * Ad ogni carattere il testo vicino ("Launch your") scorre in modo fluido
 * grazie alla layout animation, della larghezza del carattere aggiunto/tolto.
 * Mobile: la parola va sulla propria riga (basis-full) per evitare overflow.
 */
export function RotatingHeadline() {
  const reduce = useReducedMotion();
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    const full = WORDS[wordIdx];

    // Movimento ridotto: niente typing, mostra la parola intera e ruota
    if (reduce) {
      setText(full);
      const t = setTimeout(
        () => setWordIdx((i) => (i + 1) % WORDS.length),
        2600,
      );
      return () => clearTimeout(t);
    }

    if (phase === "typing") {
      if (text.length < full.length) {
        const t = setTimeout(
          () => setText(full.slice(0, text.length + 1)),
          TYPE_MS,
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("deleting"), HOLD_MS);
      return () => clearTimeout(t);
    }

    // deleting
    if (text.length > 0) {
      const t = setTimeout(
        () => setText(full.slice(0, text.length - 1)),
        DELETE_MS,
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setWordIdx((i) => (i + 1) % WORDS.length);
      setPhase("typing");
    }, EMPTY_MS);
    return () => clearTimeout(t);
  }, [text, phase, wordIdx, reduce]);

  return (
    <motion.span
      layout="position"
      transition={{ layout: { duration: 0.18, ease: EASE } }}
      className="flex flex-wrap items-baseline justify-center gap-x-[0.28em] md:inline-flex md:flex-nowrap"
    >
      <span>Launch your</span>
      <span className="basis-full text-center md:basis-auto md:text-left">
        <span className="whitespace-nowrap text-primary">{text}</span>
        <span
          aria-hidden
          className="ml-[0.04em] inline-block h-[0.78em] w-[0.05em] translate-y-[0.06em] animate-pulse rounded-full bg-primary align-baseline"
        />
      </span>
    </motion.span>
  );
}
