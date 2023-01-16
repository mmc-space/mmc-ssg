import { resolve } from 'node:path'
import fs from 'fs-extra'
import type { RouteOptions } from 'types/config'

const getDeepFiles = (root: string, prefix?: string) => {
  const routes: string[] = []
  const rootPath = prefix ? resolve(root, prefix) : root
  if (!fs.existsSync(rootPath)) return routes

  const files = fs.readdirSync(rootPath)

  for (const file of files) {
    const filePath = resolve(rootPath, file)
    const fileStat = fs.statSync(filePath)
    if (fileStat.isDirectory()) routes.push(...getDeepFiles(rootPath, file))
    else routes.push(prefix ? `${prefix}/${file}` : file)
  }

  return routes
}

export const getFiles = (options?: RouteOptions) => {
  const { root = process.cwd(), include = [], exclude = [] } = options ?? {}

  return getDeepFiles(root).filter((file) => {
    if (exclude.length && exclude.includes(file)) return false
    if (include.length) {
      if (include.includes(file)) return true
      else return false
    }
    return true
  })
}

const config: RouteOptions = {
  root: 'docs',
  exclude: ['约定式路由.md'],
}

console.log(getFiles(config))
