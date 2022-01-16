const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',

  webpackFinal: async (storybookConfig) => {
    storybookConfig.resolve = {
      ...storybookConfig.resolve,
      alias: {
        ...storybookConfig.resolve.alias,
        'shared-tech-logger': false,
        'feature-toggles': false,
      },

      plugins: [...((storybookConfig.resolve && storybookConfig.resolve.plugins) || []), new TsconfigPathsPlugin({})],
    }

    storybookConfig.plugins = [...storybookConfig.plugins, new NodePolyfillPlugin()]

    return storybookConfig
  },
}
