import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'walrus-theme';

/**
 * Resolves the active theme. Priority: the live `data-theme` attribute on
 * `<html>`, then the persisted `localStorage` choice, then the OS
 * `prefers-color-scheme`, then dark. SSR-safe (returns `'dark'` with no DOM).
 */
export function getWalrusTheme(): Theme {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
  }
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  }
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return 'dark';
}

/**
 * Applies a theme app-wide: sets `data-theme` on `<html>` (which every
 * `useWalrusTheme` subscriber observes) and persists it to `localStorage`.
 * No-op on the server.
 */
export function setWalrusTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // storage may be unavailable (private mode, SSR hydration) — ignore
  }
}

export interface UseWalrusThemeResult {
  /** The current resolved theme. */
  theme: Theme;
  /** Apply a specific theme app-wide. */
  setTheme: (theme: Theme) => void;
  /** Flip between light and dark. */
  toggle: () => void;
}

/**
 * Subscribe to the active Walrus theme. Re-renders whenever `<html data-theme>`
 * changes (tracked with a `MutationObserver`) or — when no explicit
 * `data-theme` is set — when the OS `prefers-color-scheme` changes. Use it to
 * keep app-side UI (toasts, charts, third-party widgets) in sync with the
 * design system's theme.
 *
 * @example
 * const { theme } = useWalrusTheme();
 * toast(message, { theme }); // 'light' | 'dark'
 */
export function useWalrusTheme(): UseWalrusThemeResult {
  const [theme, setThemeState] = useState<Theme>(getWalrusTheme);

  useEffect(() => {
    const sync = () => setThemeState(getWalrusTheme());
    // Reconcile once on mount: SSR/first paint may have used the 'dark' default.
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    const media = window.matchMedia('(prefers-color-scheme: light)');
    media.addEventListener('change', sync);

    return () => {
      observer.disconnect();
      media.removeEventListener('change', sync);
    };
  }, []);

  // setTheme drives the DOM; the MutationObserver above pushes the new value
  // back into state, keeping every subscriber in sync from one source of truth.
  const setTheme = (next: Theme) => setWalrusTheme(next);
  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return { theme, setTheme, toggle };
}
