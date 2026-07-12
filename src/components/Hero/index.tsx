import React from 'react';

export interface HeroProps {
  /** Primary headline, rendered in display font at --text-3xl. */
  title?: string;
  /** Supporting copy rendered in body font below the title. */
  subtitle?: string;
  /** Optional slot for one or more buttons. */
  cta?: React.ReactNode;
  texture?: 'scanlines' | 'dots' | 'none';
  align?: 'left' | 'center';
  className?: string;
  style?: React.CSSProperties;
}

const textures: Record<NonNullable<HeroProps['texture']>, React.CSSProperties> = {
  scanlines: { backgroundImage: 'var(--texture-scanlines)' },
  dots:      { backgroundImage: 'var(--texture-dots)', backgroundSize: 'var(--texture-dots-size)' },
  none:      {},
};

/**
 * Full-width page banner for top-of-page hero sections. Supports dot-grid and scanline
 * background textures defined in the design token set.
 *
 * @see https://design.clintenhopkins.com/?path=/docs/components-hero--docs
 */
export function Hero({ title, subtitle, cta = null, texture = 'dots', align = 'left', className = '', style, ...rest }: HeroProps) {
  const isCenter = align === 'center';

  return (
    <section
      aria-label={title || 'Hero'}
      className={`flex flex-col w-full ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${className}`}
      style={{
        backgroundColor: 'var(--bg-1)',
        padding: '80px 48px',
        gap: 24,
        boxSizing: 'border-box',
        ...textures[texture],
        ...style,
      }}
      {...rest}
    >
      {title ? (
        <h1
          className="font-display font-bold leading-tight tracking-tight text-default"
          style={{ margin: 0, fontSize: 'var(--text-3xl)', maxWidth: 640 }}
        >
          {title}
        </h1>
      ) : null}
      {subtitle ? (
        <p
          className="font-body leading-normal text-secondary"
          style={{ margin: 0, fontSize: 'var(--text-base)', maxWidth: 560 }}
        >
          {subtitle}
        </p>
      ) : null}
      {cta ? (
        <div className={`flex flex-wrap gap-3 ${isCenter ? 'justify-center' : 'justify-start'}`}>
          {cta}
        </div>
      ) : null}
    </section>
  );
}
