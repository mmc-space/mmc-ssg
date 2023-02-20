import { createServer } from 'vite'
import { generatePlugins } from './plugin'
import { resolveConfig } from './config'
import type { CLIDevOptions } from './cli'

export const createDevServer = async (root: string, cliOptions?: CLIDevOptions) => {
  const config = await resolveConfig(
    root,
    'serve',
    'development',
    cliOptions?.config,
  )

  return createServer({
    root,
    base: '/',
    plugins: await generatePlugins(config),
  })
}
