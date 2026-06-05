#!/usr/bin/env python3
"""Genera tokens.css (semantici + primitivi) dai design token Figma esportati."""
import json, os

BASE = os.path.dirname(__file__)
light = json.load(open(os.path.join(BASE, "colors/Light.tokens.json")))
dark  = json.load(open(os.path.join(BASE, "colors/Dark.tokens.json")))
vars_ = json.load(open(os.path.join(BASE, "variables/Mode 1.tokens.json")))

def hex_with_alpha(hexv, alpha):
    """Ritorna #RRGGBB se alpha==1, altrimenti #RRGGBBAA."""
    if alpha >= 0.999:
        return hexv
    a = round(alpha * 255)
    return f"{hexv}{a:02X}"

def collect_colors(o, prefix="", out=None):
    if out is None: out = {}
    if isinstance(o, dict):
        if "$value" in o and isinstance(o["$value"], dict) and "hex" in o["$value"]:
            out[prefix] = (o["$value"]["hex"], round(o["$value"].get("alpha", 1), 4))
        else:
            for k, v in o.items():
                if k.startswith("$"): continue
                collect_colors(v, f"{prefix}/{k}" if prefix else k, out)
    return out

def collect_nums(o, prefix="", out=None):
    if out is None: out = {}
    if isinstance(o, dict):
        if "$value" in o and not isinstance(o["$value"], dict):
            out[prefix] = o["$value"]
        else:
            for k, v in o.items():
                if k.startswith("$"): continue
                collect_nums(v, f"{prefix}/{k}" if prefix else k, out)
    return out

L = collect_colors(light)
D = collect_colors(dark)
N = collect_nums(vars_)

def css_var_name(path):
    # primary/background/100 -> --primary-background-100
    # spacing/0,5 -> --spacing-0_5 (la virgola non è valida in un nome CSS)
    return "--" + path.replace("/", "-").replace(",", "_").replace(" ", "-")

def color_block(colors):
    lines = []
    for path in colors:
        hexv, alpha = colors[path]
        lines.append(f"    {css_var_name(path)}: {hex_with_alpha(hexv, alpha)};")
    return "\n".join(lines)

# --- primitivi numerici ---
def num_block():
    lines = []
    px_groups = ("radius", "border-width", "blur", "container", "spacing", "font/size", "font/tracking")
    for path, val in N.items():
        name = css_var_name(path)
        if path.startswith("opacity/"):
            lines.append(f"    {name}: {val}%;")
        elif path.startswith("font/weight"):
            lines.append(f"    {name}: {int(val)};")
        elif path.startswith("font/tracking"):
            lines.append(f"    {name}: {round(val,3)}px;")
        elif path.startswith(px_groups):
            v = val if val == int(val) else round(val, 3)
            v = int(v) if isinstance(v, float) and v.is_integer() else v
            lines.append(f"    {name}: {v}px;")
        else:
            lines.append(f"    {name}: {val};")
    return "\n".join(lines)

css = f"""/* ============================================================
   FOLKS ATLAS — Design Tokens
   Generato da Figma Design Library (Colors/Variables/Icons)
   Font brand: Instrument Sans
   ============================================================ */

:root {{
    /* ---- Tipografia ---- */
    --font-sans: "Instrument Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

    /* ---- Primitivi (radius, spacing, blur, font, opacity, container) ---- */
{num_block()}

    /* ---- Icone ---- */
    --icon-size-12: 12px;  --icon-border-12: 1.5px;
    --icon-size-16: 16px;  --icon-border-16: 1.5px;
    --icon-size-20: 20px;  --icon-border-20: 2px;
    --icon-size-24: 24px;  --icon-border-24: 2px;

    /* ---- Colori — LIGHT (default) ---- */
{color_block(L)}
}}

.dark {{
    /* ---- Colori — DARK ---- */
{color_block(D)}
}}
"""

out_dir = os.path.join(os.path.dirname(BASE), "src", "styles")
os.makedirs(out_dir, exist_ok=True)
out_path = os.path.join(out_dir, "tokens.css")
open(out_path, "w").write(css)
print("Scritto:", out_path)
print("Variabili colore (per modo):", len(L))
print("Primitivi numerici:", len(N))
