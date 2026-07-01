"use client";

import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";

/**
 * Form di contatto della sezione finale.
 * Invia a /api/contact (verifica reCAPTCHA v3 + salvataggio su Supabase).
 */
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (key: string, opts: { action: string }) => Promise<string>;
    };
  }
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const allFilled = Object.values(fields).every((v) => v.trim() !== "");

  // Carica lo script reCAPTCHA v3 una sola volta (solo se la site key è configurata)
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || document.getElementById("recaptcha-v3")) return;
    const s = document.createElement("script");
    s.id = "recaptcha-v3";
    s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  function set(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));
  }

  async function getRecaptchaToken(): Promise<string> {
    if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) return "";
    return new Promise((resolve) => {
      window.grecaptcha!.ready(() => {
        window
          .grecaptcha!.execute(RECAPTCHA_SITE_KEY!, { action: "contact" })
          .then(resolve)
          .catch(() => resolve(""));
      });
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allFilled || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const token = await getRecaptchaToken();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, token }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none backdrop-blur-md transition-colors focus:bg-background/90";
  // pl-4 allinea il testo del titolo con il testo dentro la casella (px-4)
  const labelClass = "mb-1.5 block pl-4 text-sm font-medium text-foreground";

  if (sent) {
    return (
      <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-border bg-background/60 px-6 py-10 text-center backdrop-blur-md">
        <span className="grid size-12 place-items-center rounded-full bg-primary/15 text-primary">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} size={28} strokeWidth={2} />
        </span>
        <p className="text-lg font-semibold text-foreground">Thanks for your interest.</p>
        <p className="text-sm text-muted-foreground">
          The team will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 grid w-full max-w-xl gap-3 text-left"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={fields.name}
            onChange={set("name")}
            required
            placeholder="Satoshi Nakamoto"
            aria-label="Full name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Work email
          </label>
          <input
            id="email"
            type="email"
            value={fields.email}
            onChange={set("email")}
            required
            placeholder="satoshi@gmail.com"
            aria-label="Work email"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="company" className={labelClass}>
          What&apos;s your company website?
        </label>
        <input
          id="company"
          type="text"
          value={fields.company}
          onChange={set("company")}
          required
          placeholder="www.bitcoin.org"
          aria-label="Company website"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="usecase" className={labelClass}>
          Describe your use case
        </label>
        <p className="mb-2 mt-[-2px] pl-4 text-xs text-muted-foreground">
          {"In a couple of sentences, please share what you're interested in building with Folks Atlas"}
        </p>
        <textarea
          id="usecase"
          value={fields.message}
          onChange={set("message")}
          required
          rows={4}
          placeholder="I'd like to explore using Folks Atlas to launch a looping strategy market for our LST, enabling users to access leveraged yield opportunities in a configurable and controlled lending environment."
          aria-label="Describe your use case"
          className={`${inputClass} resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={!allFilled || submitting}
        className="group mt-1 inline-flex items-center justify-center gap-2 justify-self-center rounded-full bg-primary px-7 py-3 font-medium text-primary-foreground transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:opacity-40 disabled:active:scale-100"
      >
        {submitting ? "Sending…" : "Get in touch"}
        {!submitting && (
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={20}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover:translate-x-1 group-disabled:translate-x-0"
          />
        )}
      </button>
      {error && (
        <p className="text-center text-sm text-destructive">{error}</p>
      )}
      <p className="mt-1 text-center text-[11px] leading-relaxed text-muted-foreground/70">
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </form>
  );
}
