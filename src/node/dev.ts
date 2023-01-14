import { createServer } from 'vite'
import pluginReact from '@vitejs/plugin-react'
import { pluginHtmlTemplate } from './plugin'

export const createDevServer = (root: string) =>
  createServer({
    root,
    plugins: [pluginHtmlTemplate(), pluginReact()],
  })
