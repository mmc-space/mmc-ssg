import type { Plugin } from 'vite'
import type { SiteConfig } from '../config'

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
