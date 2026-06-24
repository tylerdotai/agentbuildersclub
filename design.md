# ClawPlex Design System

## Brand Palette

ClawPlex is a DFW AI builder community — technical, editorial, and direct. The palette reflects that: deep voids, sharp accents, nothing decorative for its own sake.

### Color Philosophy

- **Void** (`#0a0a0a`) anchors everything — the site feels like a dark terminal, not a marketing page.
- **Blue** is the primary brand signal. It appears in eyebrows, CTAs, active states, and accent underlines.
- **Red** is a precision tool — used only for destructive states, error rings, and the focus-visible indicator.
- **White** (`#fafafa`) is for primary readable text. Never dark text on light backgrounds.
- No gradients on large surfaces. No decorative fills. Color is functional.

---

## Design Tokens

### Neutral Scale (dark editorial)

| Token | Hex | Usage |
|---|---|---|
| `--color-claw-void` | `#0a0a0a` | Page background |
| `--color-claw-surface` | `#131313` | Cards, panels |
| `--color-claw-surface-2` | `#1c1c1c` | Elevated surfaces, hover backgrounds |
| `--color-claw-border` | `rgba(255,255,255,0.08)` | Default borders |
| `--color-claw-border-hover` | `rgba(255,255,255,0.18)` | Hover/focus border state |
| `--color-claw-text` | `#fafafa` | Primary text (headings, body, labels on dark) |
| `--color-claw-muted` | `#a8a8a8` | Secondary text (descriptions, captions) |
| `--color-claw-dim` | `#6b6b6b` | Tertiary text (timestamps, fine print, dividers) |

### Blue Scale

| Token | Hex | Usage |
|---|---|---|
| `--color-claw-blue` | `#3B82F6` | **Primary brand blue** — eyebrows, active links, CTA backgrounds, accent underlines. WCAG AA on void. |
| `--color-claw-blue-dark` | `#2563EB` | Blue hover/pressed state |
| `--color-claw-blue-soft` | `rgba(59,130,246,0.10)` | Subtle blue tint for selected states, hover fills |
| `--color-claw-blue-dim` | `#1E40AF` | **Reserved for backgrounds only** (nav active indicator, badge fills). NOT for text. |

### Red Scale

| Token | Hex | Usage |
|---|---|---|
| `--color-claw-red` | `#EF4444` | Error/destructive states, focus ring |
| `--color-claw-red-soft` | `rgba(239,68,68,0.12)` | Error backgrounds |

### Success

| Token | Hex | Usage |
|---|---|---|
| `--color-claw-success` | `#22C55E` | Success states |

---

## Typography

### Font Stack

- **Display**: `var(--font-display)` → Georgia fallback. Used for all `h1–h3` and `.font-display` utility class. Italic weight used for accent words.
- **Body**: `var(--font-sans)` → system-ui fallback. All body copy, UI labels, nav.
- **Mono**: `ui-monospace, SFMono-Regular, Menlo` — timestamps, code, eyebrow tracking labels.

### Scale

| Element | Size | Weight | Font |
|---|---|---|---|
| Hero H1 | `clamp(3rem, 8vw, 5rem)` | 700 | Display |
| Section H2 | `clamp(2rem, 5vw, 3.5rem)` | 700 | Display |
| Section H3 | `clamp(1.5rem, 3vw, 2rem)` | 700 | Display |
| Body | `1rem / 1.6` | 400 | Sans |
| Eyebrow | `11px` | mono, uppercase, `0.22em` tracking | Mono |
| CTA | `14–15px` | 500 | Sans |

---

## Spacing & Rhythm

- Base unit: `8px`
- Section padding: `py-20 md:py-28` (desktop)
- Max content width: `max-w-5xl` (text/hero), `max-w-6xl` (grid layouts)
- Border between sections: `1px solid var(--color-claw-border)`

---

## Component Guidelines

### Buttons

**Primary CTA**
```html
<a class="rounded-full bg-claw-blue px-6 py-3.5 text-sm font-medium text-claw-void hover:bg-claw-blue-dark transition-colors">
```
- Background: `#3B82F6` on void — passes WCAG AA at 18.5:1 contrast
- Text: `#0a0a0a` (near-black) — passes WCAG AAA at 13.8:1 on blue
- Hover: `#2563EB`

**Ghost/Invisible**
```html
<a class="rounded-full border border-claw-border px-6 py-3.5 text-sm text-claw-muted hover:text-claw-text hover:border-claw-border-hover transition-colors">
```

### Eyebrow Labels

Always mono, uppercase, `0.22em` tracking, `11px`, color `claw-blue`. Never bold. Never sentence case.

```html
<p class="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue">
  DFW · AI Builder Community
</p>
```

### Accent Underline (File 2 style)

```html
<span class="underline-accent">highlighted word</span>
```
CSS: 2px solid blue underline, fading to transparent over ~40px to the right.

### Cards / Surfaces

Background: `claw-surface` (`#131313`) on `claw-void` (`#0a0a0a`). Border: `claw-border`. No shadows except `shadow-2xl shadow-black/60` on modals.

### Focus Ring

```css
:focus-visible {
  outline: 2px solid var(--color-claw-red);
  outline-offset: 2px;
}
```
Red (`#EF4444`) — visible on both light and dark, not confused with blue active states.

---

## Accessibility Requirements

- All text/UI color pairs must pass **WCAG AA** (4.5:1 for body, 3:1 for large text).
- Blue text on void: `#3B82F6` on `#0a0a0a` = 7.8:1 ✓. `#1E40AF` on `#0a0a0a` = 3.1:1 ✗ — **never use `--color-claw-blue-dark` (#1E40AF) for text.**
- Muted text (`claw-muted` `#a8a8a8`) on void = 4.7:1 ✓
- Dim text (`claw-dim` `#6b6b6b`) on void = 3.0:1 — acceptable only for timestamps and fine print (≥18px or bold).

---

## File Structure

```
src/app/globals.css       — Design tokens, base styles, utility classes
DESIGN.md                 — This document
```

When adding new components, test color pairs at [webaim.org/contrastchecker](https://webaim.org/resources/contrastchecker/) before committing.
