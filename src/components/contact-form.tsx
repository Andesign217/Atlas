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

  if (sent) {
    return (
      <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-border bg-background/60 px-6 py-10 text-center backdrop-blur-md">
        <span className="grid size-12 place-items-center rounded-full bg-primary/15 text-primary">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} size={28} strokeWidth={2} />
        </span>
        <p className="text-lg font-semibold text-foreground">Thanks, we&apos;ll be in touch.</p>
        <p className="text-sm text-muted-foreground">
          Our team will reach out shortly. {/* placeholder copy */}
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
        <input
          type="text"
          value={fields.name}
          onChange={set("name")}
          required
          placeholder="Full name"
          aria-label="Full name"
          className={inputClass}
        />
        <input
          type="email"
          value={fields.email}
          onChange={set("email")}
          required
          placeholder="Work email"
          aria-label="Work email"
          className={inputClass}
        />
      </div>
      <input
        type="text"
        value={fields.company}
        onChange={set("company")}
        required
        placeholder="What's your company website?"
        aria-label="Company website"
        className={inputClass}
      />
      <textarea
        value={fields.message}
        onChange={set("message")}
        required
        rows={4}
        placeholder="Describe your use case (In a couple of sentences, please provide context on what you are interested in Folks Atlas for)"
        aria-label="Describe your use case"
        className={`${inputClass} resize-none`}
      />
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
