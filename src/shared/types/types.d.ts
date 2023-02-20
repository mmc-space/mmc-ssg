/// <reference types='vite/client' />

declare module 'virtual:routes' {
  import type { Route } from 'react-router-dom'

  export const routes: Route[]
}

declare module 'virtual:siteData' {
  import type { SiteData, DefaultTheme } from '@shared'

  export const siteData: SiteData<DefaultTheme.Config>
}
