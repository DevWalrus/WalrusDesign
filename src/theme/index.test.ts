import { renderHook, act, waitFor } from '@testing-library/react';
import { getWalrusTheme, setWalrusTheme, useWalrusTheme } from './index';

/** A controllable matchMedia mock that records change listeners so tests can
 *  drive prefers-color-scheme transitions. */
function installMatchMedia(matches: boolean) {
  const listeners = new Set<() => void>();
  const mql = {
    matches,
    media: '(prefers-color-scheme: light)',
    onchange: null,
    addEventListener: (_: string, cb: () => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  };
  window.matchMedia = (() => mql) as unknown as typeof window.matchMedia;
  return {
    setMatches(next: boolean) {
      mql.matches = next;
      listeners.forEach((cb) => cb());
    },
  };
}

beforeEach(() => {
  document.documentElement.removeAttribute('data-theme');
  localStorage.clear();
  installMatchMedia(false);
});

describe('getWalrusTheme', () => {
  it('prefers the live data-theme attribute', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    expect(getWalrusTheme()).toBe('light');
  });

  it('falls back to the persisted localStorage value', () => {
    localStorage.setItem('walrus-theme', 'light');
    expect(getWalrusTheme()).toBe('light');
  });

  it('falls back to prefers-color-scheme when nothing is set', () => {
    installMatchMedia(true);
    expect(getWalrusTheme()).toBe('light');
    installMatchMedia(false);
    expect(getWalrusTheme()).toBe('dark');
  });

  it('defaults to dark when matchMedia is unavailable', () => {
    const original = window.matchMedia;
    // @ts-expect-error force the SSR-ish fallback path
    window.matchMedia = undefined;
    expect(getWalrusTheme()).toBe('dark');
    window.matchMedia = original;
  });
});

describe('setWalrusTheme', () => {
  it('writes the attribute and persists to localStorage', () => {
    setWalrusTheme('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('walrus-theme')).toBe('light');
  });

  it('swallows localStorage failures', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });
    expect(() => setWalrusTheme('dark')).not.toThrow();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    spy.mockRestore();
  });
});

describe('useWalrusTheme', () => {
  it('returns the current theme', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    const { result } = renderHook(() => useWalrusTheme());
    expect(result.current.theme).toBe('light');
  });

  it('updates when data-theme changes elsewhere (MutationObserver)', async () => {
    const { result } = renderHook(() => useWalrusTheme());
    expect(result.current.theme).toBe('dark');
    act(() => setWalrusTheme('light'));
    await waitFor(() => expect(result.current.theme).toBe('light'));
  });

  it('setTheme and toggle drive the theme', async () => {
    const { result } = renderHook(() => useWalrusTheme());
    act(() => result.current.setTheme('light'));
    await waitFor(() => expect(result.current.theme).toBe('light'));
    act(() => result.current.toggle());
    await waitFor(() => expect(result.current.theme).toBe('dark'));
  });

  it('reacts to prefers-color-scheme changes when no data-theme is set', async () => {
    const media = installMatchMedia(false);
    const { result } = renderHook(() => useWalrusTheme());
    expect(result.current.theme).toBe('dark');
    act(() => media.setMatches(true));
    await waitFor(() => expect(result.current.theme).toBe('light'));
  });
});
