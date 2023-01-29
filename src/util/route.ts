import { resolve } from 'node:path'
import fs from 'fs-extra'
import type { RouteOptions } from 'types/config'
import type { RouteObject } from 'react-router-dom'

interface RouteMeta {
  routePath: string
  filePath: string
}

const getDeepFiles = (root: string, prefix?: string) => {
  const routes: RouteMeta[] = []
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
      // todo: check empty dir

      let [fileName] = file.split('.')
      fileName = fileName === 'index' ? '' : `/${fileName}`

      console.log(resolve(rootPath, filePath), 'ppp')

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
  const routes = getDeepFiles(root).reduce<Array<RouteMeta & RouteObject>>(
    (routes, path) => {
      if (include.length && !include.includes(path.routePath)) return routes
      if (exclude.length && exclude.includes(path.routePath)) return routes

      const route = {
        ...path,
        // todo: replace react components
        element: null,
      }

      routes.push(route)
      return routes
    },
    [],
  )

  return `
    import React from 'react'

    ${routes
      .map(
        (route, index) =>
          `const ${namePrefix}${index} = React.lazy(() => import('${route.filePath}'))`,
      )
      .join('\n')}

    export const routes = [
      ${routes
        .map(
          (route, index) => `{
        path: '${route.routePath}',
        element: React.createElement(${`${namePrefix}${index}`}),
      }`,
        )
        .join(',\n')}
    ]`
}
