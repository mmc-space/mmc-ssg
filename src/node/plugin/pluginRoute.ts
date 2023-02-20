import type { Plugin } from 'vite'
import type { SiteConfig } from '../config'
import { generateRoutesCode } from '../route'

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
