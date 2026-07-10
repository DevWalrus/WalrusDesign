import React from 'react';

export function Badge({ tone = 'neutral', children, dot = false, style, ...rest }) {
  const tones = {
    neutral: { bg: 'var(--bg-2)', fg: 'var(--fg-1)', border: 'var(--border-0)', dot: 'var(--fg-2)' },
    primary: { bg: 'var(--primary-wash)', fg: 'var(--primary-strong)', border: 'var(--primary-dim)', dot: 'var(--primary)' },
    success: { bg: 'var(--success-wash)', fg: 'var(--success)', border: 'var(--success)', dot: 'var(--success)' },
    warning: { bg: 'var(--warning-wash)', fg: 'var(--warning)', border: 'var(--warning)', dot: 'var(--warning)' },
    danger: { bg: 'var(--danger-wash)', fg: 'var(--danger)', border: 'var(--danger)', dot: 'var(--danger)' },
    info: { bg: 'var(--info-wash)', fg: 'var(--info)', border: 'var(--info)', dot: 'var(--info)' },
  };
  const resolvedTone = tones[tone] || tones.neutral;

  return React.createElement(
    'span',
    {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 10px',
        borderRadius: 'var(--radius-pill)',
        background: resolvedTone.bg,
        color: resolvedTone.fg,
        border: `1px solid ${resolvedTone.border}`,
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        fontWeight: 500,
        letterSpacing: 'var(--tracking-wide)',
        textTransform: 'uppercase',
        lineHeight: 1,
        ...style,
      },
      ...rest,
    },
    dot
      ? React.createElement('span', {
          style: {
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: resolvedTone.dot,
            boxShadow: tone !== 'neutral' ? `0 0 6px ${resolvedTone.dot}` : 'none',
            flexShrink: 0,
          },
        })
      : null,
    children
  );
}