import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeToggle } from './index';

beforeEach(() => {
  document.documentElement.removeAttribute('data-theme');
  localStorage.clear();
});

describe('ThemeToggle', () => {
  it('renders a labelled toggle and applies the resolved theme to <html> on mount', async () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole('button', { name: 'Switch to light mode' }); // dark default
    expect(btn).toBeInTheDocument();
    await waitFor(() =>
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    );
  });

  it('toggles the theme and updates its aria-label', async () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument()
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('shows the focus ring for keyboard focus but not after a mouse press', () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole('button');
    // keyboard focus (no preceding mousedown)
    fireEvent.focus(btn);
    expect(btn.style.boxShadow).toContain('var(--ring-focus)');
    fireEvent.blur(btn);
    expect(btn.style.boxShadow).toBe('none');
    // mouse press then focus -> no ring
    fireEvent.mouseDown(btn);
    fireEvent.focus(btn);
    expect(btn.style.boxShadow).toBe('none');
  });

  it('applies hover styles on enter and restores them on leave', () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole('button');
    fireEvent.mouseEnter(btn);
    expect(btn.style.borderColor).toBe('var(--border-1)');
    fireEvent.mouseLeave(btn);
    expect(btn.style.borderColor).toBe('var(--border-0)');
  });

  it('accepts a className and custom style', () => {
    render(<ThemeToggle className="my-toggle" style={{ opacity: 0.9 }} />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('my-toggle');
    expect(btn).toHaveStyle({ opacity: '0.9' });
  });
});
