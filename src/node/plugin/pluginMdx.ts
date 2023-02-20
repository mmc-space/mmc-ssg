import pluginMdxRollup from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkPluginGFM from 'remark-gfm'
import remarkGemoji from 'remark-gemoji'
import remarkDirective from 'remark-directive'
import shiki from 'shiki'

import type { Plugin } from 'vite'
import { rehypePluginShiki } from '../markdown/plugin/shiki'
import { rehypePluginPreWrapper } from '../markdown/plugin/preWrapper'
import { rehypePluginLineNumbers } from '../markdown/plugin/lineNumbers'
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
    rehypePlugins: [
      // heighlight
      [
        rehypePluginShiki,
        {
          highlighter: await shiki.getHighlighter({ theme: 'dracula' }),
        },
      ],
      rehypePluginPreWrapper,
      rehypePluginLineNumbers,
    ],
  })
}
