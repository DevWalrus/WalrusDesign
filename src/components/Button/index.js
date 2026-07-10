import React from 'react';

function createButtonStyles(size) {
  const sizes = {
    sm: { padding: '6px 14px', fontSize: 'var(--text-xs)', gap: 6 },
    md: { padding: '10px 20px', fontSize: 'var(--text-sm)', gap: 8 },
    lg: { padding: '14px 26px', fontSize: 'var(--text-base)', gap: 10 },
  };

  return sizes[size] || sizes.md;
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon = null,
  iconPosition = 'left',
  children,
  onClick,
  type = 'button',
  style,
  ...rest
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
    letterSpacing: 'var(--tracking-wide)',
    textTransform: variant === 'primary' ? 'none' : 'uppercase',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition:
      'background var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out)',
    ...createButtonStyles(size),
  };

  const variants = {
    primary: {
      background: 'var(--primary)',
      color: 'var(--on-primary)',
      borderColor: 'var(--primary)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--fg-0)',
      borderColor: 'var(--border-1)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--fg-1)',
      borderColor: 'transparent',
    },
    danger: {
      background: 'transparent',
      color: 'var(--danger)',
      borderColor: 'var(--danger)',
    },
  };

  return React.createElement(
    'button',
    {
      type,
      disabled,
      onClick,
      style: { ...base, ...variants[variant], ...style },
      onMouseEnter: (event) => {
        if (disabled) return;
        if (variant === 'primary') event.currentTarget.style.background = 'var(--primary-strong)';
        if (variant === 'secondary') event.currentTarget.style.background = 'var(--bg-2)';
        if (variant === 'ghost') event.currentTarget.style.background = 'var(--bg-1)';
        if (variant === 'danger') event.currentTarget.style.background = 'var(--danger-wash)';
      },
      onMouseLeave: (event) => {
        if (disabled) return;
        event.currentTarget.style.background = variants[variant].background;
      },
      onMouseDown: (event) => {
        if (!disabled) event.currentTarget.style.transform = 'scale(0.97)';
      },
      onMouseUp: (event) => {
        event.currentTarget.style.transform = 'scale(1)';
      },
      ...rest,
    },
    icon && iconPosition === 'left'
      ? React.createElement('span', { style: { display: 'inline-flex', marginRight: 8 } }, icon)
      : null,
    children,
    icon && iconPosition === 'right'
      ? React.createElement('span', { style: { display: 'inline-flex', marginLeft: 8 } }, icon)
      : null
  );
}