import { Button } from './index.js';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
};

export const Primary = { args: { variant: 'primary', children: 'Primary' } };
export const Secondary = { args: { variant: 'secondary', children: 'Secondary' } };
export const Ghost = { args: { variant: 'ghost', children: 'Ghost' } };
export const Danger = { args: { variant: 'danger', children: 'Danger' } };
export const Disabled = { args: { variant: 'primary', children: 'Disabled', disabled: true } };
export const Small = { args: { variant: 'primary', children: 'Small', size: 'sm' } };
export const Large = { args: { variant: 'primary', children: 'Large', size: 'lg' } };

export const AllVariants = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  ),
};

export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),
};
