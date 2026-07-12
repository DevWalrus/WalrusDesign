import { Button } from './index';

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

export const Primary    = { args: { variant: 'primary',   children: 'Primary' } };
export const Secondary  = { args: { variant: 'secondary', children: 'Secondary' } };
export const Ghost      = { args: { variant: 'ghost',     children: 'Ghost' } };
export const Danger     = { args: { variant: 'danger',    children: 'Danger' } };
export const Disabled   = { args: { variant: 'primary',   children: 'Disabled', disabled: true } };
export const Small      = { args: { variant: 'primary',   children: 'Small', size: 'sm' } };
export const Large      = { args: { variant: 'primary',   children: 'Large', size: 'lg' } };

export const AllVariants = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
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
    <div className="flex items-center gap-3">
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),
};

export const LightMode = {
  name: 'Light Mode',
  globals: { theme: 'light' },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  ),
};

export const UsingUtilityClasses = {
  name: 'Using Utility Classes',
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-label text-muted mb-3">gap-* between buttons</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary">gap-2</Button>
          <Button variant="secondary">between</Button>
          <Button variant="ghost">each</Button>
          <Button variant="danger">button</Button>
        </div>
      </div>

      <div>
        <p className="text-label text-muted mb-3">Semantic typography around actions</p>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-heading-3 text-default">Confirm deletion</h3>
            <p className="text-body text-secondary mt-2">
              This action is permanent and cannot be undone. All associated data will be removed.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="danger">Delete permanently</Button>
            <Button variant="secondary">Cancel</Button>
          </div>
        </div>
      </div>

      <div>
        <p className="text-label text-muted mb-3">Form actions panel</p>
        <div className="flex flex-col gap-3 p-6 bg-surface rounded-md">
          <h4 className="text-heading-4 text-default">Account settings</h4>
          <p className="text-body-sm text-secondary">Changes apply immediately across all sessions.</p>
          <div className="flex gap-3 mt-2">
            <Button variant="primary">Save changes</Button>
            <Button variant="ghost">Discard</Button>
          </div>
        </div>
      </div>
    </div>
  ),
};
