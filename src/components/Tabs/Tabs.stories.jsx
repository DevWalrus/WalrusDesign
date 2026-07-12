import { useState } from 'react';
import { Tabs } from './index';
import { Badge } from '../Badge/index';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    tabs: [
      { label: 'Overview', value: 'overview', content: 'Overview panel content.' },
      { label: 'Activity', value: 'activity', content: 'Activity panel content.' },
      { label: 'Settings', value: 'settings', content: 'Settings panel content.' },
      { label: 'Archived', value: 'archived', content: 'Archived panel content.', disabled: true },
    ],
  },
};

export const Default = {};

export const Controlled = {
  render: (args) => {
    const [value, setValue] = useState('activity');
    return <Tabs {...args} value={value} onChange={setValue} />;
  },
};

export const UsingUtilityClasses = {
  name: 'Using Utility Classes',
  render: () => (
    <div className="flex flex-col gap-6" style={{ width: 560 }}>
      <div>
        <h2 className="text-heading-2 text-default">Project settings</h2>
        <p className="text-body-sm text-secondary mt-1">Manage your project configuration and team access.</p>
      </div>

      <Tabs
        tabs={[
          {
            label: 'Overview',
            value: 'overview',
            content: (
              <div className="flex flex-col gap-4">
                <h3 className="text-heading-3 text-default">Project overview</h3>
                <p className="text-body text-secondary">
                  This project contains the core infrastructure definitions for the production environment.
                  All changes are reviewed before deployment.
                </p>
                <div className="flex gap-2">
                  <Badge tone="success" dot>active</Badge>
                  <Badge tone="neutral">infrastructure</Badge>
                  <Badge tone="neutral">terraform</Badge>
                </div>
              </div>
            ),
          },
          {
            label: 'Activity',
            value: 'activity',
            content: (
              <div className="flex flex-col gap-3">
                <h3 className="text-heading-3 text-default">Recent activity</h3>
                {[
                  { msg: 'Deployed v1.4.2 to production',  time: '4m ago', tone: 'success' },
                  { msg: 'Database migration completed',    time: '1h ago', tone: 'info'    },
                  { msg: 'Rollback triggered on staging',   time: '3h ago', tone: 'warning' },
                ].map(({ msg, time, tone }) => (
                  <div key={msg} className="flex items-center justify-between border-b py-3">
                    <div className="flex items-center gap-3">
                      <Badge tone={tone} dot>{tone}</Badge>
                      <span className="text-body-sm text-default">{msg}</span>
                    </div>
                    <span className="text-caption text-muted">{time}</span>
                  </div>
                ))}
              </div>
            ),
          },
          {
            label: 'Settings',
            value: 'settings',
            content: (
              <div className="flex flex-col gap-4">
                <h3 className="text-heading-3 text-default">Settings</h3>
                <p className="text-body text-secondary">Project configuration and access controls.</p>
              </div>
            ),
          },
          { label: 'Archived', value: 'archived', disabled: true, content: null },
        ]}
      />
    </div>
  ),
};
