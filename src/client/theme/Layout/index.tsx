import { usePageData } from '@client'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { HomeLayout } from './Home'
import { DocLayout } from './Doc'
import { NotFound } from './NotFount'

import styles from './index.module.less'

export const Layout = () => {
  const { data } = usePageData()
  const { siteData } = data ?? {}
  const nav = Object.values(siteData?.themeConfig.nav || [])

  const { pageType = '404' } = data ?? {}

  const getContentLayout = () => {
    switch (pageType) {
      case 'home':
        return <HomeLayout />
      case 'doc':
        return <DocLayout />
      case '404':
        return <NotFound />
      // case 'custom':
      //   return <Content />
      default:
        return <DocLayout />
    }
  }

  return (
    <>
      <Header title={siteData?.title ?? 'mmc-ssg'} nav={nav} />
      <main className={styles['mmc-content']}>{getContentLayout()}</main>
      <Footer />
    </>
  )
}
