---
name: walrus-migrate
description: >
  Step-by-step guide for migrating an existing React app to @devwalrus/walrus-design.
  Use this skill whenever the user asks to migrate, integrate, or adopt the Walrus design
  system in a React project, or when they hit issues after installing it (e.g. Nav links
  doing full-page reloads, theme toggle not persisting, fonts not loading).
---

# Migrating to @devwalrus/walrus-design

This package is published to GitHub Packages under the `@devwalrus` scope. It is public — no token or `.npmrc` is required to install it. Work through these steps in order.

---

## Step 1 — Install

```bash
npm install @devwalrus/walrus-design
```

---

## Step 2 — Global stylesheet

Import once in the app entry point (e.g. `main.jsx`, `_app.tsx`, `layout.tsx`):

```js
import '@devwalrus/walrus-design/styles.css';
```

This one import brings in all CSS custom property tokens, component styles, and the self-hosted Space Grotesk + JetBrains Mono fonts. No separate font setup needed.

---

## Step 3 — Import components

All exports are named — bundlers tree-shake unused components automatically:

```js
import { Button, Badge, Nav, Card, Hero, ThemeToggle } from '@devwalrus/walrus-design';
```

---

## Step 4 — Component migration

### Button

```jsx
// Before
<button className="btn btn-primary" onClick={handler}>Save</button>

// After
<Button variant="primary" onClick={handler}>Save</Button>
```

Variants: `primary`, `secondary`, `ghost`, `danger`. Sizes: `sm` (default), `md`, `lg`.

### Badge

```jsx
// Before
<span className="badge badge-success">Active</span>

// After
<Badge tone="success">Active</Badge>
```

Tones: `neutral`, `primary`, `success`, `warning`, `danger`, `info`. Add `glow` prop for a pulsing dot.

### Nav

```jsx
const links = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
];

<Nav mark="CH" links={links} active="Work" />
```

Optional props: `appName` (monospace label after mark), `cta` (slot for ThemeToggle or a button).

**SPA routing caveat — Nav links cause full-page reloads by default.**
The Nav renders `<a href>` tags. For client-side navigation, pass `onClick` handlers:

```jsx
// React Router v6
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
const links = [
  { label: 'Work', href: '/work', onClick: (e) => { e.preventDefault(); navigate('/work'); } },
  { label: 'About', href: '/about', onClick: (e) => { e.preventDefault(); navigate('/about'); } },
];
```

For Next.js App Router, use `router.push` from `useRouter` the same way.

### Card

```jsx
// Inert surface
<Card>Content here</Card>

// Interactive (hover + keyboard ring only activate when onClick is provided)
<Card onClick={() => navigate('/project/1')}>Content here</Card>
```

### Hero

```jsx
<Hero texture="dots">
  <h1>Hello</h1>
  <p>Subheading here</p>
</Hero>
```

Texture options: `dots`, `scanlines`, `none`.

---

## Step 5 — Theming

Dark mode is the default. The system uses CSS custom properties on `data-theme` — no React context or provider needed.

### Automatic (OS preference)

Without any setup, the design system respects `prefers-color-scheme`. Nothing to configure.

### ThemeToggle component

Drop into the Nav `cta` slot or anywhere in the layout:

```jsx
<Nav mark="CH" links={links} cta={<ThemeToggle />} />

// Or standalone
<ThemeToggle />
```

`ThemeToggle` reads `localStorage` on mount, falls back to OS preference, and persists the user's choice under the key `"walrus-theme"`.

### Manual control

```js
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-theme', 'light');
document.documentElement.removeAttribute('data-theme'); // back to OS preference
```

### SSR / Next.js

`ThemeToggle` guards against `window` being undefined but always renders the dark icon on the server. Avoid hydration mismatch with `dynamic`:

```js
import dynamic from 'next/dynamic';

const ThemeToggle = dynamic(
  () => import('@devwalrus/walrus-design').then(m => ({ default: m.ThemeToggle })),
  { ssr: false }
);
```

---

## Step 6 — Use tokens in custom elements

Once the stylesheet is imported, all CSS custom properties are available globally:

```css
.my-card {
  background: var(--bg-1);
  color: var(--fg-0);
  border: 1px solid var(--border-0);
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  padding: var(--space-4) var(--space-6);
}
```

Key token groups:
- **Surfaces:** `--bg-0` (darkest) → `--bg-3` (lightest)
- **Borders:** `--border-0`, `--border-1`
- **Foreground:** `--fg-0` (primary text) → `--fg-2` (muted)
- **Accent:** `--primary`, `--primary-strong`, `--success`, `--warning`, `--danger`, `--info`
- **Spacing:** `--space-1` (4px) → `--space-32` (128px)
- **Typography:** `--font-display`, `--font-body`, `--font-mono`; `--text-xs` → `--text-4xl`
- **Radius:** `--radius-sm` (3px), `--radius-md` (6px), `--radius-lg` (10px)
- **Motion:** `--duration-fast` (120ms), `--duration-med` (220ms), `--ease-out`

---

## Known limitations

- **No responsive tokens.** Breakpoints and fluid type are left to the consuming app.
- **ThemeToggle is client-only.** SSR always renders the dark icon; use `dynamic({ ssr: false })` in Next.js to suppress hydration warnings.
- **SPA routing.** Nav links are plain `<a>` tags. Add `onClick` handlers with `e.preventDefault()` for client-side navigation.
- **a11y for custom elements.** The design system ensures its own components are WCAG AA compliant. Custom elements built with tokens are the consuming app's responsibility.
- **GitHub Packages registry.** The package resolves from `npm.pkg.github.com`. No token is required since the package is public, but if your CI blocks non-registry installs you may need `@devwalrus:registry=https://npm.pkg.github.com` in your `.npmrc`.
