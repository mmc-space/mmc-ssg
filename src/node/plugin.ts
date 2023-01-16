import type { OutputAsset, OutputChunk } from 'rollup'
import type { Plugin } from 'vite'
import { getFiles } from '../util/route'
import type { SiteConfig } from './config'
import { CLIENT_ENTRY_PATH } from './constants'

export const isPageChunk = (
  chunk: OutputAsset | OutputChunk,
): chunk is OutputChunk & { facadeModuleId: string } =>
  !!(
    chunk.type === 'chunk'
    && chunk.isEntry
    && chunk.facadeModuleId
    && chunk.facadeModuleId.endsWith('.md')
  )

export const pluginHtmlTemplate = (): Plugin => ({
  name: 'template-html-plugin',
  apply: 'serve',
  configureServer(server) {
    return () => {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '/'
        if (!url.endsWith('.html')) return next()

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
            url,
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

export const pluginRoutes = (config?: SiteConfig): Plugin => {
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
        const routes = getFiles(config)
        return {
          code: `export const routes = ${JSON.stringify(routes)}`,
        }
      }
    },
  }
}
