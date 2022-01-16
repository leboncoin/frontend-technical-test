const tsconfigPaths = require('./tsconfig.paths.json')

const aliases = Object.keys(tsconfigPaths.compilerOptions.paths).map((aliasTs) => aliasTs.split('/')[0])
const projectAliases = [...new Set(aliases)].join('|')

const builtInModules = require('module').builtinModules.join('|')

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': 'typescript',
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:jsx-a11y/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['@emotion', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    'object-shorthand': 'warn',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'react/jsx-key': ['warn', { checkFragmentShorthand: true }],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [`^(${builtInModules})(/|$)`], // Packages. `react` related packages come first.
          ['^react', '^@?\\w'], // Side effect imports.
          ['^\\u0000'], // Project aliases
          [`^(${projectAliases})(/.*|$)`], // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Other relative imports.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$', '^\\./styles$'], // Other Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    // Rules disabled following airbnb integration
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': ['error', { props: false }], // Default setting for rule to overwrite airbnb setting https://github.com/reduxjs/redux-toolkit/issues/521#issuecomment-641172961
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }], // For material-ui compatibility
    'no-plusplus': 'off',
    'jsx-a11y/anchor-is-valid': 'warn', // FIXME set "error" here when fixed
    'jsx-a11y/no-onchange': 'off', // @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/398#issuecomment-735219207
    'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: ['return', 'block-like'] }], // Blank line before every block-like
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'arrow-body-style': ['error', 'as-needed'],
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    'react/require-default-props': 'off',
    'react/function-component-definition': 'off',
  },
  reportUnusedDisableDirectives: true,
  overrides: [
    {
      files: ['src/**/*.test.tsx?'],
      extends: ['react-app/jest'],
    },
    {
      files: ['src/**/styles.ts'],
      rules: {
        'sort-keys': ['error', 'asc', { caseSensitive: false }],
      },
    },
  ],
  ignorePatterns: ['!.storybook', 'cache', 'node_modules', 'infra/artifact/resources/web-app'],
}
