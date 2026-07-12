import React, { useState } from 'react';

export interface CardProps {
  /** Optional label rendered in mono uppercase above the content. */
  title?: string;
  /** String children are auto-wrapped in a styled `<p>`. */
  children?: React.ReactNode;
  /** Makes the card interactive (hover + pointer cursor + click handling). */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Surface container for grouped content. Hover state only activates when `onClick` is provided —
 * static cards have no interactive styling.
 *
 * @see https://design.clintenhopkins.com/?path=/docs/components-card--docs
 */
export function Card({ title, children, className = '', style, onClick, ...rest }: CardProps) {
  const [hovered, setHovered] = useState(false);
  const interactive = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick!(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }
          : undefined
      }
      onMouseEnter={interactive ? () => setHovered(true)  : undefined}
      onMouseLeave={interactive ? () => setHovered(false) : undefined}
      onFocus={interactive ? (e) => { e.currentTarget.style.boxShadow = 'var(--ring-focus)'; } : undefined}
      onBlur={interactive  ? (e) => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)';  } : undefined}
      className={`font-body rounded-md ${className}`}
      style={{
        background: interactive && hovered ? 'var(--bg-2)' : 'var(--bg-1)',
        border: `1px solid ${interactive && hovered ? 'var(--border-1)' : 'var(--border-0)'}`,
        padding: '16px',
        color: 'var(--fg-0)',
        boxShadow: 'var(--shadow-sm)',
        outline: 'none',
        cursor: interactive ? 'pointer' : 'default',
        transition: interactive
          ? 'background var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)'
          : undefined,
        ...style,
      }}
      {...rest}
    >
      {title ? (
        <h4
          className="font-mono font-medium tracking-wide uppercase text-xs"
          style={{ margin: '0 0 6px', color: 'var(--primary-strong)' }}
        >
          {title}
        </h4>
      ) : null}
      {typeof children === 'string' ? (
        <p className="text-sm" style={{ margin: 0, color: 'var(--fg-1)' }}>{children}</p>
      ) : (
        children
      )}
    </div>
  );
}
