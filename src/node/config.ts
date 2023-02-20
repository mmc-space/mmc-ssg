import path, { resolve } from 'node:path'
import { loadConfigFromFile, normalizePath } from 'vite'
import fs from 'fs-extra'
import fg from 'fast-glob'
import type { DefaultTheme, SiteConfig, UserConfig } from '../shared/types'
import { DEFAULT_EXCLUDE, DEFAULT_THEME_PATH } from './constants'
import { normalizeRoutePath } from './route'

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
