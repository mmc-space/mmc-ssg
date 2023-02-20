import type { SiteConfig } from '@node'
import type { PluginOption } from 'vite'

import { pluginHtmlTemplate } from './pluginHtml'
import { pluginMDX } from './pluginMdx'
import { pluginRoutes } from './pluginRoute'
import { pluginSiteData } from './pluginSiteData'
import { pluginSvg } from './pluginSvg'

export const generatePlugins = async (config: SiteConfig): Promise<PluginOption[]> => {
  return [
    pluginHtmlTemplate(),
    await pluginMDX(config),
    pluginRoutes(config),
    pluginSiteData(config),
    pluginSvg(),
  ]
}
