module.exports = {
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // web-loader reduces the size of images size
  loaders: [
    {
      test: /\.(jpe?g|png)$/i,
      loaders: ['file-loader', 'webp-loader?{quality: 13}'],
    },
  ],
};
