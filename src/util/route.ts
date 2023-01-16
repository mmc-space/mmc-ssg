import { existsSync, readdirSync } from 'fs-extra'
import type { RouteOptions } from 'types/config'

// to do
export const getFiles = (options?: RouteOptions) => {
  const { root = process.cwd(), include = [], exclude = [] } = options ?? {}

  if (!existsSync(root)) return []

  readdirSync(root).filter((file) => {
    console.log('file', file)

    if (include.length && include.includes(file)) return true
    if (exclude.length && exclude.includes(file)) return false

    return true
  })
}
