import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  enableShortcuts: true,
  showToolbar: true,
  sidebar: { showRoots: true },
  theme: create({
    base: 'dark',
    brandTitle: '← clintenhopkins.com',
    brandUrl: 'https://clintenhopkins.com',
    brandTarget: '_blank',
  }),
});
