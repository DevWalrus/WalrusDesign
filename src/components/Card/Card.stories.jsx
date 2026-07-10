import { Card } from './index.js';
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-1)' }}>main → prod</span>
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, width: 700 }}>
      <Card title="Uptime">99.98% this month</Card>
      <Card title="Deploys">142 in the last 30 days</Card>
      <Card title="Errors">0 unresolved incidents</Card>
    </div>
  ),
};
