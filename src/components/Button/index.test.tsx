import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './index';

describe('Button', () => {
  it('renders children and defaults to a primary, md, type=button element', () => {
    render(<Button>Click</Button>);
    const btn = screen.getByRole('button', { name: 'Click' });
    expect(btn).toHaveAttribute('type', 'button');
    expect(btn).toHaveStyle({ textTransform: 'none' }); // primary
  });

  it('uppercases non-primary variants', () => {
    render(<Button variant="secondary">go</Button>);
    expect(screen.getByRole('button')).toHaveStyle({ textTransform: 'uppercase' });
  });

  it.each(['primary', 'secondary', 'ghost', 'danger'] as const)(
    'applies hover background and restores it on leave for %s',
    (variant) => {
      render(<Button variant={variant}>x</Button>);
      const btn = screen.getByRole('button');
      fireEvent.mouseEnter(btn);
      fireEvent.mouseLeave(btn);
      expect(btn).toBeInTheDocument();
    }
  );

  it.each(['sm', 'md', 'lg'] as const)('supports size %s', (size) => {
    render(<Button size={size}>x</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('falls back to md styles for an unknown size', () => {
    render(<Button size={'xl' as never}>x</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('fires onClick', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>x</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders disabled styling and does not fire onClick when disabled', () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>x</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveStyle({ cursor: 'not-allowed', opacity: '0.45' });
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('scales on mouse down and back up when enabled', () => {
    render(<Button>x</Button>);
    const btn = screen.getByRole('button');
    fireEvent.mouseDown(btn);
    expect(btn).toHaveStyle({ transform: 'scale(0.97)' });
    fireEvent.mouseUp(btn);
    expect(btn).toHaveStyle({ transform: 'scale(1)' });
  });

  it('shows focus ring on focus and clears on blur', () => {
    render(<Button>x</Button>);
    const btn = screen.getByRole('button');
    fireEvent.focus(btn);
    expect(btn.style.boxShadow).toContain('var(--ring-focus)');
    fireEvent.blur(btn);
    expect(btn.style.boxShadow).toBe('none');
  });

  it('renders a left icon', () => {
    render(<Button icon={<span data-testid="ic" />} iconPosition="left">x</Button>);
    expect(screen.getByTestId('ic')).toBeInTheDocument();
  });

  it('renders a right icon', () => {
    render(<Button icon={<span data-testid="ic" />} iconPosition="right">x</Button>);
    expect(screen.getByTestId('ic')).toBeInTheDocument();
  });
});
