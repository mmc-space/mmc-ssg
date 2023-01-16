import { resolve } from 'node:path'
import fs from 'fs-extra'
import type { RouteOptions } from 'types/config'
import type { RouteObject } from 'react-router-dom'

const getDeepFiles = (root: string, prefix?: string) => {
  const routes: string[] = []
  const rootPath = prefix ? resolve(root, prefix) : root
  if (!fs.existsSync(rootPath)) return routes

  const files = fs.readdirSync(rootPath)

  for (const file of files) {
    const filePath = resolve(rootPath, file)
    const fileStat = fs.statSync(filePath)
    if (fileStat.isDirectory()) {
      routes.push(...getDeepFiles(rootPath, file))
    }
    else {
      const [fileName] = file.split('.')
      routes.push(prefix ? `${prefix}/${fileName}` : fileName)
    }
  }

  return routes
}

export const getFiles = (options?: RouteOptions) => {
  const { root = process.cwd(), include = [], exclude = [] } = options ?? {}

  return getDeepFiles(root).reduce<RouteObject[]>((routes, path) => {
    if (include.length && !include.includes(path)) return routes
    if (exclude.length && exclude.includes(path)) return routes

    const route: RouteObject = {
      path,
      // to do replace react components
      element: path,
    }

    routes.push(route)
    return routes
  }, [])
}
