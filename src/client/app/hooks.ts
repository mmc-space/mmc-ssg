import { createContext, useContext, useEffect, useState } from 'react'
import type { RouteObject } from 'react-router-dom'
import { matchRoutes } from 'react-router-dom'
import { routes } from 'virtual:routes'

export type PageType = 'doc' | '404' | 'home'

export interface Feature {
  icon: string
  title: string
  details: string
}

export interface Hero {
  name: string
  text: string
  tagline: string
  image?: {
    src: string
    alt: string
  }
  actions: {
    text: string
    link: string
    theme: 'brand' | 'alt'
  }[]
}

export interface FrontMatterMeta {
  title: string
  description: string
  api: boolean
  pageType: PageType
  features?: Feature[]
  hero?: Hero
  sidebar?: boolean
  outline?: boolean
  lineNumbers?: boolean
}

export type PageData = {
  pageType: PageType
  frontmatter?: FrontMatterMeta
} & RouteObject

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

    return {
      ...route,
      pageType: route.path === '/' ? 'home' : 'doc',
    }
  }

  return {
    pageType: '404',
  }
}

export const useFrontmatter = () => {
  const { data } = usePageData()
  const [frontmatter, setFrontmatter] = useState(data?.frontmatter)

  useEffect(() => {
    if (import.meta.env.DEV) {
      import.meta.hot?.on('md(x)-changed', ({ filePath, routePath }) => {
        import(/* @vite-ignore */ `${filePath}?import&t=${Date.now()}`).then(
          (mod) => {
            data?.path === routePath && setFrontmatter(mod.frontmatter)
          },
        )
      })
    }
  }, [data?.path])

  return frontmatter
}
