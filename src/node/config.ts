import path, { resolve } from 'node:path'
import { loadConfigFromFile, normalizePath } from 'vite'
import fs from 'fs-extra'
import fg from 'fast-glob'
import { DEFAULT_EXCLUDE, DEFAULT_THEME_PATH } from './constants'
import { normalizeRoutePath } from './route'

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

export interface SiteConfig {
  pages: { path: string; filePath: string }[]
  root: string
  command: 'serve' | 'build'

  themeDir?: string
}

export const defineConfig = (config: UserConfig) => config

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

  return result
}

export const resolveConfig = async (
  root: string = process.cwd(),
  command: 'serve' | 'build' = 'build',
  mode: 'development' | 'production',
  customizeConfig?: string,
) => {
  const userConfig = (await resolveUserConfig(
    root,
    command,
    mode,
    customizeConfig,
  )) as UserConfig
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

  console.log(config)

  return config
}
