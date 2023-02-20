import type { InlineConfig } from 'vite'
import { build } from 'vite'
import type { RollupOutput } from 'rollup'
import type { SiteConfig } from '@node'
import { CLIENT_ENTRY_PATH, CLIENT_PATH, NODE_PATH, SERVER_ENTRY_PATH } from '../constants'
import { generatePlugins } from '../plugin'

const resolveViteConfig = async (
  ssr: boolean,
  root: string,
  options: SiteConfig,
): Promise<InlineConfig> => {
  return {
    mode: 'production',
    root,
    resolve: {
      alias: {
        '@client': `${CLIENT_PATH}`,
        '@node': `${NODE_PATH}`,
      },
    },
    plugins: await generatePlugins(options, true),
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
export const bundle = async (root: string, options: SiteConfig) => {
  const [clientResult, serverResult] = await (Promise.all([
    build(await resolveViteConfig(false, root, options)),
    build(await resolveViteConfig(true, root, options)),
  ]) as Promise<[RollupOutput, RollupOutput]>)

  return {
    clientResult,
    serverResult,
  }
}
