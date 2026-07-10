import React from 'react';

export interface BadgeProps {
  tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  dot?: boolean;
  children: React.ReactNode;
}

export declare function Badge(props: BadgeProps): JSX.Element;