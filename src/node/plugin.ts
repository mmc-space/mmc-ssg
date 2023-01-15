import type { Plugin } from 'vite'
import { CLIENT_ENTRY_PATH } from './constants'

export const pluginHtmlTemplate = (): Plugin => ({
  name: 'template-html-plugin',
  apply: 'serve',
  configureServer(server) {
    return () => {
      server.middlewares.use(async (req, res, next) => {
        let template = `<!DOCTYPE html>
        <html>
          <head>
            <title></title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="description" content="">
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="/@fs/${CLIENT_ENTRY_PATH}"></script>
          </body>
        </html>`
        try {
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html')

          // hmr
          template = await server.transformIndexHtml(
            req.url ?? '',
            template,
            req.originalUrl,
          )
          res.end(template)
        }
        catch (error) {
          next(error)
        }
      })
    }
  },
})

export const pluginRoutes = (): Plugin => {
  const virtualModuleId = 'virtual:routes'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'vite-plugin-routes',
    resolveId(id) {
      if (id === virtualModuleId)
        return resolvedVirtualModuleId
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        return {
          code: 'export const routes = []',
        }
      }
    },
  }
}
