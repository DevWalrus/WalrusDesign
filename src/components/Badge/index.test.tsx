import { render, screen } from '@testing-library/react';
import { Badge } from './index';

describe('Badge', () => {
  it('renders its label', () => {
    render(<Badge>online</Badge>);
    expect(screen.getByText('online')).toBeInTheDocument();
  });

  it.each(['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const)(
    'renders tone %s',
    (tone) => {
      render(<Badge tone={tone}>{tone}</Badge>);
      expect(screen.getByText(tone)).toBeInTheDocument();
    }
  );

  it('falls back to neutral for an unknown tone', () => {
    render(<Badge tone={'weird' as never}>x</Badge>);
    expect(screen.getByText('x')).toBeInTheDocument();
  });

  it('renders a dot with glow for a non-neutral tone', () => {
    const { container } = render(<Badge tone="success" dot>up</Badge>);
    const dot = container.querySelector('span > span');
    expect(dot).toBeTruthy();
    expect((dot as HTMLElement).style.boxShadow).not.toBe('none');
  });

  it('renders a dot without glow for the neutral tone', () => {
    const { container } = render(<Badge tone="neutral" dot>n</Badge>);
    const dot = container.querySelector('span > span') as HTMLElement;
    expect(dot.style.boxShadow).toBe('none');
  });

  it('renders no dot by default', () => {
    const { container } = render(<Badge>x</Badge>);
    expect(container.querySelector('span > span')).toBeNull();
  });

  it('merges custom style', () => {
    render(<Badge style={{ opacity: 0.5 }}>x</Badge>);
    expect(screen.getByText('x')).toHaveStyle({ opacity: '0.5' });
  });
});
