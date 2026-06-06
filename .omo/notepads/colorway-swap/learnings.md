
## Task 1 - globals.css token swap (2026-06-06)
- Swapped orange primary (#fb7312) → royal blue (#1E40AF) across @theme inline and :root blocks
- Added claw-blue-light (#3B82F6), claw-red (#DC2626), claw-red-soft tokens
- Removed claw-orange, claw-orange-soft, claw-cyan tokens
- Updated ::selection, :focus-visible, .underline-accent::after to new palette
- typecheck ✓, lint ✓ — all old tokens gone

## Task 2 - newsletter components (2026-06-06)
- Swapped 18 `claw-orange` → `claw-blue` across 3 files:
  - issue-client.tsx (9 occurrences)
  - newsletter-client.tsx (7 occurrences)
  - subscribe-form-client.tsx (2 occurrences)
- All class variants: text-*, border-*, bg-*, hover:*, focus:* + opacity modifiers
- lint ✓, typecheck ✓
- Commit: `style(newsletter): rename claw-orange → claw-blue`

## Task 2 - nav.tsx + footer.tsx + layout.tsx token swap (2026-06-06)
- nav.tsx: 5 occurrences — bg-claw-orange → bg-claw-blue (×3), text-claw-orange → text-claw-blue (×1), border-claw-orange → border-claw-blue (×1), hover:bg-[#ff8a3d] → hover:bg-claw-blue-light (×2)
- footer.tsx: 3 occurrences — text-claw-orange → text-claw-blue (×3)
- layout.tsx: 1 occurrence — focus:bg-claw-orange → focus:bg-claw-blue (×1)
- lint ✓, typecheck ✓, commit dd9b6a5
