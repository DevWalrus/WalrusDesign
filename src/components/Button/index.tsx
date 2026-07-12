import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  /** Optional icon element. */
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const sizeStyles: Record<NonNullable<ButtonProps['size']>, React.CSSProperties> = {
  sm: { padding: '6px 14px',  fontSize: 'var(--text-xs)',  gap: 6  },
  md: { padding: '10px 20px', fontSize: 'var(--text-sm)',  gap: 8  },
  lg: { padding: '14px 26px', fontSize: 'var(--text-base)', gap: 10 },
};

const variantStyles: Record<NonNullable<ButtonProps['variant']>, React.CSSProperties> = {
  primary:   { background: 'var(--primary)',     color: 'var(--on-primary)', borderColor: 'var(--primary)'  },
  secondary: { background: 'transparent',        color: 'var(--fg-0)',       borderColor: 'var(--border-1)' },
  ghost:     { background: 'transparent',        color: 'var(--fg-1)',       borderColor: 'transparent'     },
  danger:    { background: 'transparent',        color: 'var(--danger)',     borderColor: 'var(--danger)'   },
};

const variantHover: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:   'var(--primary-strong)',
  secondary: 'var(--bg-2)',
  ghost:     'var(--bg-1)',
  danger:    'var(--danger-wash)',
};

/**
 * Primary interactive element. Supports four variants and three sizes.
 *
 * @see https://design.clintenhopkins.com/?path=/docs/components-button--docs
 */
export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon = null,
  iconPosition = 'left',
  children,
  onClick,
  type = 'button',
  className = '',
  style,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-mono font-medium tracking-wide rounded-sm ${variant !== 'primary' ? 'uppercase' : ''} ${className}`}
      style={{
        border: '1px solid transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        outline: 'none',
        transition: 'background var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out)',
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      onFocus={(e) => { e.currentTarget.style.boxShadow = 'var(--ring-focus)'; }}
      onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = variantHover[variant];
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = variantStyles[variant].background as string;
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.97)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      {...rest}
    >
      {icon && iconPosition === 'left'  ? <span className="inline-flex mr-2">{icon}</span> : null}
      {children}
      {icon && iconPosition === 'right' ? <span className="inline-flex ml-2">{icon}</span> : null}
    </button>
  );
}
