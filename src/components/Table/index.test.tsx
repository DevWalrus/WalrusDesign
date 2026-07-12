import { render, screen, fireEvent, within } from '@testing-library/react';
import { Table } from './index';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'age', header: 'Age', align: 'right' as const },
  { key: 'status', header: 'Status', render: (r: { status: string }) => <em>{r.status}</em> },
];
const data = [
  { id: 1, name: 'Ada', age: 36, status: 'active' },
  { id: 2, name: 'Alan', age: 41, status: 'away' },
];

describe('Table', () => {
  it('renders headers and rows, using render() when provided', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText('active').tagName).toBe('EM'); // custom render
  });

  it('renders the empty state when there is no data', () => {
    render(<Table columns={columns} data={[]} empty="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('defaults the empty state to "No data" and spans all columns', () => {
    render(<Table columns={columns} />);
    const cell = screen.getByText('No data');
    expect(cell).toHaveAttribute('colspan', '3');
  });

  it('renders a caption when provided', () => {
    render(<Table columns={columns} data={data} caption="Team" />);
    expect(screen.getByText('Team')).toBeInTheDocument();
  });

  it('applies striped backgrounds to odd rows', () => {
    render(<Table columns={columns} data={data} striped />);
    const rows = screen.getAllByRole('row').slice(1); // skip header row
    expect(rows[1]).toHaveStyle({ background: 'var(--bg-2)' });
  });

  it('makes rows interactive: click and keyboard activate onRowClick', () => {
    const onRowClick = vi.fn();
    render(<Table columns={columns} data={data} onRowClick={onRowClick} />);
    const rows = screen.getAllByRole('button');
    fireEvent.click(rows[0]);
    fireEvent.keyDown(rows[1], { key: 'Enter' });
    fireEvent.keyDown(rows[1], { key: ' ' });
    fireEvent.keyDown(rows[1], { key: 'x' }); // ignored
    expect(onRowClick).toHaveBeenCalledTimes(3);
    expect(onRowClick).toHaveBeenNthCalledWith(1, data[0], 0);
  });

  it('applies hover/focus/blur styles on interactive rows and restores striped bg', () => {
    render(<Table columns={columns} data={data} striped onRowClick={() => {}} />);
    const rows = screen.getAllByRole('button');
    const oddRow = rows[1];
    fireEvent.mouseEnter(oddRow);
    expect(oddRow).toHaveStyle({ background: 'var(--bg-2)' });
    fireEvent.mouseLeave(oddRow);
    expect(oddRow).toHaveStyle({ background: 'var(--bg-2)' }); // odd striped restores to bg-2
    fireEvent.focus(oddRow);
    expect(oddRow.style.boxShadow).toContain('var(--ring-focus)');
    fireEvent.blur(oddRow);
    expect(oddRow.style.boxShadow).toBe('none');
  });

  it('restores a transparent background on an even non-striped-context row after hover', () => {
    render(<Table columns={columns} data={data} onRowClick={() => {}} />);
    const firstRow = screen.getAllByRole('button')[0];
    fireEvent.mouseEnter(firstRow);
    fireEvent.mouseLeave(firstRow);
    expect(firstRow).toHaveStyle({ background: 'transparent' });
  });

  it('supports dense padding and right alignment', () => {
    render(<Table columns={columns} data={data} dense />);
    const ageHeader = screen.getByRole('columnheader', { name: 'Age' });
    expect(ageHeader).toHaveStyle({ textAlign: 'right' });
  });

  it('keys rows by index when rows have no id', () => {
    const noId = [{ name: 'X', age: 1, status: 's' }];
    render(<Table columns={columns} data={noId} />);
    expect(within(screen.getAllByRole('row')[1]).getByText('X')).toBeInTheDocument();
  });
});
