import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from './index';

const tabs = [
  { label: 'One', value: 'one', content: 'first' },
  { label: 'Two', value: 'two', content: 'second' },
  { label: 'Off', value: 'off', content: 'nope', disabled: true },
];

describe('Tabs', () => {
  it('renders tabs and shows the first panel by default', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('first')).toBeInTheDocument();
  });

  it('honors defaultValue', () => {
    render(<Tabs tabs={tabs} defaultValue="two" />);
    expect(screen.getByText('second')).toBeInTheDocument();
  });

  it('switches panels on click (uncontrolled)', () => {
    render(<Tabs tabs={tabs} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.getByText('second')).toBeInTheDocument();
  });

  it('does not switch when clicking a disabled tab', () => {
    render(<Tabs tabs={tabs} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Off' }));
    expect(screen.getByText('first')).toBeInTheDocument();
  });

  it('supports controlled mode: click calls onChange but active follows value', () => {
    const onChange = vi.fn();
    const { rerender } = render(<Tabs tabs={tabs} value="one" onChange={onChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(onChange).toHaveBeenCalledWith('two');
    expect(screen.getByText('first')).toBeInTheDocument(); // unchanged until parent updates value
    rerender(<Tabs tabs={tabs} value="two" onChange={onChange} />);
    expect(screen.getByText('second')).toBeInTheDocument();
  });

  it('applies hover/focus/blur styles to inactive, non-disabled tabs', () => {
    render(<Tabs tabs={tabs} />);
    const two = screen.getByRole('tab', { name: 'Two' });
    fireEvent.mouseEnter(two);
    fireEvent.mouseLeave(two);
    fireEvent.focus(two);
    expect(two.style.boxShadow).toContain('var(--ring-focus)');
    fireEvent.blur(two);
    expect(two.style.boxShadow).toBe('none');
  });

  it('renders no panel when the active tab has no content', () => {
    render(<Tabs tabs={[{ label: 'Bare', value: 'bare' }]} />);
    expect(screen.queryByRole('tabpanel')).toBeNull();
  });

  it('renders nothing to select from an empty tabs list without crashing', () => {
    render(<Tabs tabs={[]} />);
    expect(screen.queryByRole('tab')).toBeNull();
  });
});
