import React from 'react';

export interface NavLink {
  label: string;
  href?: string;
  onClick?: (e: MouseEvent) => void;
}

export interface NavProps {
  mark?: string;
  appName?: string | null;
  links?: NavLink[];
  active?: string | null;
  cta?: React.ReactNode;
}

export declare function Nav(props: NavProps): JSX.Element;