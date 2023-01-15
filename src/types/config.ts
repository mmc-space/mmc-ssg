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

export interface UserConfig<ThemeConfig = unknown> {
  title?: string

  themeConfig?: ThemeConfig

  /** 约定式路由 */
  route?: RouteOptions
}
