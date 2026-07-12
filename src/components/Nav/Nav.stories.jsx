import { Nav } from './index';
import { Button } from '../Button/index.js';
import { Badge } from '../Badge/index.js';

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
  args: { appName: 'create.clinten.dev' },
};

export const WithCTA = {
  name: 'With CTA Button',
  args: { cta: <Button size="sm" variant="primary">Hire me</Button> },
};

export const NoActiveLink = {
  name: 'No Active Link',
  args: { active: null },
};

export const LightMode = {
  name: 'Light Mode',
  globals: { theme: 'light' },
  parameters: { layout: 'fullscreen' },
  args: { cta: <Button size="sm" variant="primary">Hire me</Button> },
};

export const UsingUtilityClasses = {
  name: 'Using Utility Classes',
  parameters: { layout: 'fullscreen', a11y: { disable: true } },
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
        cta={<Button size="sm" variant="primary">Hire me</Button>}
      />

      <main className="flex flex-col gap-6 px-8 py-10">
        <div className="flex items-center gap-3">
          <h1 className="text-heading-1 text-default">Work</h1>
          <Badge tone="neutral">6 projects</Badge>
        </div>

        <p className="text-body-lg text-secondary">
          A selection of internal tools, infrastructure projects, and open-source work.
        </p>

        <div className="flex flex-col gap-0 mt-2">
          {['Deploy pipeline', 'Internal dashboard', 'Auth service'].map((name) => (
            <div
              key={name}
              className="flex items-center justify-between border-b py-4"
            >
              <span className="text-body text-default">{name}</span>
              <span className="text-caption text-muted">2024</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  ),
};
