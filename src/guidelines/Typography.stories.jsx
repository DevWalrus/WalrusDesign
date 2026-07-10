export default {
  title: 'Guidelines/Typography',
  parameters: { layout: 'padded', controls: { disable: true }, a11y: { disable: true } },
};

export const Display = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-display)', color: 'var(--fg-0)', padding: 24 }}>
      {[
        { size: 'var(--text-3xl)', weight: 700, text: 'Aa Build things.' },
        { size: 'var(--text-2xl)', weight: 600, text: 'Aa Ship reliably.' },
        { size: 'var(--text-xl)', weight: 600, text: 'Aa Scale teams.' },
        { size: 'var(--text-lg)', weight: 500, text: 'Aa Simplify process.' },
      ].map(({ size, weight, text }) => (
        <div key={text} style={{ fontSize: size, fontWeight: weight, lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tight)', marginBottom: 8 }}>{text}</div>
      ))}
    </div>
  ),
};

export const Body = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--fg-0)', padding: 24 }}>
      <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', maxWidth: 560, margin: '0 0 10px' }}>
        I build high-performance internal tools and simplify the processes around them — reliability work, dev-ops pipelines, and the systems that let teams move faster with less friction.
      </p>
      <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', maxWidth: 560, margin: 0, color: 'var(--fg-1)' }}>
        Secondary / supporting copy sits a step down in size and in --fg-1.
      </p>
    </div>
  ),
};

export const Mono = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-mono)', padding: 24 }}>
      <div style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', color: 'var(--primary-strong)', marginBottom: 12 }}>
        // selected work
      </div>
      <div style={{ fontSize: 'var(--text-sm)', background: 'var(--bg-1)', border: '1px solid var(--border-0)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', color: 'var(--fg-1)' }}>
        <span style={{ color: 'var(--primary)' }}>$</span> deploy --env production --confirm
      </div>
    </div>
  ),
};
