const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

const buildPrettierCommand = (filenames) =>
  `prettier ${filenames.map((f) => path.relative(process.cwd(), f))} --write`

module.exports = {
  '*.{ts,tsx}': () => 'type-check',
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, buildPrettierCommand],
  '*.{md|json|html}': [buildPrettierCommand],
}
