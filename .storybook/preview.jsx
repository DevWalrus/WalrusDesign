import '../styles.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },

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
      test: 'error',
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'dark';
      return (
        <div
          data-theme={theme}
          style={{
            background: 'var(--bg-0)',
            padding: '2rem',
            boxSizing: 'border-box',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
