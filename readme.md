# @devwalrus/walrus-design

A dark-first, terminal-flavored design system for clintenhopkins.com and related apps. Published as a private npm package to GitHub Packages.

**[Storybook →](https://design.clintenhopkins.com)**

---

## Installation

```bash
npm install @devwalrus/walrus-design
```

Add an `.npmrc` to your project root so npm resolves the `@devwalrus` scope:

```ini
@devwalrus:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

---

## Setup

Import the stylesheet once globally - typically in your app's entry point:

```js
import '@devwalrus/walrus-design/styles.css';
```

Then import components individually. All exports are named, so bundlers tree-shake unused components automatically:

```js
import { Button, Nav, ThemeToggle } from '@devwalrus/walrus-design';
```

---

## Components

| Component | Description |
|---|---|
| `Button` | Primary interactive element. Variants: `primary`, `secondary`, `ghost`, `danger`. Sizes: `sm`, `md`, `lg`. |
| `Badge` | Status pill. Tones: `neutral`, `primary`, `success`, `warning`, `danger`, `info`. Optional glow dot. |
| `Nav` | Top navigation bar with monospace wordmark, link list, active state, optional `appName` and `cta` slot. |
| `Card` | Surface container. Hover and keyboard interaction only activates when `onClick` is provided. |
| `Hero` | Full-width page banner with dot-grid or scanline texture. |
| `ThemeToggle` | Icon button that toggles dark/light mode. See [Theming](#theming). |

---

## Theming

Dark mode is the default. All tokens are CSS custom properties, so theming works by setting a `data-theme` attribute on `<html>` - no JavaScript theme context or provider required.

### Automatic (OS preference)

Without any attribute set, the design system respects `prefers-color-scheme`. Users on a light OS preference see the light theme automatically.

### Manual control

```js
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-theme', 'light');
document.documentElement.removeAttribute('data-theme'); // falls back to OS preference
```

### ThemeToggle component

The `ThemeToggle` component handles this for you - it reads `localStorage`, falls back to OS preference, and persists the user's choice under the key `"walrus-theme"`.

```jsx
// In the Nav cta slot
<Nav cta={<ThemeToggle />} mark="CH" links={links} active="Work" />

// Or standalone anywhere in your layout
<ThemeToggle />
```

### SSR / Next.js

`ThemeToggle` guards against `window` being undefined but renders the dark icon on the server. To avoid hydration mismatch warnings, render it client-only:

```js
import dynamic from 'next/dynamic';

const ThemeToggle = dynamic(
  () => import('@devwalrus/walrus-design').then(m => ({ default: m.ThemeToggle })),
  { ssr: false }
);
```

### Tokens that change between themes

Only color and texture tokens are theme-aware. Spacing, typography, radius, and motion are invariant.

```
--bg-0 / --bg-1 / --bg-2 / --bg-3
--border-0 / --border-1
--fg-0 / --fg-1 / --fg-2
--primary-strong
--success / --warning / --danger / --info
--*-wash  (all semantic wash backgrounds)
--texture-scanlines / --texture-dots
```

---

## TypeScript

Types are included. No `@types` package needed.

```ts
import { Button, type ButtonProps } from '@devwalrus/walrus-design';
```

---

## Using tokens directly

All CSS custom properties are available to consuming apps once the stylesheet is imported:

```css
.my-element {
  background: var(--bg-1);
  color: var(--fg-0);
  border: 1px solid var(--border-0);
  font-family: var(--font-mono);
}
```

---

## Project structure

```
src/
  components/       # React components + .d.ts types + Storybook stories
    Button/
    Badge/
    Nav/
    Card/
    Hero/
    ThemeToggle/
  guidelines/       # Token reference stories (Colors, Typography, Spacing, Brand, Theming)
tokens/             # CSS custom property files
  colors.css
  typography.css
  spacing.css
  effects.css
  themes.css        # Light / dark overrides
styles.css          # Root stylesheet - import this in consuming apps
index.js            # Package entry point
```

---

## Visual foundations

- **Color:** Dark-first. Near-black warm-neutral surfaces (`--bg-0` → `--bg-3`) with a maroon/pink primary accent. Semantic colors share the same chroma family. Light mode flips surfaces and darkens accents while preserving hue.
- **Type:** Space Grotesk for display and body. JetBrains Mono for nav, labels, badges, and buttons - mono for UI chrome, sans for content.
- **Spacing:** 4px base unit. Content column capped at `--content-max` (760px), page shell at `--page-max` (1120px).
- **Texture:** `--texture-dots` and `--texture-scanlines` for hero surfaces via `background-image`.
- **Motion:** Blinking terminal caret (`ds-caret-blink`) and 120–220ms ease-out hover transitions only.
- **Borders:** 1px hairlines instead of drop shadows. `--shadow-sm` for subtle card depth only.
- **Radii:** Small and deliberate - 3px buttons, 6px cards, 10px larger surfaces.

---

## Publishing

```bash
npm version patch   # or minor / major
git push --follow-tags
```

The GitHub Actions workflow publishes automatically on any `v*` tag push. Requires a GitHub token with `packages: write` scope.
