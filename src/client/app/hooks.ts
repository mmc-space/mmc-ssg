import { createContext, useContext, useState } from 'react'
import type { RouteObject } from 'react-router-dom'
import { matchRoutes } from 'react-router-dom'
import { routes } from 'virtual:routes'
import { siteData } from 'virtual:siteData'
import type { DefaultTheme } from '../../node'

export type PageType = 'doc' | '404' | 'home'

export interface Feature {
  icon?: string
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

export interface SiteData<ThemeConfig = unknown> {
  root: string
  base: string
  lang: string
  title: string
  description: string
  icon: string
  themeConfig: ThemeConfig
  appearance: boolean
}

export type PageData = {
  siteData?: SiteData<DefaultTheme.Config>
  title?: string
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
  const [frontmatter, setFrontmatter] = useState(data?.frontmatter)

  return frontmatter
}

interface SidebarData {
  group: string
  items: DefaultTheme.SidebarGroup[]
}

export const useSidebarData = (path: string): SidebarData => {
  const { data } = usePageData()
  const themeConfig = data?.siteData?.themeConfig ?? {}
  const sidebar = themeConfig.sidebar ?? {}

  for (const name of Object.keys(sidebar)) {
    const result = sidebar[name].find(group => group.items.some(item => item.link === path))

    if (result) {
      return {
        group: '',
        items: sidebar[name],
      }
    }
  }

  return {
    group: '',
    items: [],
  }
}
