import React, { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'walrus-theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

const SunIcon = () =>
  React.createElement(
    'svg',
    { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true, focusable: 'false' },
    React.createElement('circle', { cx: 8, cy: 8, r: 3.5, stroke: 'currentColor', strokeWidth: 1.5 }),
    React.createElement('path', {
      d: 'M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.36 3.64l-1.06 1.06M4.7 11.3l-1.06 1.06M12.36 12.36l-1.06-1.06M4.7 4.7 3.64 3.64',
      stroke: 'currentColor',
      strokeWidth: 1.5,
      strokeLinecap: 'round',
    })
  );

const MoonIcon = () =>
  React.createElement(
    'svg',
    { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true, focusable: 'false' },
    React.createElement('path', {
      d: 'M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7Z',
      stroke: 'currentColor',
      strokeWidth: 1.5,
      strokeLinejoin: 'round',
    })
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
 *
 * @param {string} [className]
 * @param {React.CSSProperties} [style]
 */
export function ThemeToggle({ className, style, ...rest }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const isMouseFocus = useRef(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return React.createElement(
    'button',
    {
      type: 'button',
      onClick: toggle,
      'aria-label': theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
      className,
      style: {
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
      },
      onMouseDown: () => { isMouseFocus.current = true; },
      onFocus: (e) => {
        if (!isMouseFocus.current) e.currentTarget.style.boxShadow = 'var(--ring-focus)';
      },
      onBlur: (e) => {
        e.currentTarget.style.boxShadow = 'none';
        isMouseFocus.current = false;
      },
      onMouseEnter: (e) => { e.currentTarget.style.borderColor = 'var(--border-1)'; e.currentTarget.style.color = 'var(--fg-0)'; },
      onMouseLeave: (e) => { e.currentTarget.style.borderColor = 'var(--border-0)'; e.currentTarget.style.color = 'var(--fg-1)'; },
      ...rest,
    },
    theme === 'dark' ? React.createElement(SunIcon) : React.createElement(MoonIcon)
  );
}
