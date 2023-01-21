import { createServer } from 'vite'
import pluginReact from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { pluginHtmlTemplate, pluginRoutes, pluginSvgr } from './plugin'
import { resolveConfig } from './config'
import type { CLIOptions } from './cli'

export const createDevServer = async (root: string, cliOptions: CLIOptions) => {
  const config = await resolveConfig(root, 'serve', 'development', cliOptions.config)

  return createServer({
    root,
    plugins: [pluginHtmlTemplate(), pluginSvgr(), UnoCSS(), pluginRoutes(config), pluginReact()],
  })
}
