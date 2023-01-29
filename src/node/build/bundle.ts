import type { InlineConfig } from 'vite'
import { build } from 'vite'
import type { RollupOutput } from 'rollup'
import pluginReact from '@vitejs/plugin-react'
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from '../constants'
import { pluginHtmlTemplate, pluginRoutes } from '../plugin'

const resolveViteConfig = async (
  ssr: boolean,
  root: string,
): Promise<InlineConfig> => {
  return {
    mode: 'production',
    root,
    plugins: [pluginHtmlTemplate(), pluginRoutes(), pluginReact()],
    build: {
      ssr,
      ssrManifest: !ssr,
      assetsDir: ssr ? '' : 'assets',
      outDir: ssr ? 'temp' : 'dist',
      rollupOptions: {
        input: ssr ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: 'es',
          entryFileNames: ssr ? '[name].mjs' : undefined,
        },
      },
    },
  }
}

// bundles the app for both client and server.
export const bundle = async (root: string = process.cwd()) => {
  const [clientResult, serverResult] = await (Promise.all([
    build(await resolveViteConfig(false, root)),
    build(await resolveViteConfig(true, root)),
  ]) as Promise<[RollupOutput, RollupOutput]>)

  return {
    clientResult,
    serverResult,
  }
}
