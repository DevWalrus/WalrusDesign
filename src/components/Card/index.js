import React, { useState } from 'react';

/**
 * Surface container for grouped content. Hover state only activates when `onClick` is provided —
 * static cards have no interactive styling.
 *
 * @see https://design.clintenhopkins.com/?path=/docs/components-card--docs
 *
 * @param {string} [title] - Optional label rendered in mono uppercase above the content.
 * @param {React.ReactNode} children - String children are auto-wrapped in a styled `<p>`.
 * @param {() => void} [onClick] - Makes the card interactive (hover + pointer cursor).
 */
export function Card({ title, children, style, onClick, ...rest }) {
  const [hovered, setHovered] = useState(false);
  const interactive = Boolean(onClick);

  return React.createElement(
    'div',
    {
      onClick,
      role: interactive ? 'button' : undefined,
      tabIndex: interactive ? 0 : undefined,
      onKeyDown: interactive ? (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick(event);
        }
      } : undefined,
      onMouseEnter: interactive ? () => setHovered(true) : undefined,
      onMouseLeave: interactive ? () => setHovered(false) : undefined,
      onFocus: interactive ? (event) => {
        event.currentTarget.style.boxShadow = 'var(--ring-focus)';
      } : undefined,
      onBlur: interactive ? (event) => {
        event.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      } : undefined,
      style: {
        background: interactive && hovered ? 'var(--bg-2)' : 'var(--bg-1)',
        border: `1px solid ${interactive && hovered ? 'var(--border-1)' : 'var(--border-0)'}`,
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        fontFamily: 'var(--font-body)',
        color: 'var(--fg-0)',
        boxShadow: 'var(--shadow-sm)',
        outline: 'none',
        cursor: interactive ? 'pointer' : 'default',
        transition: interactive ? `background var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)` : undefined,
        ...style,
      },
      ...rest,
    },
    title
      ? React.createElement(
          'h4',
          {
            style: {
              margin: '0 0 6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--primary-strong)',
            },
          },
          title
        )
      : null,
    typeof children === 'string'
      ? React.createElement('p', { style: { margin: 0, fontSize: '13px', color: 'var(--fg-1)' } }, children)
      : children
  );
}
