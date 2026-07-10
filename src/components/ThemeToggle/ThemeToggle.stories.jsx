import { ThemeToggle } from './index.js';
import { Nav } from '../Nav/index.js';

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
        { label: 'Work', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Contact', href: '#' },
      ]}
      active="Work"
      cta={<ThemeToggle />}
    />
  ),
};
