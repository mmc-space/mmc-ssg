import { createContext, useContext, useState } from 'react'
import { matchRoutes } from 'react-router-dom'
import { routes } from 'virtual:routes'
import { siteData } from 'virtual:siteData'
import type { PageData } from '../../shared/types'

export const PageDataContext = createContext<{
  data: null | PageData
  setData: (data: PageData) => void
}>({
      data: null,
      setData: () => {},
    })

export const usePageData = () => useContext(PageDataContext)

export const getPageData = async (routePath: string): Promise<PageData> => {
  const matched = matchRoutes(routes, routePath)

  if (matched) {
    const [{ route }] = matched
    // const mod = await ()
    return {
      ...route,
      siteData,
      frontmatter: route.element,
      pageType: route.path === '/' ? 'home' : 'doc',
    }
  }

  return {
    siteData,
    pageType: '404',
  }
}

export const useFrontmatter = () => {
  const { data } = usePageData()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [frontmatter, _setFrontmatter] = useState(data?.frontmatter)

  return frontmatter
}

