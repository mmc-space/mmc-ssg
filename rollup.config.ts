import type { RollupOptions } from 'rollup'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import dts from 'rollup-plugin-dts'

const external: RollupOptions['external'] = ['shared/types/types.d.ts']

const plugins: RollupOptions['plugins'] = [alias({
  entries: {
    '@shared/*': 'src/shared/*',
  },
}), esbuild(), json()]

const node: RollupOptions = {
  plugins,
  external,
  input: ['src/node/index.ts', 'src/node/cli.ts'],
  output: {
    format: 'esm',
    entryFileNames: '[name].js',
    chunkFileNames: 'serve-[hash].js',
    dir: 'dist/node',
  },
}

const nodeTypes: RollupOptions = {
  input: 'src/node/index.ts',
  output: {
    format: 'esm',
    file: 'dist/node/index.d.ts',
  },
  external,
  plugins: [dts({ respectExternal: true })],
}

const clientTypes: RollupOptions = {
  input: 'src/client/index.ts',
  output: {
    format: 'esm',
    file: 'dist/client/index.d.ts',
  },
  external,
  plugins: [dts({ respectExternal: true })],
}

export default defineConfig([
  node,
  nodeTypes,
  clientTypes,
])
