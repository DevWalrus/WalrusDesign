import { render, screen, fireEvent } from '@testing-library/react';
import { Nav } from './index';

describe('Nav', () => {
  it('renders the default mark and no app name', () => {
    render(<Nav />);
    expect(screen.getByText('CH')).toBeInTheDocument();
    expect(screen.queryByText('/')).toBeNull();
  });

  it('renders a custom mark and app name', () => {
    render(<Nav mark="WD" appName="create.dev" />);
    expect(screen.getByText('WD')).toBeInTheDocument();
    expect(screen.getByText('create.dev')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
  });

  it('renders links, marks the active one, and defaults href to #', () => {
    render(<Nav links={[{ label: 'Home' }, { label: 'Docs', href: '/docs' }]} active="Home" />);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toHaveAttribute('aria-current', 'page');
    expect(home).toHaveAttribute('href', '#');
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
  });

  it('fires a link onClick', () => {
    const onClick = vi.fn();
    render(<Nav links={[{ label: 'Home', onClick }]} />);
    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    expect(onClick).toHaveBeenCalled();
  });

  it('applies hover/focus/blur styles, restoring active vs inactive colors', () => {
    render(<Nav links={[{ label: 'Home' }, { label: 'Docs' }]} active="Home" />);
    const active = screen.getByRole('link', { name: 'Home' });
    const inactive = screen.getByRole('link', { name: 'Docs' });
    fireEvent.mouseEnter(active);
    fireEvent.mouseLeave(active); // active branch on leave
    fireEvent.mouseEnter(inactive);
    fireEvent.mouseLeave(inactive); // inactive branch on leave
    fireEvent.focus(inactive);
    expect(inactive.style.boxShadow).toContain('var(--ring-focus)');
    fireEvent.blur(inactive);
    expect(inactive.style.boxShadow).toBe('none');
  });

  it('renders a cta slot', () => {
    render(<Nav cta={<button>Sign in</button>} />);
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });
});
