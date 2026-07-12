import { render, screen } from '@testing-library/react';
import { Hero } from './index';

describe('Hero', () => {
  it('renders title and subtitle', () => {
    render(<Hero title="Welcome" subtitle="to the system" />);
    expect(screen.getByRole('heading', { name: 'Welcome' })).toBeInTheDocument();
    expect(screen.getByText('to the system')).toBeInTheDocument();
  });

  it('labels the section with the title, or falls back to "Hero"', () => {
    const { rerender } = render(<Hero title="Welcome" />);
    expect(screen.getByRole('region', { name: 'Welcome' })).toBeInTheDocument();
    rerender(<Hero />);
    expect(screen.getByRole('region', { name: 'Hero' })).toBeInTheDocument();
  });

  it('omits title, subtitle and cta when not provided', () => {
    render(<Hero />);
    expect(screen.queryByRole('heading')).toBeNull();
  });

  it.each(['dots', 'scanlines', 'none'] as const)('supports the %s texture', (texture) => {
    render(<Hero title="t" texture={texture} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('centers content when align is center', () => {
    render(<Hero title="t" align="center" cta={<button>Go</button>} />);
    expect(screen.getByRole('region').className).toContain('items-center');
  });

  it('left-aligns by default and renders a cta', () => {
    render(<Hero title="t" cta={<button>Go</button>} />);
    expect(screen.getByRole('region').className).toContain('items-start');
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });
});
