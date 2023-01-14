import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { DEFAULT_CONFIG_FILES } from './constants'

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
