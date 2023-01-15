import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'

export default defineConfig({
  plugins: [esbuild(), json()],
  input: ['src/node/cli.ts', 'src/node/index.ts'],
  output: {
    format: 'esm',
    dir: 'dist/node',
  },
})
