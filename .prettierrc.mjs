/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  printWidth: 88,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  bracketSameLine: false,
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      options: { parser: 'typescript' },
    },
    {
      files: '*.css',
      options: { parser: 'css' },
    },
  ],
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-css-order',
  ],
  pluginSearchDirs: false,
}
