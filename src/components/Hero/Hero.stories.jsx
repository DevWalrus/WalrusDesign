import { Hero } from './index';
import { Button } from '../Button/index.js';
import { Badge } from '../Badge/index.js';

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
    subtitle:
      'I build high-performance internal tools and simplify the processes around them — reliability work, dev-ops pipelines, and the systems that let teams move faster.',
    texture: 'dots',
    align: 'left',
  },
};

export const Default = {};
export const Centered  = { args: { align: 'center' } };
export const Scanlines = { args: { texture: 'scanlines' } };
export const NoTexture = { name: 'No Texture', args: { texture: 'none' } };

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

export const UsingUtilityClasses = {
  name: 'Using Utility Classes',
  parameters: { layout: 'fullscreen', a11y: { disable: true } },
  render: () => (
    <div className="flex flex-col">
      <Hero
        title="Build things. Ship reliably."
        subtitle="High-performance internal tools, dev-ops pipelines, and the systems that let teams move faster."
        texture="dots"
        cta={
          <>
            <Button variant="primary" size="lg">View my work</Button>
            <Button variant="secondary" size="lg">Get in touch</Button>
          </>
        }
      />

      <main className="flex flex-col gap-10 px-12 py-10">
        <section className="flex flex-col gap-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-heading-2 text-default">Recent work</h2>
            <span className="text-label text-muted">3 projects</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: 'Deploy pipeline',    tag: 'infrastructure' },
              { name: 'Internal dashboard', tag: 'product' },
              { name: 'Auth service',       tag: 'platform' },
            ].map(({ name, tag }) => (
              <div key={name} className="flex flex-col gap-3 p-5 bg-surface border rounded-md">
                <div className="flex justify-between items-start">
                  <span className="text-heading-4 text-default">{name}</span>
                  <Badge tone="neutral">{tag}</Badge>
                </div>
                <p className="text-body-sm text-secondary">
                  A brief description of what this project accomplished and the technologies involved.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-heading-2 text-default">About</h2>
          <p className="text-body-lg text-secondary">
            I specialize in reliability engineering and internal tooling, working across the full stack
            to build systems that hold up under production load.
          </p>
          <p className="text-body text-secondary">
            Previous work spans fintech infrastructure, developer experience platforms, and open-source design tooling.
          </p>
        </section>
      </main>
    </div>
  ),
};
