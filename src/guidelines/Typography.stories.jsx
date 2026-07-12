export default {
  title: 'Guidelines/Typography',
  parameters: { layout: 'padded', controls: { disable: true }, a11y: { disable: true } },
};

const label = (text) => (
  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.05em', color: 'var(--fg-2)', display: 'block', marginBottom: 4 }}>
    {text}
  </span>
);

const divider = { borderBottom: '1px solid var(--border-0)', margin: '24px 0' };

// ─── Type scale ────────────────────────────────────────────────────────────────

const SCALE = [
  { token: '--text-4xl', value: '64px', weight: 700 },
  { token: '--text-3xl', value: '48px', weight: 700 },
  { token: '--text-2xl', value: '36px', weight: 600 },
  { token: '--text-xl',  value: '28px', weight: 600 },
  { token: '--text-lg',  value: '22px', weight: 500 },
  { token: '--text-md',  value: '18px', weight: 400 },
  { token: '--text-base',value: '16px', weight: 400 },
  { token: '--text-sm',  value: '13.5px',weight: 400 },
  { token: '--text-xs',  value: '12px', weight: 400 },
];

export const TypeScale = {
  name: 'Type Scale',
  render: () => (
    <div style={{ padding: 24 }}>
      {SCALE.map(({ token, value, weight }) => (
        <div key={token} style={{ marginBottom: 20 }}>
          {label(`${token}  ·  ${value}`)}
          <div style={{ fontFamily: 'var(--font-display)', fontSize: `var(${token})`, fontWeight: weight, lineHeight: 'var(--leading-tight)', color: 'var(--fg-0)', letterSpacing: 'var(--tracking-tight)' }}>
            The quick brown fox
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Font families ─────────────────────────────────────────────────────────────

export const FontFamilies = {
  name: 'Font Families',
  render: () => (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 32 }}>
        {label('--font-display  ·  Space Grotesk  ·  headings, display, UI prose')}
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--fg-0)', lineHeight: 1.1 }}>
          AaBbCcDdEeFf 0123456789
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: 'var(--fg-1)', marginTop: 8, lineHeight: 1.6, maxWidth: 560 }}>
          I build high-performance internal tools and simplify the processes around them.
        </div>
      </div>

      <div style={divider} />

      <div style={{ marginBottom: 32 }}>
        {label('--font-body  ·  Space Grotesk  ·  body copy (same face, explicit token)')}
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 400, color: 'var(--fg-0)', lineHeight: 1.6, maxWidth: 560 }}>
          Reliability work, dev-ops pipelines, and the systems that let teams move faster with less friction. Secondary copy uses <span style={{ color: 'var(--fg-1)' }}>--fg-1</span> and <span style={{ color: 'var(--fg-2)' }}>--fg-2</span> for hierarchy.
        </div>
      </div>

      <div style={divider} />

      <div>
        {label('--font-mono  ·  JetBrains Mono  ·  nav, labels, badges, buttons, code')}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 400, color: 'var(--fg-0)', lineHeight: 1.6 }}>
          AaBbCcDdEeFf 0123456789 !@#$%^&*()
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-1)', marginTop: 8 }}>
          <span style={{ color: 'var(--primary)' }}>$</span> deploy --env production --confirm
        </div>
      </div>
    </div>
  ),
};

// ─── Weights ───────────────────────────────────────────────────────────────────

export const Weights = {
  render: () => (
    <div style={{ padding: 24 }}>
      {[
        [400, 'Regular  ·  400  ·  body copy, secondary UI'],
        [500, 'Medium  ·  500  ·  subheadings, emphasis'],
        [600, 'SemiBold  ·  600  ·  section headings'],
        [700, 'Bold  ·  700  ·  hero headings, high-impact display'],
      ].map(([weight, desc]) => (
        <div key={weight} style={{ marginBottom: 20 }}>
          {label(desc)}
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: weight, color: 'var(--fg-0)', lineHeight: 1.1 }}>
            Build great things.
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Line height ───────────────────────────────────────────────────────────────

export const LineHeight = {
  name: 'Line Height',
  render: () => (
    <div style={{ padding: 24 }}>
      {[
        ['--leading-tight',  '1.1', 'Display headings, large type'],
        ['--leading-snug',   '1.3', 'Subheadings, compact UI text'],
        ['--leading-normal', '1.6', 'Body copy, long-form prose'],
      ].map(([token, value, usage]) => (
        <div key={token} style={{ marginBottom: 32 }}>
          {label(`${token}  ·  ${value}  ·  ${usage}`)}
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--fg-0)', lineHeight: `var(${token})`, maxWidth: 480, background: 'var(--bg-1)', padding: 16, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-0)' }}>
            I build high-performance internal tools and simplify the processes around them — reliability work, dev-ops pipelines, and the systems that let teams move faster with less friction.
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Letter spacing ────────────────────────────────────────────────────────────

export const LetterSpacing = {
  name: 'Letter Spacing',
  render: () => (
    <div style={{ padding: 24 }}>
      {[
        ['--tracking-tight',   '-0.02em', 'var(--font-display)', 700, 32, 'Large headings, display type'],
        ['--tracking-normal',  '0',       'var(--font-body)',    400, 16, 'Body copy default'],
        ['--tracking-wide',    '0.06em',  'var(--font-mono)',    400, 12, 'Mono labels, nav, eyebrows'],
        ['--tracking-widest',  '0.12em',  'var(--font-mono)',    400, 11, 'Uppercase UI labels, section markers'],
      ].map(([token, value, family, weight, size, usage]) => (
        <div key={token} style={{ marginBottom: 28 }}>
          {label(`${token}  ·  ${value}  ·  ${usage}`)}
          <div style={{ fontFamily: family, fontSize: size, fontWeight: weight, letterSpacing: `var(${token})`, textTransform: size <= 12 ? 'uppercase' : undefined, color: 'var(--fg-0)', lineHeight: 1.4 }}>
            {size <= 12 ? 'Selected Work · 2024' : 'The quick brown fox jumps over the lazy dog'}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Unicode subsets ───────────────────────────────────────────────────────────
// Forces the browser to fetch every woff2 file so you can confirm they all load.

const SUBSETS = [
  { file: 'sg-latin',        variable: '--font-display', script: 'Latin',        copy: 'Build great things. Ship reliably.',            sub: 'build --target release --out dist' },
  { file: 'jb-latin',        variable: '--font-mono',    script: 'Latin',        copy: 'Build great things. Ship reliably.',            sub: 'build --target release --out dist' },
  { file: 'sg-latin-ext',    variable: '--font-display', script: 'Latin Ext',    copy: 'Stavěj skvělé věci. Dodávej spolehlivě.',       sub: "build('Łódź') --target Ñoño --out Ångström" },
  { file: 'jb-latin-ext',    variable: '--font-mono',    script: 'Latin Ext',    copy: 'Stavěj skvělé věci. Dodávej spolehlivě.',       sub: "build('Łódź') --target Ñoño --out Ångström" },
  { file: 'sg-vietnamese',   variable: '--font-display', script: 'Vietnamese',   copy: 'Xây dựng điều tuyệt vời. Vận chuyển đáng tin.', sub: "build --target 'thiết-kế' --out hệ-thống" },
  { file: 'jb-vietnamese',   variable: '--font-mono',    script: 'Vietnamese',   copy: 'Xây dựng điều tuyệt vời. Vận chuyển đáng tin.', sub: "build --target 'thiết-kế' --out hệ-thống" },
  { file: 'jb-cyrillic',     variable: '--font-mono',    script: 'Cyrillic',     copy: 'Строй великое. Доставляй надёжно.',             sub: 'build --target великое --out надёжно' },
  { file: 'jb-cyrillic-ext', variable: '--font-mono',    script: 'Cyrillic Ext', copy: 'ѠѢ Строй расширенное. Ꙗꙗ доставка.',           sub: 'build --target ѠѢ --out Ꙗꙗ' },
  { file: 'jb-greek',        variable: '--font-mono',    script: 'Greek',        copy: 'Χτίσε μεγάλα. Αποστολή αξιόπιστα.',             sub: 'build --target μεγάλα --out αξιόπιστα' },
];

export const UnicodeSubsets = {
  name: 'Unicode Subsets',
  render: () => (
    <div style={{ padding: 24 }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', letterSpacing: '0.04em', marginBottom: 24 }}>
        Open the Network tab and filter by woff2 to confirm each file is fetched.
      </p>
      {SUBSETS.map(({ file, variable, script, copy, sub }) => (
        <div key={file} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid var(--border-0)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.05em', color: 'var(--fg-2)', marginBottom: 8 }}>
            {file} · {script}
          </div>
          <div style={{ fontFamily: `var(${variable})`, fontSize: 18, fontWeight: 500, color: 'var(--fg-0)', lineHeight: 1.4, marginBottom: 6 }}>
            {copy}
          </div>
          <div style={{ fontFamily: `var(${variable})`, fontSize: 14, color: 'var(--fg-1)', lineHeight: 1.5 }}>
            {sub}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Showcase ──────────────────────────────────────────────────────────────────

export const Display = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-display)', color: 'var(--fg-0)', padding: 24 }}>
      {[
        { size: 'var(--text-3xl)', weight: 700, text: 'Aa Build things.' },
        { size: 'var(--text-2xl)', weight: 600, text: 'Aa Ship reliably.' },
        { size: 'var(--text-xl)',  weight: 600, text: 'Aa Scale teams.' },
        { size: 'var(--text-lg)',  weight: 500, text: 'Aa Simplify process.' },
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
