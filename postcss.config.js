export default {
  plugins: {
    'postcss-import': {},
    'postcss-url': { url: (asset) => asset.url.endsWith('.woff2') ? `fonts/${asset.url.split('/').pop()}` : asset.url },
    cssnano: { preset: ['default', { discardComments: { removeAll: true } }] },
  },
};
