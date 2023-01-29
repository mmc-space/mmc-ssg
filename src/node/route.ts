import { resolve } from 'node:path'
import fs from 'fs-extra'
import type { RouteOptions } from '.'

interface RouteMeta {
  routePath: string
  filePath: string
}

const getDeepFiles = (root: string, prefix?: string) => {
  const routes: RouteMeta[] = []
  const ignore = ['node_modules']
  const rootPath = prefix ? resolve(root, prefix) : root
  if (!fs.existsSync(rootPath)) return routes

  const files = fs.readdirSync(rootPath)

  for (const file of files) {
    // eslint-disable-next-line prefer-const
    let [fileName, ext] = file.split('.')

    const filePath = resolve(rootPath, file)
    const fileStat = fs.statSync(filePath)
    if (fileStat.isDirectory() && !ignore.includes(fileName)) {
      routes.push(...getDeepFiles(rootPath, file))
    }
    else if (['md', 'mdx', 'tsx'].includes(ext)) {
      // todo: check empty dir
      fileName = fileName === 'index' ? '' : `/${fileName}`

      routes.push({
        routePath: prefix ? `/${prefix}${fileName}` : fileName || '/',
        filePath: resolve(rootPath, filePath),
      })
    }
  }

  return routes
}

export const generateRoutesCode = (
  options: RouteOptions & { ssr?: boolean },
) => {
  const { root = process.cwd(), include = [], exclude = [] } = options ?? {}

  const namePrefix = 'Page'
  const routes = getDeepFiles(root).reduce<Array<RouteMeta>>(
    (routes, route) => {
      if (include.length && !include.includes(route.routePath)) return routes
      if (exclude.length && exclude.includes(route.routePath)) return routes

      // todo: replace react components
      routes.push(route)
      return routes
    },
    [],
  )

  return `
    import React from 'react'

    ${
      routes.map((route, index) => `const ${namePrefix}${index} = React.lazy(() => import('${route.filePath}'))`)
      .join('\n')
    }

    export const routes = [
      ${routes.map((route, index) => `{
        path: '${route.routePath}',
        element: React.createElement(${`${namePrefix}${index}`}),
      }`).join(',\n')}
    ]`
}
