import { Nav } from './index.js';
import { Button } from '../Button/index.js';

export default {
  title: 'Components/Nav',
  component: Nav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    mark: { control: 'text' },
    appName: { control: 'text' },
    active: { control: 'text' },
  },
  args: {
    mark: 'CH',
    links: [
      { label: 'Work', href: '#' },
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    active: 'Work',
  },
};

export const Default = {};

export const WithAppName = {
  name: 'With App Name',
  args: {
    appName: 'create.clinten.dev',
  },
};

export const WithCTA = {
  name: 'With CTA Button',
  args: {
    cta: <Button size="sm" variant="primary">Hire me</Button>,
  },
};

export const NoActiveLink = {
  name: 'No Active Link',
  args: { active: null },
};

export const LightMode = {
  name: 'Light Mode',
  globals: { theme: 'light' },
  parameters: { layout: 'fullscreen' },
  args: {
    cta: <Button size="sm" variant="primary">Hire me</Button>,
  },
};
