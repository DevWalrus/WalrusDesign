import React from 'react';

export interface NavLink {
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface NavProps {
  className?: string;
  /** Initials shown inside the bracket wordmark. */
  mark?: string;
  /** Optional app name shown after the wordmark, e.g. 'create.clinten.dev'. */
  appName?: string | null;
  links?: NavLink[];
  /** Label of the currently active link. */
  active?: string | null;
  /** Optional element rendered at the far right, e.g. a Button. */
  cta?: React.ReactNode;
}

/**
 * Site header with terminal-prompt wordmark, optional app name, nav links, and an optional CTA slot.
 *
 * @see https://design.clintenhopkins.com/?path=/docs/components-nav--docs
 */
export function Nav({ mark = 'CH', appName = null, links = [], active = null, cta = null, className = '' }: NavProps) {
  return (
    <header
      className={`flex items-center justify-between font-mono border-b ${className}`}
      style={{ padding: '18px 32px', background: 'var(--bg-0)' }}
    >
      <div className="flex items-center gap-1 text-md text-default">
        <span className="text-muted">[</span>
        <span className="font-semibold" style={{ color: 'var(--primary-strong)' }}>{mark}</span>
        <span className="text-muted">]</span>
        {appName ? <span className="text-muted mx-1">/</span> : null}
        {appName ? <span className="text-secondary font-normal">{appName}</span> : null}
        <span
          className="inline-block"
          style={{
            width: 8,
            height: '1em',
            marginLeft: 6,
            background: 'var(--primary)',
            animation: 'ds-caret-blink 1.1s step-end infinite',
          }}
        />
      </div>

      <nav className="flex items-center" style={{ gap: 28 }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href || '#'}
            onClick={link.onClick}
            aria-current={active === link.label ? 'page' : undefined}
            className="text-xs tracking-wide uppercase relative rounded-sm"
            style={{
              textDecoration: 'none',
              color: active === link.label ? 'var(--primary-strong)' : 'var(--fg-1)',
              paddingBottom: 4,
              borderBottom: active === link.label ? '1px solid var(--primary-strong)' : '1px solid transparent',
              transition: 'color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)',
              outline: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fg-0)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = active === link.label ? 'var(--primary-strong)' : 'var(--fg-1)'; }}
            onFocus={(e) => { e.currentTarget.style.boxShadow = 'var(--ring-focus)'; }}
            onBlur={(e)  => { e.currentTarget.style.boxShadow = 'none'; }}
          >
            {link.label}
          </a>
        ))}
        {cta ? <span className="ml-1">{cta}</span> : null}
      </nav>
    </header>
  );
}
