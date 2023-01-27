import { createContext, useContext } from 'react'
import { matchRoutes } from 'react-router-dom'
import { routes } from 'virtual:routes'

export type PageType = 'doc' | '404' | 'home' | 'custom'

export interface PageData {
  pageType: PageType
}

export interface IPageDataContext {
  data: null | PageData
  setData: (data: PageData) => void
}

export const PageDataContext = createContext<IPageDataContext>({
  data: null,
  setData: () => {},
})

export const usePageData = () => useContext(PageDataContext)

export const getPageData = async (routePath: string): Promise<PageData> => {
  const matched = matchRoutes(routes, routePath)

  if (matched) {
    const [{ route }] = matched

    console.log(route, 'route')

    return {
      pageType: 'doc',
    }
  }

  return {
    pageType: '404',
  }
}
