/// <reference types='vite/client' />

declare module 'virtual:routes' {
  import type { Route } from 'react-router-dom'

  export const routes: Route[]
}
