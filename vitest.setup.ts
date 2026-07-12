import '@testing-library/jest-dom/vitest';

// jsdom does not implement matchMedia; the theme utilities read it. Provide a
// controllable stub defaulting to "dark" (prefers-color-scheme: light => false).
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
