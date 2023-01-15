import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { DEFAULT_CONFIG_FILES } from './constants'

export interface SiteConfig {
  pages: string[]
  root: string
  command: 'serve' | 'build'
}

export interface UserConfig<ThemeConfig = unknown> {
  themeConfig?: ThemeConfig
}

export const defineConfig = (config: UserConfig) => config

export const loadConfigFromFile = async () => {
  let resolvedPath: string | undefined

  for (const filename of DEFAULT_CONFIG_FILES) {
    const filePath = resolve(process.cwd(), filename)
    if (!existsSync(filePath)) continue

    resolvedPath = filePath
    break
  }

  return resolvedPath
}

export const resolveConfig = async (
  root: string = process.cwd(),
  command: 'serve' | 'build' = 'build',
) => {
  const config: SiteConfig = {
    pages: ['404.md'],
    root,
    command,
  }

  return config
}
