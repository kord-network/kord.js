import buble from 'rollup-plugin-buble'
import butternut from 'rollup-plugin-butternut'

import pkg from './package.json'

const isTest = process.env.TEST

export default {
  input: './src/index.js',
  external: [
    '@meta.js/identity-claims',
    '@meta.js/shared',
    'ethereumjs-util',
    'slugify',
  ],
  globals: {
    '@meta.js/identity-claims': 'identityClaims',
    '@meta.js/shared': 'shared',
    'ethereumjs-util': 'ethereumjsUtil',
    slugify: 'slugify',
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
