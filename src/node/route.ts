import type { SiteConfig } from '.'

export const addLeadingSlash = (str: string) => {
  return str.startsWith('/') ? str : `/${str}`
}

export const normalizeRoutePath = (routePath: string) => {
  routePath = routePath.replace(/\.(.*)?$/, '').replace(/index$/, '')
  return addLeadingSlash(routePath)
}

export const generateRoutesCode = (
  options: SiteConfig,
) => {
  const { pages = [] } = options

  const namePrefix = 'Page'

  return `
    import React from 'react'

    ${
      pages.map((route, index) => `const ${namePrefix}${index} = React.lazy(() => import('${route.filePath}'))`)
      .join('\n')
    }

    export const routes = [
      ${pages.map((route, index) => `{
        path: '${route.path}',
        element: React.createElement(${`${namePrefix}${index}`}),
      }`).join(',\n')}
    ]`
}
