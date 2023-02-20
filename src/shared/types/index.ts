import type { RouteObject } from 'react-router-dom'
import type { DefaultTheme, RouteOptions } from './default-theme'
export { DefaultTheme } from './default-theme'
export type PageType = 'doc' | '404' | 'home'

export interface Feature {
  icon?: string
  title: string
  details: string
}

export interface Hero {
  name: string
  text: string
  tagline: string
  image?: {
    src: string
    alt: string
  }
  actions: {
    text: string
    link: string
    theme: 'brand' | 'alt'
  }[]
}

export interface FrontMatterMeta {
  title: string
  description: string
  api: boolean
  pageType: PageType
  features?: Feature[]
  hero?: Hero
  sidebar?: boolean
  outline?: boolean
  lineNumbers?: boolean
}

export interface SiteData<ThemeConfig = DefaultTheme.Config> {
  root: string
  base: string
  lang: string
  title: string
  description: string
  icon: string
  themeConfig: ThemeConfig
  appearance: boolean
}

export interface UserConfig<ThemeConfig = DefaultTheme.Config> {
  /** base path */
  base?: string

  title?: string

  themeConfig?: ThemeConfig

  /** 约定式路由 */
  route?: RouteOptions
}

export interface SiteConfig extends Omit<UserConfig, 'themeConfig'> {
  pages: { path: string; filePath: string }[]
  root: string
  command: 'serve' | 'build'

  themeDir?: string

  outDir?: string
}

export type PageData = {
  siteData?: SiteData<DefaultTheme.Config>
  title?: string
  pageType: PageType
  frontmatter?: FrontMatterMeta
} & RouteObject
