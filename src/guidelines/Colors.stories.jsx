const swatchRow = { display: 'flex' };
const swatch = (bg, label, labelColor = 'var(--fg-1)') => (
  <div key={label} style={{ flex: 1, height: 130, display: 'flex', alignItems: 'flex-end', padding: 10, background: bg, boxSizing: 'border-box' }}>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em', color: labelColor }}>{label}</span>
  </div>
);

export default {
  title: 'Guidelines/Colors',
  parameters: { layout: 'padded', controls: { disable: true }, a11y: { disable: true } },
};

export const Primary = {
  render: () => (
    <div style={swatchRow}>
      {swatch('var(--primary-dim)', '--primary-dim', 'oklch(98% 0 0)')}
      {swatch('var(--primary)', '--primary', 'oklch(98% 0 0)')}
      {swatch('var(--primary-strong)', '--primary-strong', 'oklch(15% 0 0)')}
      {swatch('var(--primary-wash)', '--primary-wash')}
    </div>
  ),
};

export const Semantic = {
  render: () => (
    <div style={swatchRow}>
      {swatch('var(--success)', '--success', 'oklch(15% 0 0)')}
      {swatch('var(--warning)', '--warning', 'oklch(15% 0 0)')}
      {swatch('var(--danger)', '--danger', 'oklch(15% 0 0)')}
      {swatch('var(--info)', '--info', 'oklch(15% 0 0)')}
    </div>
  ),
};

export const Surfaces = {
  render: () => (
    <div style={swatchRow}>
      {['--bg-0', '--bg-1', '--bg-2', '--bg-3'].map((token, i, arr) => (
        <div key={token} style={{ flex: 1, height: 130, display: 'flex', alignItems: 'flex-end', padding: 10, background: `var(${token})`, borderRight: i < arr.length - 1 ? '1px solid var(--border-0)' : undefined, boxSizing: 'border-box' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em', color: 'var(--fg-1)' }}>{token}</span>
        </div>
      ))}
    </div>
  ),
};

export const Text = {
  render: () => (
    <div style={{ padding: 24, fontFamily: 'var(--font-body)' }}>
      {[
        ['var(--fg-0)', '--fg-0 · primary text, high contrast'],
        ['var(--fg-1)', '--fg-1 · secondary text'],
        ['var(--fg-2)', '--fg-2 · muted / placeholder'],
        ['var(--link)', '--link · link color'],
      ].map(([color, label]) => (
        <p key={label} style={{ color, fontSize: 16, margin: '0 0 10px' }}>{label}</p>
      ))}
    </div>
  ),
};
