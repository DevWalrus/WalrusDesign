export default {
  title: 'Guidelines/Brand',
  parameters: { layout: 'padded', controls: { disable: true }, a11y: { disable: true } },
};

export const Wordmark = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, fontFamily: 'var(--font-mono)' }}>
      <div style={{ fontSize: 40, color: 'var(--fg-0)', display: 'flex', alignItems: 'center' }}>
        <span style={{ color: 'var(--fg-2)' }}>[</span>
        <span style={{ color: 'var(--primary-strong)', fontWeight: 600 }}>CH</span>
        <span style={{ color: 'var(--fg-2)' }}>]</span>
        <span style={{
          display: 'inline-block', width: 12, height: '1em', marginLeft: 10,
          background: 'var(--primary)', animation: 'ds-caret-blink 1.1s step-end infinite',
        }} />
      </div>
    </div>
  ),
};

