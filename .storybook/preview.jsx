import '../styles.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: { disable: true },
    layout: 'centered',

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ 
        background: 'var(--bg-0)',
        //minHeight: '100vh',
        padding: '2rem',
        boxSizing: 'border-box'
      }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
