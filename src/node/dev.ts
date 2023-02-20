import { createServer } from 'vite'
import { generatePlugins } from './plugin'
import { resolveConfig } from './config'
import type { CLIDevOptions } from './cli'
import { CLIENT_PATH, NODE_PATH } from './constants'

export const createDevServer = async (root: string, cliOptions: CLIDevOptions) => {
  const config = await resolveConfig(
    root,
    'serve',
    'development',
    cliOptions.config,
  )

  return createServer({
    root,
    resolve: {
      alias: {
        '@client': `${CLIENT_PATH}`,
        '@node': `${NODE_PATH}`,
      },
    },
    plugins: await generatePlugins(config),
  })
}
