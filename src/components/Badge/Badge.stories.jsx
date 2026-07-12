import { Badge } from './index';

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
export const Danger  = { args: { tone: 'danger',  children: 'danger'  } };
export const Info    = { args: { tone: 'info',     children: 'info'    } };
export const WithDot = { args: { tone: 'success',  children: 'online', dot: true } };

export const AllTones = {
  name: 'All Tones',
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {['neutral', 'primary', 'success', 'warning', 'danger', 'info'].map((tone) => (
        <Badge key={tone} tone={tone}>{tone}</Badge>
      ))}
    </div>
  ),
};

export const WithDots = {
  name: 'With Dots',
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {['neutral', 'primary', 'success', 'warning', 'danger', 'info'].map((tone) => (
        <Badge key={tone} tone={tone} dot>{tone}</Badge>
      ))}
    </div>
  ),
};

export const LightMode = {
  name: 'Light Mode',
  globals: { theme: 'light' },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {['neutral', 'primary', 'success', 'warning', 'danger', 'info'].map((tone) => (
        <Badge key={tone} tone={tone} dot>{tone}</Badge>
      ))}
    </div>
  ),
};

export const UsingUtilityClasses = {
  name: 'Using Utility Classes',
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-label text-muted mb-3">Badges inline with body copy</p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-body text-default">API gateway</span>
            <Badge tone="success" dot>operational</Badge>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-body text-default">Database cluster</span>
            <Badge tone="warning" dot>degraded</Badge>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-body text-default">Auth service</span>
            <Badge tone="danger" dot>outage</Badge>
          </div>
        </div>
      </div>

      <div>
        <p className="text-label text-muted mb-3">Badges with heading hierarchy</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h3 className="text-heading-3 text-default">Pull request #142</h3>
            <Badge tone="primary">open</Badge>
          </div>
          <p className="text-body-sm text-secondary">feat: add utility class layer to design system</p>
          <div className="flex gap-2 mt-2">
            <Badge tone="neutral">typescript</Badge>
            <Badge tone="neutral">css</Badge>
            <Badge tone="neutral">design-system</Badge>
          </div>
        </div>
      </div>

      <div>
        <p className="text-label text-muted mb-3">Caption + badge pairing</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-body text-default">Deployment pipeline</p>
            <p className="text-caption text-muted mt-1">Last run 4 minutes ago</p>
          </div>
          <Badge tone="success" dot>passed</Badge>
        </div>
      </div>
    </div>
  ),
};
