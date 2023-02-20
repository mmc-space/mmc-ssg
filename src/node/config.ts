import path, { resolve } from 'node:path'
import { loadConfigFromFile, normalizePath } from 'vite'
import fs from 'fs-extra'
import fg from 'fast-glob'
import { DEFAULT_EXCLUDE, DEFAULT_THEME_PATH } from './constants'
import { normalizeRoutePath } from './route'

export namespace DefaultTheme {
  export interface Config {
    /**
     * The logo file of the site.
     *
     * @example '/logo.svg'
     */
    logo?: Image

    /**
     * Custom site title in navbar. If the value is undefined,
     * `config.title` will be used.
     */
    siteTitle?: string

    /**
     * Custom outline title in the aside component.
     *
     * @default 'On this page'
     */
    outlineTitle?: string
    /**
     * Whether to show the sidebar in right position.
     */
    outline?: boolean
    /**
     * The nav items.
     */
    nav?: NavItem[]

    /**
     * The sidebar items.
     */
    sidebar?: Sidebar

    /**
     * Info for the edit link. If it's undefined, the edit link feature will
     * be disabled.
     */
    editLink?: EditLink

    /**
     * Set custom last updated text.
     *
     * @default 'Last updated'
     */
    lastUpdatedText?: string

    /**
     * Set custom prev/next labels.
     */
    docFooter?: DocFooter

    /**
     * The social links to be displayed at the end of the nav bar. Perfect for
     * placing links to social services such as GitHub, Twitter, Facebook, etc.
     */
    socialLinks?: SocialLink[]

    /**
     * The footer configuration.
     */
    footer?: Footer
    /**
     * The prev page text.
     */
    prevPageText?: string
    /**
     * The next page text.
     */
    nextPageText?: string
    /**
     * Locale config
     */
    locales?: Record<string, LocaleConfig>
    /**
     * Whether to open the full text search
     */
    search?: boolean
    /**
     * Whether to use back top
     */
    backTop?: BackTopOptions
  }

  /**
   * locale config
   */
  export interface LocaleConfig {
    lang?: string
    title?: string
    langRoutePrefix?: string
    description?: string
    head?: string[]
    label: string
    selectText?: string
    nav?: NavItem[]
    sidebar?: Sidebar
    outlineTitle?: string
    lastUpdatedText?: string
    editLink?: EditLink
    prevPageText?: string
    nextPageText?: string
  }
  // nav -----------------------------------------------------------------------

  export interface NavItem {
    text: string
    link: string

    /**
     * `activeMatch` is expected to be a regex string. We can't use actual
     * RegExp object here because it isn't serializable
     */
    activeMatch?: string
  }

  export interface NavItemWithChildren {
    text?: string
    items: NavItem[]
  }

  // image -----------------------------------------------------------------------
  export type Image = string | { src: string; alt?: string }

  // sidebar -------------------------------------------------------------------
  export interface Sidebar {
    [path: string]: SidebarGroup[]
  }

  export interface SidebarGroup {
    text?: string
    items: SidebarItem[]
    collapsed?: boolean
    collapsable?: boolean
  }

  export type SidebarItem =
    | { text: string; link: string }
    | { text: string; link?: string; items: SidebarItem[] }

  // edit link -----------------------------------------------------------------

  export interface EditLink {
    /**
     * Pattern for edit link.
     *
     * @example 'https://github.com/vuejs/vitepress/edit/main/docs/:path'
     */
    pattern: string

    /**
     * Custom text for edit link.
     *
     * @default 'Edit this page'
     */
    text?: string
  }

  // prev-next -----------------------------------------------------------------

  export interface DocFooter {
    /**
     * Custom label for previous page button.
     *
     * @default 'Previous page'
     */
    prev?: SidebarItem

    /**
     * Custom label for next page button.
     *
     * @default 'Next page'
     */
    next?: SidebarItem
  }

  // social link ---------------------------------------------------------------

  export interface SocialLink {
    icon: SocialLinkIcon
    mode: 'link' | 'text' | 'img'
    content: string
  }

  export type SocialLinkIcon =
    | 'discord'
    | 'facebook'
    | 'github'
    | 'instagram'
    | 'linkedin'
    | 'slack'
    | 'twitter'
    | 'youtube'
    | 'weixin'
    | 'qq'
    | 'juejin'
    | 'zhihu'
    | 'bilibili'
    | 'weibo'
    | { svg: string }

  // footer --------------------------------------------------------------------

  export interface Footer {
    message?: string
    copyright?: string
  }

  // locales -------------------------------------------------------------------

  export interface LocaleLinks {
    text: string
    items: LocaleLink[]
  }

  export interface LocaleLink {
    text: string
    link: string
  }

  export type BackTopOptions =
    | boolean
    | {
      visibleHeight?: number
      duration?: number
      animation?: BackTopAnimation
    }

  export type BackTopAnimation =
    | 'linear'
    | 'quadIn'
    | 'quadOut'
    | 'quadInOut'
    | 'cubicIn'
    | 'cubicOut'
    | 'cubicInOut'
    | 'quartIn'
    | 'quartOut'
    | 'quartInOut'
    | 'quintIn'
    | 'quintOut'
    | 'quintInOut'
    | 'sineIn'
    | 'sineOut'
    | 'sineInOut'
    | 'bounceIn'
    | 'bounceOut'
    | 'bounceInOut'
}

export interface RouteOptions {
  /** 根目录 */
  root?: string

  /** 统一前缀 */
  prefix?: string
  /**
   * The extension name of the filepath that will be converted to a route
   * @default ['js','jsx','ts','tsx','md','mdx']
   */
  extensions?: string[]

  include?: string[]

  exclude?: string[]
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

export function defineConfig<ThemeConfig = DefaultTheme.Config>(config: UserConfig<ThemeConfig>) {
  return config
}

const getUserConfigPath = (root: string) => {
  const configFileName = 'mmc.config'
  const configPath = ['ts', 'js']
    .map(ext => resolve(root, `${configFileName}.${ext}`))
    .find(fs.pathExistsSync)

  return configPath
}

const resolveUserConfig = async (
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production',
  customizeConfig?: string,
) => {
  const configPath = getUserConfigPath(root)
  const result = await loadConfigFromFile(
    { command, mode },
    customizeConfig || configPath,
    root,
  )

  return result!
}

export const resolveConfig = async (
  root: string = process.cwd(),
  command: 'serve' | 'build' = 'build',
  mode: 'development' | 'production',
  customizeConfig?: string,
) => {
  const userConfig = ((await resolveUserConfig(
    root,
    command,
    mode,
    customizeConfig,
  ))?.config ?? {}) as UserConfig<DefaultTheme.Config>

  const userThemeDir = resolve(root, 'theme')
  const themeDir = fs.pathExistsSync(userThemeDir)
    ? userThemeDir
    : DEFAULT_THEME_PATH
  const { extensions = ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'], exclude = [], include = [] }
    = userConfig.route ?? {}

  const files = (
    await fg([`**/*.{${extensions.join(',')}}`, ...include], {
      cwd: root,
      absolute: true,
      ignore: [...DEFAULT_EXCLUDE, ...exclude],
    })
  ).sort()

  const pages = files.map((file) => {
    const fileRelativePath = normalizePath(
      path.relative(root, file),
    )

    const routePath = normalizeRoutePath(fileRelativePath)

    return {
      path: routePath,
      filePath: file,
    }
  })

  const config: SiteConfig = {
    pages,
    root,
    command,
    themeDir,
    ...userConfig,
  }

  return config
}
