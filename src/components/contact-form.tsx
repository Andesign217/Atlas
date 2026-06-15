"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";

/**
 * Form di contatto della sezione finale.
 * NOTA: i copy (label/placeholder) sono PLACEHOLDER, da sostituire.
 * NOTA: il submit non è ancora collegato a un backend/endpoint reale.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const allFilled = Object.values(fields).every((v) => v.trim() !== "");

  function set(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allFilled) return;
    // TODO: collegare a un endpoint reale (es. Formspree / API route / CRM)
    setSent(true);
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
        disabled={!allFilled}
        className="group mt-1 inline-flex items-center justify-center gap-2 justify-self-center rounded-full bg-primary px-7 py-3 font-medium text-primary-foreground transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:opacity-40 disabled:active:scale-100"
      >
        Get in touch
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={20}
          strokeWidth={2}
          className="transition-transform duration-200 group-hover:translate-x-1 group-disabled:translate-x-0"
        />
      </button>
    </form>
  );
}
