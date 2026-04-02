# DESIGN.md — ClawPlex DFW

## Overview

ClawPlex is a DFW AI builders community platform. The visual identity is **dark industrial** — think builder's workshop meets neon-lit terminal. The site should feel like walking into a space where things get built: dark, utilitarian, with splashes of orange light that signal action and energy. No rounded softness. No corporate polish. Raw and functional.

---

## Brand Identity

**Name:** ClawPlex
**Tagline:** "DFW AI Builders — No talks. No slides. Just build."
**Vibe:** Dark industrial terminal, honest tinkerer, anti-conference
**Audience:** AI agent builders, vibe coders, solo developers, local tech community
**Brand color:** Orange `#F97316`

---

## Color Palette

```
claw-void     #09090B   — Page background (near black)
claw-surface  #141416   — Card/section backgrounds
claw-surface-2 #1C1C1F — Elevated surfaces, inputs
claw-border   #27272A   — Borders, dividers
claw-border-hover #3F3F46 — Hover state borders
claw-text     #FAFAFA   — Primary text (off-white)
claw-muted    #A1A1AA   — Secondary text, descriptions
claw-dim      #52525B   — Tertiary text, timestamps, labels
claw-orange   #F97316   — PRIMARY accent (CTAs, highlights, active states)
claw-cyan     #22D3EE   — Secondary accent (agent-related, tech elements)
claw-success  #22C55E   — Success states
claw-error    #ef4444   — Error/destructive states
```

**Usage rules:**
- `claw-void` is the page background. Never use pure `#000`
- `claw-orange` is the action color — CTAs, active states, key highlights
- `claw-cyan` is for agent/tech-specific elements (API docs, agent section)
- Text hierarchy: `claw-text` → `claw-muted` → `claw-dim`
- Borders use `claw-border` by default, `claw-border-hover` on interaction

---

## Typography

```
Display font:  Bebas Neue (Google Fonts) — headlines, hero text, section titles
               Monospaced feel, condensed, all-caps energy
               Used at very large sizes (text-5xl to text-9xl)

Body font:     DM Sans — all body copy, descriptions, UI text
               Clean, readable, modern without being generic

Mono font:     JetBrains Mono — labels, tags, timestamps, code snippets
               All uppercase for labels and tags (tracking-widest)
```

**Scale:**
```
font-display:  Bebas Neue, used at 60px–200px (hero), 40px–80px (section heads)
font-sans:     DM Sans, used at sm–xl (body), 14px–18px line-height 1.6
font-mono:     JetBrains Mono, used at xs–sm (labels, tags, timestamps)
               Always uppercase with letter-spacing: 0.2em for labels
```

---

## Spatial System

```
Section padding:  px-5 md:px-8  horizontal
                  py-20 md:py-32  vertical (standard sections)
                  py-16 md:py-24  vertical (smaller sections)

Card padding:    p-5 md:p-8
Gap between cards: gap-4 to gap-6
Max content width: max-w-7xl (pages), max-w-3xl (text-focused sections)
```

---

## Components

### Buttons

**Primary (orange fill):**
```html
class="border border-claw-orange bg-claw-orange px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 transition-colors"
```
- Used for: main CTAs (RSVP, Subscribe, Join)
- Always use full orange fill, not outline
- Text: claw-void (black text on orange)

**Secondary (outline):**
```html
class="border border-claw-border px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-muted hover:border-claw-orange hover:text-claw-orange transition-colors"
```
- Used for: secondary actions, navigation CTAs

**Ghost/text-only:**
```html
class="font-mono text-xs uppercase tracking-widest text-claw-muted hover:text-claw-text transition-colors"
```
- Used for: inline links, tertiary actions

### Cards

```html
class="border border-claw-border bg-claw-surface p-5 md:p-8 hover:border-claw-border-hover transition-colors"
```
- Background: claw-surface
- Border: claw-border (1px)
- Hover: border → claw-border-hover
- No box shadows (border-contrast only)
- No border-radius (sharp corners — industrial aesthetic)

### Tags / Badges

```html
class="px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-claw-dim bg-claw-surface-2"
```
- Category badges use colored backgrounds:
  - Research: claw-cyan/10 text-claw-cyan
  - Productivity: claw-orange/10 text-claw-orange
  - Social: claw-success/10 text-claw-success
  - Utility: claw-muted

### Form Inputs

```html
class="border border-claw-border bg-claw-surface px-5 py-4 font-mono text-sm text-claw-text placeholder:text-claw-dim focus:border-claw-orange focus:outline-none disabled:opacity-50"
```
- Dark background (claw-surface), not white
- Focus ring: claw-orange border
- Font: mono
- Placeholder: dim

### Section Dividers

```html
class="border-t border-claw-border"
```
- Horizontal rule between sections
- Use sparingly — let the dark background create separation

---

## Backgrounds

**Default page:** solid claw-void (`#09090B`)

**Grid pattern (construction/industrial feel):**
```css
class="grid-bg"
/* CSS: orange-tinted grid lines at 64px intervals, very subtle (3% opacity) */
```

**Orange ambient glow:**
```css
/* Used on hero sections and key CTAs */
class="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-claw-orange/5 blur-[120px] pointer-events-none"
```

**Film grain overlay:**
```css
class="film-grain"
/* SVG noise filter at 2.5% opacity over entire viewport — gives texture */
```

---

## Animation & Motion

**Scroll animations (framer-motion):**
```ts
const ease = [0.25, 0.1, 0.25, 1];
const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease },
};
function stagger(i: number) {
  return { ...fade, transition: { duration: 0.7, ease, delay: i * 0.08 } };
}
```

**Micro-interactions:**
- Cards: `hover:border-claw-border-hover` — subtle border brightening
- Images: `hover:scale-105 transition-transform duration-500` — subtle zoom on gallery
- Buttons: `hover:bg-claw-orange/90` — darken on hover (not lighten)

**Hamburger menu animation (nav):**
- 3-line → X transform using framer-motion `animate`
- Rotate top line +45deg, hide middle, rotate bottom -45deg

---

## Layout Patterns

### Page header (interior pages)
```html
class="border-b border-claw-border grid-bg px-5 md:px-8 py-12 md:py-16"
```
- Grid background
- Section label: mono, xs, uppercase, claw-orange, tracking-widest
- Headline: display font, 4xl-6xl, claw-text

### Stat display
```html
<!-- Large number + small label below -->
class="font-display text-5xl md:text-7xl text-claw-orange"  (number)
class="font-mono text-xs uppercase tracking-widest text-claw-dim mt-2" (label)
```

### Detail row (label + value)
```html
class="font-mono text-xs uppercase tracking-widest text-claw-dim" (label)
class="text-sm font-medium text-claw-text" (value)
```

---

## Navigation

**Desktop (md+):** Horizontal links, gap-8, font-mono xs uppercase
**Mobile (<md):** Hamburger → full-width dropdown panel, same links stacked

Nav always:
- Fixed at top, z-50
- Background: `bg-claw-void/80 backdrop-blur-xl` (translucent dark)
- Border-bottom: `border-b border-claw-border/50`

Links never: use the orange fill button style in nav
CTA (when present): "Join the Node" = orange outline button

---

## Footer

Minimal. Single row or two-column. Logo + nav links + Discord link. Dark, low-key.

---

## Do's and Don'ts

### Do
- Use Bebas Neue for ALL headlines and section titles
- Use font-mono uppercase for labels, tags, badges, timestamps
- Use claw-orange for anything that demands attention (CTAs, active states)
- Use claw-cyan for agent/technology content
- Use grid-bg and film-grain for texture and atmosphere
- Keep corners SHARP (radius: 0px everywhere)
- Use border-contrast for depth, never shadows
- Let large type breathe — generous vertical spacing between sections

### Don't
- Use rounded corners (border-radius: 0 is intentional)
- Use shadows for elevation (use borders or background contrast instead)
- Use blue for primary actions (reserved for tech/agent elements only)
- Use pure white text on dark backgrounds (use claw-text #FAFAFA)
- Use more than 2 accent colors in one view
- Use gradients on large areas (subtle ambient glow only)
- Use Arial, Roboto, or system fonts — always Bebas Neue + DM Sans + JetBrains Mono

---

## CSS Classes Reference

```
Color:     claw-void | claw-surface | claw-border | claw-text | claw-muted
           claw-dim | claw-orange | claw-cyan | claw-success

Backgrounds: bg-claw-void | bg-claw-surface | bg-claw-surface-2

Borders:   border-claw-border | border-claw-border-hover | border-claw-orange

Fonts:     font-display | font-sans | font-mono

Text:      text-claw-text | text-claw-muted | text-claw-dim | text-claw-orange | text-claw-cyan

Size:      text-xs | text-sm | text-base | text-lg | text-xl | text-2xl | text-4xl-9xl (display)

Tracking:  tracking-widest (mono labels) | tracking-\[0.2em\] (section labels)

Padding:   px-5 md:px-8 | py-20 md:py-32 | p-5 md:p-8

Backgrounds (special):
  grid-bg — construction grid pattern
  film-grain — noise texture overlay
```
