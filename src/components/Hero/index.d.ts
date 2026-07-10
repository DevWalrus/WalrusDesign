import * as React from 'react';

export interface HeroProps {
  title?: string;
  subtitle?: string;
  cta?: React.ReactNode;
  texture?: 'scanlines' | 'dots' | 'none';
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}

export function Hero(props: HeroProps): JSX.Element;
