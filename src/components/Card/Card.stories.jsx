import { Card } from './index';
import { Badge } from '../Badge/index.js';
import { Button } from '../Button/index.js';

export default {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    children: { control: 'text' },
  },
  args: {
    title: 'Card title',
    children: 'Card body content goes here.',
  },
};

export const Default = {};

export const Clickable = {
  args: {
    title: 'Clickable card',
    children: 'Hover to see the state change. Click me.',
    onClick: () => {},
  },
};

export const NoTitle = {
  name: 'No Title',
  args: {
    title: undefined,
    children: 'A card without a title — just body content.',
  },
};

export const WithRichContent = {
  name: 'Rich Content',
  render: () => (
    <Card title="Deployment status" style={{ width: 320 }}>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-body-sm text-secondary">main → prod</span>
          <Badge tone="success" dot>live</Badge>
        </div>
        <Button variant="secondary" size="sm">View logs</Button>
      </div>
    </Card>
  ),
};

export const Grid = {
  name: 'Card Grid',
  render: () => (
    <div className="grid grid-cols-3 gap-4" style={{ width: 700 }}>
      <Card title="Uptime">99.98% this month</Card>
      <Card title="Deploys">142 in the last 30 days</Card>
      <Card title="Errors">0 unresolved incidents</Card>
    </div>
  ),
};

export const LightMode = {
  name: 'Light Mode',
  globals: { theme: 'light' },
  render: () => (
    <div className="grid grid-cols-2 gap-4" style={{ width: 500 }}>
      <Card title="Static card">Plain content, no hover.</Card>
      <Card title="Clickable card" onClick={() => {}}>Hover and click me.</Card>
    </div>
  ),
};

export const UsingUtilityClasses = {
  name: 'Using Utility Classes',
  parameters: { a11y: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-8" style={{ width: 720 }}>
      <div>
        <p className="text-label text-muted mb-3">grid + gap-* for card grids</p>
        <div className="grid grid-cols-3 gap-4">
          <Card title="Uptime">99.98% this month</Card>
          <Card title="Deploys">142 in the last 30 days</Card>
          <Card title="Errors">0 unresolved incidents</Card>
        </div>
      </div>

      <div>
        <p className="text-label text-muted mb-3">Heading hierarchy above a card grid</p>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-heading-2 text-default">System health</p>
            <p className="text-body-sm text-secondary mt-1">Updated 2 minutes ago · All regions</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Card title="API gateway"><Badge tone="success" dot>operational</Badge></Card>
            <Card title="Database"><Badge tone="warning" dot>degraded</Badge></Card>
            <Card title="Auth service"><Badge tone="success" dot>operational</Badge></Card>
          </div>
        </div>
      </div>

      <div>
        <p className="text-label text-muted mb-3">Rich card with utility classes inside</p>
        <Card style={{ width: 340 }}>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-label text-default">main → production</p>
                <p className="text-caption text-muted mt-1">Triggered 4m ago by @devwalrus</p>
              </div>
              <Badge tone="success" dot>live</Badge>
            </div>
            <div className="border-t pt-3">
              <Button variant="secondary" size="sm">View logs</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  ),
};
