import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './index';

describe('Card', () => {
  it('renders a static container with no button role by default', () => {
    render(<Card>body</Card>);
    expect(screen.getByText('body')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('wraps string children in a paragraph but renders node children as-is', () => {
    const { rerender } = render(<Card>plain text</Card>);
    expect(screen.getByText('plain text').tagName).toBe('P');
    rerender(<Card><a href="#">link</a></Card>);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders an optional title', () => {
    render(<Card title="Meta">body</Card>);
    expect(screen.getByRole('heading', { name: 'Meta' })).toBeInTheDocument();
  });

  it('becomes interactive when onClick is provided', () => {
    const onClick = vi.fn();
    render(<Card onClick={onClick}>body</Card>);
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabindex', '0');
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('activates on Enter and Space and ignores other keys', () => {
    const onClick = vi.fn();
    render(<Card onClick={onClick}>body</Card>);
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });
    fireEvent.keyDown(card, { key: ' ' });
    fireEvent.keyDown(card, { key: 'a' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('applies hover styling on mouse enter/leave when interactive', () => {
    render(<Card onClick={() => {}}>body</Card>);
    const card = screen.getByRole('button');
    fireEvent.mouseEnter(card);
    expect(card).toHaveStyle({ background: 'var(--bg-2)' });
    fireEvent.mouseLeave(card);
    expect(card).toHaveStyle({ background: 'var(--bg-1)' });
  });

  it('toggles the focus ring on focus and blur when interactive', () => {
    render(<Card onClick={() => {}}>body</Card>);
    const card = screen.getByRole('button');
    fireEvent.focus(card);
    expect(card.style.boxShadow).toContain('var(--ring-focus)');
    fireEvent.blur(card);
    expect(card.style.boxShadow).toContain('var(--shadow-sm)');
  });
});
