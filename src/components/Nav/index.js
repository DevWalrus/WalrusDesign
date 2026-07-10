import React from 'react';

/**
 * Site header with terminal-prompt wordmark, optional app name, nav links, and an optional CTA slot.
 *
 * @see https://design.clintenhopkins.com/?path=/docs/components-nav--docs
 *
 * @param {string} [mark='CH'] - Initials shown inside the bracket wordmark.
 * @param {string|null} [appName] - Optional app name shown after the wordmark, e.g. 'create.clinten.dev'.
 * @param {Array<{label: string, href?: string, onClick?: (e: MouseEvent) => void}>} [links=[]]
 * @param {string|null} [active] - Label of the currently active link.
 * @param {React.ReactNode} [cta] - Optional element rendered at the far right, e.g. a Button.
 */
export function Nav({ mark = 'CH', appName = null, links = [], active = null, cta = null }) {
  return React.createElement(
    'header',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 32px',
        borderBottom: '1px solid var(--border-0)',
        background: 'var(--bg-0)',
        fontFamily: 'var(--font-mono)',
      },
    },
    React.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: 2, fontSize: 'var(--text-md)', color: 'var(--fg-0)' } },
      React.createElement('span', { style: { color: 'var(--fg-2)' } }, '['),
      React.createElement('span', { style: { color: 'var(--primary-strong)', fontWeight: 600 } }, mark),
      React.createElement('span', { style: { color: 'var(--fg-2)' } }, ']'),
      appName
        ? React.createElement('span', { style: { color: 'var(--fg-2)', margin: '0 6px' } }, '/')
        : null,
      appName
        ? React.createElement('span', { style: { color: 'var(--fg-1)', fontWeight: 400 } }, appName)
        : null,
      React.createElement('span', {
        style: {
          display: 'inline-block',
          width: 8,
          height: '1em',
          marginLeft: 6,
          background: 'var(--primary)',
          animation: 'ds-caret-blink 1.1s step-end infinite',
        },
      })
    ),
    React.createElement(
      'nav',
      { style: { display: 'flex', alignItems: 'center', gap: 28 } },
      ...links.map((link) =>
        React.createElement(
          'a',
          {
            key: link.label,
            href: link.href || '#',
            onClick: link.onClick,
            'aria-current': active === link.label ? 'page' : undefined,
            style: {
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-wide)',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: active === link.label ? 'var(--primary-strong)' : 'var(--fg-1)',
              position: 'relative',
              paddingBottom: 4,
              borderBottom: active === link.label ? '1px solid var(--primary-strong)' : '1px solid transparent',
              transition: 'color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)',
              outline: 'none',
              borderRadius: 'var(--radius-sm)',
            },
            onMouseEnter: (event) => {
              event.currentTarget.style.color = 'var(--fg-0)';
            },
            onMouseLeave: (event) => {
              event.currentTarget.style.color = active === link.label ? 'var(--primary-strong)' : 'var(--fg-1)';
            },
            onFocus: (event) => {
              event.currentTarget.style.boxShadow = 'var(--ring-focus)';
            },
            onBlur: (event) => {
              event.currentTarget.style.boxShadow = 'none';
            },
          },
          link.label
        )
      ),
      cta ? React.createElement('span', { style: { marginLeft: 4 } }, cta) : null
    ),
  );
}