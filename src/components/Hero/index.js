import React from 'react';

/**
 * Full-width page banner for top-of-page hero sections. Supports dot-grid and scanline
 * background textures defined in the design token set.
 *
 * @see https://design.clintenhopkins.com/?path=/docs/components-hero--docs
 *
 * @param {string} [title] - Primary headline, rendered in display font at --text-3xl.
 * @param {string} [subtitle] - Supporting copy rendered in body font below the title.
 * @param {React.ReactNode} [cta] - Optional slot for one or more buttons.
 * @param {'dots'|'scanlines'|'none'} [texture='dots']
 * @param {'left'|'center'} [align='left']
 */
const textures = {
  scanlines: {
    backgroundImage: 'var(--texture-scanlines)',
  },
  dots: {
    backgroundImage: 'var(--texture-dots)',
    backgroundSize: 'var(--texture-dots-size)',
  },
  none: {},
};

export function Hero({ title, subtitle, cta = null, texture = 'dots', align = 'left', style, ...rest }) {
  const isCenter = align === 'center';

  return React.createElement(
    'section',
    {
      'aria-label': title || 'Hero',
      style: {
        backgroundColor: 'var(--bg-1)',
        ...textures[texture],
        padding: '80px 48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isCenter ? 'center' : 'flex-start',
        textAlign: isCenter ? 'center' : 'left',
        gap: 24,
        boxSizing: 'border-box',
        width: '100%',
        ...style,
      },
      ...rest,
    },
    title
      ? React.createElement(
          'h1',
          {
            style: {
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 700,
              lineHeight: 'var(--leading-tight)',
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--fg-0)',
              maxWidth: 640,
            },
          },
          title
        )
      : null,
    subtitle
      ? React.createElement(
          'p',
          {
            style: {
              margin: 0,
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-normal)',
              color: 'var(--fg-1)',
              maxWidth: 560,
            },
          },
          subtitle
        )
      : null,
    cta
      ? React.createElement('div', { style: { display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: isCenter ? 'center' : 'flex-start' } }, cta)
      : null
  );
}
