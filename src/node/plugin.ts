import type { OutputAsset, OutputChunk } from 'rollup'
import type { Plugin } from 'vite'

import pluginMdxRollup from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import fs from 'fs-extra'

import { generateRoutesCode } from './route'
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

export const pluginRoutes = (config: SiteConfig): Plugin => {
  const virtualModuleId = 'virtual:routes'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'vite-plugin-routes',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId
    },

    load(id, options) {
      if (id === resolvedVirtualModuleId) {
        console.log(options?.ssr ? 'ssr' : 'not ssr')

        return {
          code: generateRoutesCode(config),
          moduleSideEffects: false,
        }
      }
    },
  }
}

export const pluginSvgr = (
  options: {
    defaultExport?: 'url' | 'component'
  } = {},
): Plugin => {
  const { defaultExport = 'component' } = options

  return {
    name: 'vite-plugin-svgr',
    async transform(code, id) {
      if (!id.endsWith('.svg')) return code

      const { transform: svgrTransform } = await import('@svgr/core')
      const { transform: esbuildTransform } = await import('esbuild')
      const svg = await fs.promises.readFile(id, 'utf8')
      const svgrResult = await svgrTransform(
        svg,
        {},
        { componentName: 'ReactComponent' },
      )
      let componentCode = svgrResult
      if (defaultExport === 'url') {
        componentCode = svgrResult.replace(
          'export default ReactComponent',
          'export { ReactComponent }',
        )
        componentCode += code
      }
      const result = await esbuildTransform(componentCode, {
        loader: 'jsx',
      })
      return result.code
    },
  }
}

export const pluginMDX = async (config: SiteConfig): Promise<Plugin> => {
  console.log(config)
  return pluginMdxRollup({
    jsx: true,
    remarkPlugins: [
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: 'frontmatter' }],
    ],
  })
}

export const pluginSiteData = (config: SiteConfig): Plugin => {
  const virtualModuleId = 'virtual:siteData'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'vite-plugin-siteData',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return {
          code: `export const siteData = ${JSON.stringify(config)}`,
        }
      }
    },
  }
}
