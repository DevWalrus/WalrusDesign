import { ThemeToggle } from './index';
import { Nav } from '../Nav/index.js';
import { Button } from '../Button/index.js';

export default {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const Default = {};

export const InNav = {
  name: 'In Nav (cta slot)',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Nav
      mark="CH"
      links={[
        { label: 'Work',    href: '#' },
        { label: 'About',   href: '#' },
        { label: 'Contact', href: '#' },
      ]}
      active="Work"
      cta={<ThemeToggle />}
    />
  ),
};

export const UsingUtilityClasses = {
  name: 'Using Utility Classes',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="flex flex-col">
      <Nav
        mark="CH"
        links={[
          { label: 'Work',    href: '#' },
          { label: 'About',   href: '#' },
          { label: 'Contact', href: '#' },
        ]}
        active="Work"
        cta={
          <div className="flex items-center gap-3">
            <Button size="sm" variant="primary">Hire me</Button>
            <ThemeToggle />
          </div>
        }
      />

      <div className="flex flex-col gap-4 px-8 py-10">
        <h1 className="text-heading-1 text-default">Build things. Ship reliably.</h1>
        <p className="text-body-lg text-secondary">
          Toggle the theme above — all colors respond via CSS custom properties. No JavaScript re-renders.
        </p>
        <p className="text-body text-secondary">
          The <span className="text-mono text-primary">ThemeToggle</span> sets{' '}
          <span className="text-mono text-default">data-theme</span> on{' '}
          <span className="text-mono text-default">&lt;html&gt;</span> and persists to{' '}
          <span className="text-mono text-default">localStorage</span>.
        </p>
      </div>
    </div>
  ),
};
