export default {
  title: 'Guidelines/Layout',
  parameters: { layout: 'padded', controls: { disable: true }, a11y: { disable: true } },
};

const Box = ({ children, className = '', style = {} }) => (
  <div
    className={`flex items-center justify-center text-mono text-caption bg-primary-wash text-primary rounded-sm p-3 ${className}`}
    style={style}
  >
    {children}
  </div>
);

const Label = ({ children }) => (
  <p className="text-label text-muted mb-3">{children}</p>
);

const Code = ({ children }) => (
  <code className="text-mono text-sm text-secondary">{children}</code>
);

/* ─── Flex ────────────────────────────────────────────────────────────────── */

export const FlexBasics = {
  name: 'Flex — basics',
  render: () => (
    <div className="flex flex-col gap-8">

      <div>
        <Label>flex + gap-3 (row, default)</Label>
        <div className="flex gap-3">
          <Box>one</Box>
          <Box>two</Box>
          <Box>three</Box>
        </div>
      </div>

      <div>
        <Label>flex flex-col + gap-3</Label>
        <div className="flex flex-col gap-3" style={{ maxWidth: 200 }}>
          <Box>one</Box>
          <Box>two</Box>
          <Box>three</Box>
        </div>
      </div>

      <div>
        <Label>flex items-center justify-between</Label>
        <div className="flex items-center justify-between border rounded-md p-4">
          <Box>left</Box>
          <Box>right</Box>
        </div>
      </div>

      <div>
        <Label>flex flex-wrap gap-3 (wraps at container edge)</Label>
        <div className="flex flex-wrap gap-3" style={{ maxWidth: 340 }}>
          {['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot'].map((n) => (
            <Box key={n}>{n}</Box>
          ))}
        </div>
      </div>

    </div>
  ),
};

export const FlexSizing = {
  name: 'Flex — sizing (flex-1 / flex-none)',
  render: () => (
    <div className="flex flex-col gap-8">

      <div>
        <Label>flex-1 — all siblings share space equally</Label>
        <div className="flex gap-3">
          <Box className="flex-1">flex-1</Box>
          <Box className="flex-1">flex-1</Box>
          <Box className="flex-1">flex-1</Box>
        </div>
      </div>

      <div>
        <Label>flex-1 + flex-none — one fixed, rest share remainder</Label>
        <div className="flex gap-3">
          <Box className="flex-none" style={{ width: 120 }}>flex-none 120px</Box>
          <Box className="flex-1">flex-1</Box>
          <Box className="flex-1">flex-1</Box>
        </div>
      </div>

      <div>
        <Label>shrink-0 — item refuses to shrink below its natural size</Label>
        <div className="flex gap-3" style={{ maxWidth: 340 }}>
          <Box className="shrink-0" style={{ width: 160 }}>shrink-0 (160px)</Box>
          <Box className="flex-1 overflow-hidden">
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
              long text that would normally force shrinking
            </span>
          </Box>
        </div>
      </div>

    </div>
  ),
};

/* ─── Grid ────────────────────────────────────────────────────────────────── */

export const GridColumns = {
  name: 'Grid — grid-cols-*',
  render: () => (
    <div className="flex flex-col gap-8">

      {[2, 3, 4, 6].map((n) => (
        <div key={n}>
          <Label><Code>{`grid grid-cols-${n} gap-3`}</Code></Label>
          <div className={`grid grid-cols-${n} gap-3`}>
            {Array.from({ length: n }).map((_, i) => (
              <Box key={i}>col</Box>
            ))}
          </div>
        </div>
      ))}

    </div>
  ),
};

export const ColSpan = {
  name: 'Grid — col-span-* (Bootstrap-style)',
  render: () => (
    <div className="flex flex-col gap-8">

      <div>
        <Label>
          <Code>grid grid-cols-12</Code> with <Code>col-span-*</Code> children — same idea as Bootstrap's col system
        </Label>
        <div className="grid grid-cols-12 gap-3">
          <Box className="col-span-1">1</Box>
          <Box className="col-span-2">2</Box>
          <Box className="col-span-3">3</Box>
          <Box className="col-span-6">6</Box>
          <Box className="col-span-6">6</Box>
          <Box className="col-span-4">4</Box>
          <Box className="col-span-4">4</Box>
          <Box className="col-span-4">4</Box>
          <Box className="col-span-8">8</Box>
          <Box className="col-span-4">4</Box>
          <Box className="col-span-12">12 (full)</Box>
        </div>
      </div>

      <div>
        <Label>Classic sidebar layout — <Code>col-span-3</Code> aside + <Code>col-span-9</Code> main</Label>
        <div className="grid grid-cols-12 gap-4" style={{ minHeight: 120 }}>
          <Box className="col-span-3">sidebar</Box>
          <Box className="col-span-9">main content</Box>
        </div>
      </div>

      <div>
        <Label>Mixed columns on a <Code>grid-cols-6</Code> base</Label>
        <div className="grid grid-cols-6 gap-3">
          <Box className="col-span-2">2/6</Box>
          <Box className="col-span-4">4/6</Box>
          <Box className="col-span-3">3/6</Box>
          <Box className="col-span-3">3/6</Box>
          <Box className="col-span-full">col-span-full</Box>
        </div>
      </div>

    </div>
  ),
};
