import buble from 'rollup-plugin-buble'
import butternut from 'rollup-plugin-butternut'

import pkg from './package.json'

const isTest = process.env.TEST

export default {
  input: './src/index.js',
  external: ['@kord.js/shared', 'ethereumjs-util'],
  globals: {
    '@kord.js/shared': 'shared',
    'ethereumjs-util': 'ethereumjsUtil',
  },
  plugins: [buble(), !isTest && butternut()],
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: pkg.name,
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
}
