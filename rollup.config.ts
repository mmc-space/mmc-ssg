import type { RollupOptions } from 'rollup'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'
import dts from 'rollup-plugin-dts'

const nodeTypes: RollupOptions = {
  input: 'src/node/index.ts',
  output: {
    format: 'esm',
    file: 'dist/index.d.ts',
  },
  plugins: [dts({ respectExternal: true })],
}

export default defineConfig([
  {
    plugins: [esbuild(), json()],
    input: ['src/node/cli.ts', 'src/node/index.ts'],
    output: {
      format: 'esm',
      dir: 'dist',
    },
  },
  nodeTypes,
],
)
