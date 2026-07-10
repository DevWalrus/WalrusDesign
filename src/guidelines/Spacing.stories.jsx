export default {
  title: 'Guidelines/Spacing',
  parameters: { layout: 'padded', controls: { disable: true } },
};

export const Scale = {
  render: () => (
    <div style={{ padding: 20, fontFamily: 'var(--font-mono)', color: 'var(--fg-1)', fontSize: 11 }}>
      {['--space-2', '--space-4', '--space-6', '--space-8', '--space-12', '--space-16'].map((token) => (
        <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ width: 90 }}>{token}</span>
          <div style={{ background: 'var(--primary)', height: 10, width: `var(${token})` }} />
        </div>
      ))}
    </div>
  ),
};
