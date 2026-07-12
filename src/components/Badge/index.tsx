import React from 'react';

export interface BadgeProps {
  tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  /** Renders a glowing status dot before the label. */
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const tones = {
  neutral: { bg: 'var(--bg-2)',          fg: 'var(--fg-1)',           border: 'var(--border-0)',    dot: 'var(--fg-2)'           },
  primary: { bg: 'var(--primary-wash)',   fg: 'var(--primary-strong)', border: 'var(--primary-dim)', dot: 'var(--primary)'        },
  success: { bg: 'var(--success-wash)',   fg: 'var(--success)',        border: 'var(--success)',     dot: 'var(--success)'        },
  warning: { bg: 'var(--warning-wash)',   fg: 'var(--warning)',        border: 'var(--warning)',     dot: 'var(--warning)'        },
  danger:  { bg: 'var(--danger-wash)',    fg: 'var(--danger)',         border: 'var(--danger)',      dot: 'var(--danger)'         },
  info:    { bg: 'var(--info-wash)',      fg: 'var(--info)',           border: 'var(--info)',        dot: 'var(--info)'           },
};

/**
 * Status pill for labels, tags, and state indicators.
 *
 * @see https://design.clintenhopkins.com/?path=/docs/components-badge--docs
 */
export function Badge({ tone = 'neutral', children, dot = false, className = '', style, ...rest }: BadgeProps) {
  const t = tones[tone] ?? tones.neutral;

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono font-medium tracking-wide uppercase rounded-full ${className}`}
      style={{
        padding: '3px 10px',
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.border}`,
        fontSize: 'var(--text-xs)',
        lineHeight: 1,
        ...style,
      }}
      {...rest}
    >
      {dot ? (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: t.dot,
            boxShadow: tone !== 'neutral' ? `0 0 6px ${t.dot}` : 'none',
            flexShrink: 0,
          }}
        />
      ) : null}
      {children}
    </span>
  );
}
