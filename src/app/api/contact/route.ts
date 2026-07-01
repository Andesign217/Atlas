import { NextResponse } from "next/server";

/**
 * Endpoint del form di contatto.
 * 1) Valida i campi
 * 2) Verifica il token reCAPTCHA v3 lato server (anti-spam)
 * 3) Aggiunge una riga al Google Sheet (via web app Apps Script)
 *
 * Variabili d'ambiente (da impostare su Vercel):
 *  - RECAPTCHA_SECRET_KEY   (segreta)
 *  - SHEETS_WEBHOOK_URL     (URL della web app Apps Script)
 *  - SHEETS_SECRET          (token condiviso, opzionale ma consigliato)
 *
 * Se le env non sono configurate, l'endpoint è "graceful": valida e
 * risponde ok senza salvare (così il sito funziona anche prima del setup).
 */

const RECAPTCHA_MIN_SCORE = 0.5;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const message = String(body.message ?? "").trim();
  const token = String(body.token ?? "");

  if (!name || !email || !company || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // 2) Verifica reCAPTCHA (saltata se la secret non è configurata)
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (secret) {
    try {
      const verify = (await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ secret, response: token }),
        },
      ).then((r) => r.json())) as { success?: boolean; score?: number };

      if (!verify.success || (verify.score ?? 0) < RECAPTCHA_MIN_SCORE) {
        return NextResponse.json(
          { error: "Spam check failed" },
          { status: 400 },
        );
      }
    } catch {
      return NextResponse.json({ error: "Verification error" }, { status: 502 });
    }
  }

  // 3) Append su Google Sheet via web app Apps Script (saltato se non configurato)
  const sheetsUrl = process.env.SHEETS_WEBHOOK_URL;
  if (sheetsUrl) {
    try {
      const res = await fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.SHEETS_SECRET ?? "",
          name,
          email,
          company,
          message,
        }),
      });
      if (!res.ok) {
        console.error("Sheets webhook failed:", res.status, await res.text());
        return NextResponse.json({ error: "Could not save" }, { status: 500 });
      }
    } catch (e) {
      console.error("Sheets webhook error:", e);
      return NextResponse.json({ error: "Could not save" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
