import * as React from 'react';

export interface CardProps {
  title?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function Card(props: CardProps): JSX.Element;
