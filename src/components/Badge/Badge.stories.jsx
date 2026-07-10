import { Badge } from './index.js';

export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    dot: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'badge',
    tone: 'neutral',
    dot: false,
  },
};

export const Neutral = { args: { tone: 'neutral', children: 'neutral' } };
export const Primary = { args: { tone: 'primary', children: 'primary' } };
export const Success = { args: { tone: 'success', children: 'success' } };
export const Warning = { args: { tone: 'warning', children: 'warning' } };
export const Danger = { args: { tone: 'danger', children: 'danger' } };
export const Info = { args: { tone: 'info', children: 'info' } };
export const WithDot = { args: { tone: 'success', children: 'online', dot: true } };

export const AllTones = {
  name: 'All Tones',
  render: () => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
      {['neutral', 'primary', 'success', 'warning', 'danger', 'info'].map((tone) => (
        <Badge key={tone} tone={tone}>{tone}</Badge>
      ))}
    </div>
  ),
};

export const WithDots = {
  name: 'With Dots',
  render: () => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
      {['neutral', 'primary', 'success', 'warning', 'danger', 'info'].map((tone) => (
        <Badge key={tone} tone={tone} dot>{tone}</Badge>
      ))}
    </div>
  ),
};
