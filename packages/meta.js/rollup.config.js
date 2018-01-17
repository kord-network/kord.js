import buble from 'rollup-plugin-buble'
import butternut from 'rollup-plugin-butternut'
import replace from 'rollup-plugin-replace'

import pkg from './package.json'

const isTest = process.env.TEST

export default {
  input: './src/index.js',
  plugins: [
    replace({
      values: {
        VERSION: JSON.stringify(pkg.version),
      },
    }),
    buble(),
    !isTest && butternut(),
  ],
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
