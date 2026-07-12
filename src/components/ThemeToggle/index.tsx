import React, { useEffect, useRef } from 'react';
import { useWalrusTheme, setWalrusTheme } from '../../theme/index.js';

export interface ThemeToggleProps {
  className?: string;
  style?: React.CSSProperties;
}

const SunIcon = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
    <circle cx={8} cy={8} r={3.5} stroke="currentColor" strokeWidth={1.5} />
    <path
      d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.36 3.64l-1.06 1.06M4.7 11.3l-1.06 1.06M12.36 12.36l-1.06-1.06M4.7 4.7 3.64 3.64"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
    <path
      d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Toggles between dark and light theme by setting `data-theme` on `<html>`.
 * Persists the user's choice to `localStorage` under the key `"walrus-theme"`.
 * On first render, reads from `localStorage`, then falls back to `prefers-color-scheme`,
 * then defaults to dark.
 *
 * The focus ring only appears for keyboard navigation, not mouse clicks,
 * matching `:focus-visible` semantics without requiring CSS.
 *
 * **SSR note:** The component guards against `window` being undefined, but the initial
 * render will always produce the dark-theme icon on the server. Wrap in a client-only
 * boundary if hydration mismatch warnings are a concern.
 *
 * @see https://design.clintenhopkins.com/?path=/docs/guidelines-theming--docs
 */
export function ThemeToggle({ className, style, ...rest }: ThemeToggleProps) {
  const { theme, toggle } = useWalrusTheme();
  const isMouseFocus = useRef(false);

  // Persist the resolved theme to <html> on mount so the rest of the app has an
  // explicit data-theme to read (matches the previous mount behavior).
  useEffect(() => {
    setWalrusTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        padding: 0,
        background: 'transparent',
        border: '1px solid var(--border-0)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--fg-1)',
        cursor: 'pointer',
        outline: 'none',
        transition: 'color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)',
        ...style,
      }}
      onMouseDown={() => { isMouseFocus.current = true; }}
      onFocus={(e) => {
        if (!isMouseFocus.current) e.currentTarget.style.boxShadow = 'var(--ring-focus)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        isMouseFocus.current = false;
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-1)'; e.currentTarget.style.color = 'var(--fg-0)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-0)'; e.currentTarget.style.color = 'var(--fg-1)'; }}
      {...rest}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
