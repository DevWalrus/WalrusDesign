import { Hero } from './index.js';
import { Button } from '../Button/index.js';

export default {
  title: 'Components/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    texture: { control: 'select', options: ['dots', 'scanlines', 'none'] },
    align: { control: 'radio', options: ['left', 'center'] },
  },
  args: {
    title: 'Build things. Ship reliably.',
    subtitle: 'I build high-performance internal tools and simplify the processes around them — reliability work, dev-ops pipelines, and the systems that let teams move faster.',
    texture: 'dots',
    align: 'left',
  },
};

export const Default = {};

export const Centered = {
  args: { align: 'center' },
};

export const Scanlines = {
  args: { texture: 'scanlines' },
};

export const NoTexture = {
  name: 'No Texture',
  args: { texture: 'none' },
};

export const WithCTA = {
  name: 'With CTA',
  args: {
    cta: (
      <>
        <Button variant="primary" size="lg">View my work</Button>
        <Button variant="secondary" size="lg">Get in touch</Button>
      </>
    ),
  },
};

export const WithCTACentered = {
  name: 'With CTA — Centered',
  args: {
    align: 'center',
    cta: (
      <>
        <Button variant="primary" size="lg">View my work</Button>
        <Button variant="secondary" size="lg">Get in touch</Button>
      </>
    ),
  },
};

export const LightMode = {
  name: 'Light Mode',
  globals: { theme: 'light' },
  parameters: { layout: 'fullscreen' },
  args: {
    cta: (
      <>
        <Button variant="primary" size="lg">View my work</Button>
        <Button variant="secondary" size="lg">Get in touch</Button>
      </>
    ),
  },
};
