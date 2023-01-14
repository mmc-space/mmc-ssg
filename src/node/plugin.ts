import { readFile } from 'fs/promises'
import type { Plugin } from 'vite'
import { DEFAULT_HTML_PATH } from './constants'

export const pluginHtmlTemplate = (): Plugin => ({
  name: 'template-html-plugin',
  apply: 'serve',
  configureServer(server) {
    return () => {
      server.middlewares.use(async (req, res, next) => {
        let template = await readFile(DEFAULT_HTML_PATH, 'utf-8')
        try {
          template = await server.transformIndexHtml(
            req.url!,
            template,
            req.originalUrl,
          )

          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html')
          res.end(template)
        }
        catch (error) {
          next(error)
        }
      })
    }
  },
})
