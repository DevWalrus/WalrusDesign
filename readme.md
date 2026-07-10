# Walrus Design System

A dark-mode-first, terminal-flavored design system for clintenhopkins.com and related apps. Published as a private npm package to GitHub Packages.

## Packages & tools

- **npm package** — `@devwalrus/walrus-design` — React components + CSS tokens
- **Storybook** — living docs at `design.clintenhopkins.com`

## Consuming the package

In any React app, install the package and import the CSS once near the root:

```tsx
import '@devwalrus/walrus-design/styles.css';
import { Button, Badge, Nav, Card, Hero } from '@devwalrus/walrus-design';
```

Your `.npmrc` must point the scoped package at GitHub Packages:

```ini
@devwalrus:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

## Components

| Component | Description |
|-----------|-------------|
| `Button` | `variant`: primary / secondary / ghost / danger. `size`: sm / md / lg. |
| `Badge` | Status pill. `tone`: neutral / primary / success / warning / danger / info. Optional `dot`. |
| `Nav` | Site header with wordmark, links, optional `appName`, optional `cta`. |
| `Card` | Surface container. Hover state only activates when `onClick` is passed. |
| `Hero` | Full-width page banner. `texture`: dots / scanlines / none. `align`: left / center. |

## What consumers receive

- **JS components** — plain `React.createElement`, no JSX transpilation required
- **TypeScript declarations** — `.d.ts` files for all components
- **`styles.css`** — imports all token files; link this once per app
- **`tokens/`** — `colors.css`, `typography.css`, `spacing.css`, `effects.css`

## Project structure

```
src/
  components/       # React components + .d.ts types + Storybook stories
    Button/
    Badge/
    Nav/
    Card/
    Hero/
  guidelines/       # Token reference stories (Colors, Typography, Spacing, Brand)
tokens/             # Raw CSS custom property files
styles.css          # Root stylesheet — import this in consuming apps
index.js            # Package entry point
```

## Visual foundations

- **Color:** dark-first. Near-black warm-neutral surfaces (`--bg-0` → `--bg-3`) with a maroon/pink primary accent. Semantic colors (success / warning / danger / info) share the same chroma family.
- **Type:** Space Grotesk for display + body. JetBrains Mono for nav, labels, badges, buttons — the mono-for-UI-chrome / sans-for-content split is the system's main personality device.
- **Spacing:** 4px base unit. Content column capped at `--content-max` (760px), page shell at `--page-max` (1120px).
- **Texture:** `--texture-dots` (dot-grid) and `--texture-scanlines` for hero surfaces. Applied via `background-image`.
- **Animation:** blinking terminal caret (`ds-caret-blink`, defined in `styles.css`) and 120–220ms ease-out hover transitions only.
- **Borders:** 1px hairlines everywhere instead of drop shadows. `--shadow-sm` for subtle card depth only.
- **Radii:** small and deliberate — 3px buttons, 6px cards, 10px larger surfaces.

## Voice & content rules

- First person, direct, understated. No exclamation points, no buzzwords.
- Sentence case for prose; UPPERCASE + wide tracking for UI labels and section eyebrows (mono font only).
- Prefix section eyebrows with `//` or `$` — e.g. `// selected work`, `$ whoami`.
- Specific metrics over vague claims — "cut deploy time from 40min to 6min," not "significantly improved."
- No emoji anywhere in this system.

## Publishing

```bash
npm version patch
npm publish
```

Requires a GitHub token with `packages: write` scope.
