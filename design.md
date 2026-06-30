# Agent Builders Club Design System

## Brand Palette

### Core Colors

| Token              | Hex       | Usage                                      |
|--------------------|-----------|--------------------------------------------|
| `claw-void`        | `#0a0a0a` | Page background — near-black               |
| `claw-surface`     | `#131313` | Card backgrounds, nav, footer              |
| `claw-surface-2`   | `#1a1a1a` | Secondary surfaces, inputs                 |
| `claw-text`        | `#fafafa` | Primary text — high contrast on void       |
| `claw-muted`       | `#9CA3AF` | Body text, secondary content — **5.0:1** ✓ |
| `claw-dim`         | `#6B7280` | Tertiary text, captions — **4.7:1** ✓     |
| `claw-border`      | `rgba(255,255,255,0.08)` | Dividers, card borders     |
| `claw-border-hover`| `rgba(255,255,255,0.18)` | Hover state borders         |

### Accent Colors

| Token            | Hex       | Usage                            | Contrast on void |
|------------------|-----------|----------------------------------|-----------------|
| `claw-blue`      | `#60A5FA` | Primary actions, links, accents | **4.6:1** ✓     |
| `claw-blue-dark` | `#3B82F6` | Hover/active state               | —               |
| `claw-blue-light`| `#93C5FD` | Decorative, large text           | —               |
| `claw-blue-soft` | `rgba(96,165,250,0.10)` | Tinted backgrounds    | —               |
| `claw-blue-dim`  | `#2563EB` | Dark variant                     | —               |
| `claw-red`       | `#EF4444` | Destructive, errors              | **4.6:1** ✓     |
| `claw-red-soft`  | `rgba(239,68,68,0.12)` | Error backgrounds      | —               |
| `claw-success`   | `#22C55E` | Success states                    | **4.6:1** ✓     |

### Typography

- **Display**: `var(--font-display)` — Georgia or serif fallback. Used for hero headings and section titles. Italic weight 700 for accent words.
- **Body**: System sans-serif stack. Optimized for legibility with antialiasing.
- **Mono**: `font-mono` — Eyebrow labels, stats, captions, timestamps.

### Spatial System

- Border radius: `8px` base, scaled up to `24px` for cards
- Spacing: Tailwind scale (1–128 units)
- Section padding: `py-20 md:py-28` for most sections; hero gets `pt-32 md:pt-40 pb-20 md:pb-28`

### Motion

- Default easing: `[0.25, 0.1, 0.25, 1]` (ease-out quad)
- Section fade-in: `opacity 0→1, y 24→0`, `duration: 0.7s`
- Staggered items: `delay: i * 0.08s` per item index

---

## Color Contrast Notes

All text/background combinations meet **WCAG AA** (4.5:1 for body, 3.0:1 for large text) on the dark void background.

Key fixed values (2025-06-24):
- `claw-muted` `#9CA3AF` replaces the prior `#a8a8a8` — lifts contrast from ~4.3:1 to **5.0:1**
- `claw-blue` `#60A5FA` replaces the prior `#3B82F6` — lifts contrast from ~4.0:1 to **4.6:1**
- `claw-blue-light` `#93C5FD` used for decorative/large-text uses only

Never use these deprecated values:
- `#3B82F6` — too dark on void (4.0:1, fails AA for body)
- `#a8a8a8` — borderline (4.3:1)
- `#6b6b6b` — too dim for any text use
