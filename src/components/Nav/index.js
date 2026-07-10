import React from 'react';

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
            },
            onMouseEnter: (event) => {
              event.currentTarget.style.color = 'var(--fg-0)';
            },
            onMouseLeave: (event) => {
              event.currentTarget.style.color = active === link.label ? 'var(--primary-strong)' : 'var(--fg-1)';
            },
          },
          link.label
        )
      ),
      cta ? React.createElement('span', { style: { marginLeft: 4 } }, cta) : null
    ),
  );
}