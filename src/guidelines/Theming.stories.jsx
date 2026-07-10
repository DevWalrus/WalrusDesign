import { ThemeToggle } from '../components/ThemeToggle/index.js';

export default {
  title: 'Guidelines/Theming',
  parameters: { layout: 'padded', controls: { disable: true }, a11y: { disable: true } },
};

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 32 }}>
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-2)', margin: '0 0 12px' }}>{title}</p>
    {children}
  </div>
);

const Code = ({ children }) => (
  <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-1)', background: 'var(--bg-1)', border: '1px solid var(--border-0)', borderRadius: 'var(--radius-md)', padding: '12px 16px', margin: 0, overflowX: 'auto', lineHeight: 1.6 }}>
    <code>{children}</code>
  </pre>
);

export const Overview = {
  name: 'Theming',
  render: () => (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--fg-0)', maxWidth: 640 }}>
      <Section title="How it works">
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--fg-1)', margin: '0 0 12px' }}>
          All design tokens are CSS custom properties. Theming works by setting a{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--primary-strong)', background: 'var(--primary-wash)', padding: '1px 5px', borderRadius: 3 }}>data-theme</code>{' '}
          attribute on <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--primary-strong)', background: 'var(--primary-wash)', padding: '1px 5px', borderRadius: 3 }}>&lt;html&gt;</code>,
          which overrides the token values declared in <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--primary-strong)', background: 'var(--primary-wash)', padding: '1px 5px', borderRadius: 3 }}>:root</code>.
          No JavaScript theme context is required.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--fg-1)', margin: 0 }}>
          Dark is the default. Light mode activates via OS preference (<code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>prefers-color-scheme: light</code>) unless overridden by an explicit attribute.
        </p>
      </Section>

      <Section title="Manual control">
        <Code>{`// Force dark
document.documentElement.setAttribute('data-theme', 'dark')

// Force light
document.documentElement.setAttribute('data-theme', 'light')

// Remove override — falls back to OS preference
document.documentElement.removeAttribute('data-theme')`}</Code>
      </Section>

      <Section title="ThemeToggle component">
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--fg-1)', margin: '0 0 12px' }}>
          A self-contained toggle button that manages the <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>data-theme</code> attribute
          and persists the user's choice to <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>localStorage</code> under the key{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--primary-strong)', background: 'var(--primary-wash)', padding: '1px 5px', borderRadius: 3 }}>"walrus-theme"</code>.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <ThemeToggle />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)' }}>← live toggle</span>
        </div>
        <Code>{`import { ThemeToggle } from '@devwalrus/walrus-design';

// Standalone
<ThemeToggle />

// In the Nav cta slot
<Nav cta={<ThemeToggle />} mark="CH" links={links} />`}</Code>
      </Section>

      <Section title="SSR / Next.js">
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--fg-1)', margin: '0 0 12px' }}>
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>ThemeToggle</code> guards against{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>window</code> being undefined, but will always
          render the dark-theme icon on the server. To avoid hydration mismatch warnings, render it client-only:
        </p>
        <Code>{`// Next.js
import dynamic from 'next/dynamic';
const ThemeToggle = dynamic(
  () => import('@devwalrus/walrus-design').then(m => ({ default: m.ThemeToggle })),
  { ssr: false }
);`}</Code>
      </Section>

      <Section title="Tokens that change">
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--fg-1)', margin: '0 0 12px' }}>
          Only color and texture tokens are theme-aware. Spacing, typography, radius, and motion are invariant.
        </p>
        <Code>{`/* Change between themes */
--bg-0 / --bg-1 / --bg-2 / --bg-3
--border-0 / --border-1
--fg-0 / --fg-1 / --fg-2
--primary-strong
--success / --warning / --danger / --info
--*-wash  (all semantic wash backgrounds)
--texture-scanlines / --texture-dots

/* Always the same */
--primary / --primary-dim / --on-primary
--space-* / --text-* / --font-*
--radius-* / --duration-* / --ease-*`}</Code>
      </Section>
    </div>
  ),
};
