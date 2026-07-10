---
name: walrus-design
description: Use this skill when building UI for clintenhopkins.com or any app that consumes @devwalrus/walrus-design. Contains the full design system — tokens, components, voice guidelines, and usage rules. Use it to design new components, write production code, or create Storybook stories that match the existing system.
user-invocable: true
---

Read the README.md in this directory for full context. Then:

- For **new components**: follow the patterns in `src/components/Button/index.js` — plain `React.createElement`, inline styles using CSS custom properties from `tokens/`, exported from `index.js` and `src/index.d.ts`, with a `.stories.jsx` file alongside.
- For **new stories**: follow `src/components/Card/Card.stories.jsx` — named exports, `tags: ['autodocs']`, `argTypes` for all props, at least one composition/showcase story.
- For **token reference**: read `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/effects.css`. Never hardcode colors or sizes — always use CSS custom properties.
- For **voice/copy**: sentence case prose, UPPERCASE mono for UI labels, `//` or `$` prefix for section eyebrows, no emoji, specific metrics over vague claims.
- For **production usage in a consuming app**: import `@devwalrus/walrus-design/styles.css` once at the app root, then import components by name.
