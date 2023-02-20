import type { FC } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { routes } from 'virtual:routes'
import { Layout } from '../../theme'
import { getPageData, usePageData } from './hooks'

const App: FC = () => {
  const { pathname } = useLocation()
  const { setData } = usePageData()
  console.log('routes', routes, pathname)

  useEffect(() => {
    const refetchData = async () => {
      try {
        const pageData = await getPageData(pathname)
        // setData(pageData)
        console.log('pageData', pageData, setData)
      }
      catch (e) {
        console.log(e)
      }
    }
    refetchData()
  }, [pathname])

  return <Layout />
}

export default App
