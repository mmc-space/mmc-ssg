import { usePageData } from '@client'
import type { DefaultTheme } from '@shared/types'

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
