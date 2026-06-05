# Folks Atlas — Identità Visiva

Design system estratto dalla Figma Design Library (Folks Atlas).
Stile: **shadcn/ui + Tailwind**, con supporto **Light & Dark mode**.
Token pronti all'uso: [`src/styles/tokens.css`](src/styles/tokens.css)

---

## 🎨 Colori

Ogni colore ha una rampa di opacità da `10` a `100` (es. `--primary-background-40`).
Di seguito i valori canonici (opacità 100%).

### Brand
| Ruolo | Light | Dark |
|---|---|---|
| **Primary** (bg) | `#0260ED` | `#1C76FF` |
| Primary (testo) | `#F0F3F7` | `#F0F3F7` |
| **Secondary** (bg) | `#0252CC` | `#4D93FF` |
| **Accent** (bg) | `#0260ED` | `#1C76FF` |

### Superfici & testo
| Ruolo | Light | Dark |
|---|---|---|
| **Base** background | `#F0F3F7` | `#09090A` |
| **Base** foreground (testo) | `#09090A` | `#F0F3F7` |
| **Card / Popover** bg | `#E6EDF7` | `#111213` |
| **Muted** bg | `#CFD8E5` | `#22252A` |
| **Muted** foreground | `#3C3E41` | `#BDBFC4` |
| **Border / Input** | `#CFD8E5` | `#22252A` |

### Stati (feedback)
| Ruolo | Light | Dark |
|---|---|---|
| **Success** | `#22A13F` | `#20AB40` |
| **Destructive** | `#D92121` | `#FF4C4C` |
| **Warning** | `#FFD207` | `#FFC107` |

> Blu = colore identitario forte. Sfondo chiaro tendente all'azzurro freddo (`#F0F3F7`), scuro quasi-nero (`#09090A`).

---

## 🔤 Tipografia

- **Font:** `Instrument Sans` (fallback: system-ui)
- Titoli grandi con **tracking negativo marcato** (look serrato, moderno/fintech)

**Pesi:** `400` normal · `500` medium · `600` semibold · `700` bold

**Scala (px):**
`xs 12 · sm 14 · base 16 · lg 18 · xl 20 · 2xl 24 · 3xl 30 · 4xl 36 · 5xl 48 · 6xl 60 · 7xl 72 · 8xl 96 · 9xl 128`

**Tracking:** tighter `-0.8` · tight `-0.4` · normal `0` · wide `0.4` · wider `0.8` · widest `1.6`

---

## 📐 Spacing

Scala a multipli di 4px: `1=4 · 2=8 · 3=12 · 4=16 · 5=20 · 6=24 · 8=32 · 10=40 · 12=48 · 16=64 · 20=80 · 24=96 …` (fino a 384px) + `0,5=2px`.

## 🔲 Border radius
`none 0 · lg 8 · 2xl 16 · 3xl 24 · 4xl 32 · full 9999`

## 🌫️ Blur
`xs 4 · sm 8 · md 12 · lg 16 · xl 24 · 2xl 40 · 3xl 64`

## 📦 Container (max-width)
`xs 320 · 5xl 1024 · 7xl 1280`

## 🔳 Icone — HugeIcons

Libreria icone ufficiale del progetto: **[HugeIcons](https://hugeicons.com/)** (per coerenza in tutto il sito).

| Size | Stroke |
|---|---|
| 12px | 1.5 |
| 16px | 1.5 |
| 20px | 2 |
| 24px | 2 |

Lo stroke di HugeIcons è regolabile (`strokeWidth`) → usa **1.5** per le icone piccole (12/16) e **2** per quelle grandi (20/24), come da token Figma.

**Pacchetti (React):**
```bash
npm i @hugeicons/react @hugeicons/core-free-icons
```
```jsx
import { HugeiconsIcon } from "@hugeicons/react";
import { Home01Icon } from "@hugeicons/core-free-icons";

<HugeiconsIcon icon={Home01Icon} size={24} strokeWidth={2} color="var(--base-foreground-100)" />
```
> Per HTML puro: usare gli SVG scaricati da hugeicons.com (stile *Stroke Rounded*) e impostare `stroke-width` + `currentColor`.

---

## 🛠️ Come usarli

`src/styles/tokens.css` definisce tutte le variabili sotto `:root` (Light) e `.dark` (Dark).

```css
@import "./styles/tokens.css";

.btn-primary {
  background: var(--primary-background-100);
  color: var(--primary-foreground-100);
  border-radius: var(--radius-lg);
  padding: var(--spacing-3) var(--spacing-6);
  font-family: var(--font-sans);
  font-weight: var(--font-weight-semibold);
}
```

Per il dark mode basta aggiungere la classe `.dark` su `<html>` o `<body>`.

---

### File sorgente (Figma export)
Gli archivi originali sono in `_figma_assets/` (Colors, Icons, Variables) + lo script `build_tokens.py` che rigenera il CSS.
