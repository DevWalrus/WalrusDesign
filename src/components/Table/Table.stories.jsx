import { Table } from './index';
import { Badge } from '../Badge/index';
import { Button } from '../Button/index';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  {
    key: 'status',
    header: 'Status',
    render: (row) => (
      <Badge tone={row.status === 'active' ? 'success' : 'neutral'} dot>
        {row.status}
      </Badge>
    ),
  },
  { key: 'count', header: 'Count', align: 'right' },
];

const data = [
  { id: 1, name: 'Ada Lovelace', role: 'Engineer',   status: 'active',   count: 12 },
  { id: 2, name: 'Alan Turing',  role: 'Researcher', status: 'active',   count: 8  },
  { id: 3, name: 'Grace Hopper', role: 'Admiral',    status: 'inactive', count: 41 },
];

export default {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  args: { columns, data, striped: false, dense: false },
};

export const Default     = {};
export const Striped     = { args: { striped: true } };
export const Dense       = { args: { dense: true } };
export const Interactive = {
  name: 'Interactive Rows',
  args: { onRowClick: (row) => alert(`Clicked ${row.name}`) },
};
export const Empty = { args: { data: [] } };

export const UsingUtilityClasses = {
  name: 'Using Utility Classes',
  parameters: { a11y: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6" style={{ width: 640 }}>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-heading-2 text-default">Team members</h2>
          <p className="text-body-sm text-secondary mt-1">3 members · 2 active</p>
        </div>
        <Button variant="primary" size="sm">Invite member</Button>
      </div>

      <Table columns={columns} data={data} />

      <div className="flex items-center justify-between">
        <p className="text-caption text-muted">Showing 3 of 3 results</p>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">Previous</Button>
          <Button variant="secondary" size="sm">Next</Button>
        </div>
      </div>
    </div>
  ),
};
