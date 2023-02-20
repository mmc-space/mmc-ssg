import pluginMdxRollup from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkPluginGFM from 'remark-gfm'
import remarkGemoji from 'remark-gemoji'
import remarkDirective from 'remark-directive'

import type { Plugin } from 'vite'
import type { SiteConfig } from '../config'

export const pluginMDX = async (config: SiteConfig): Promise<Plugin> => {
  console.log(config)
  return pluginMdxRollup({
    remarkPlugins: [
      /** 自动链接文字、脚注、删除线、表格、任务列表） */
      remarkPluginGFM,
      /** emoji */
      remarkGemoji,
      /** 备注 */
      remarkDirective,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: 'frontmatter' }],
    ],
  })
}
