import type { SiteConfig } from '@shared/types'
import type { PluginOption } from 'vite'

import UnoCSS from 'unocss/vite'
import pluginReact from '@vitejs/plugin-react'

import { pluginHtmlTemplate } from './pluginHtml'
import { pluginMDX } from './pluginMdx'
import { pluginRoutes } from './pluginRoute'
import { pluginSiteData } from './pluginSiteData'
import { pluginSvg } from './pluginSvg'

export const generatePlugins = async (config: SiteConfig, isServer = false): Promise<PluginOption[]> => {
  return [
    UnoCSS(),
    pluginHtmlTemplate(),
    await pluginMDX(config),
    pluginRoutes(config),
    pluginSiteData(config),
    pluginSvg(),
    isServer ? [] : pluginReact(),
  ]
}
