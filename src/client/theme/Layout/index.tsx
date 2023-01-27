import { Content, usePageData } from '../../app'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import styles from './index.module.less'
import { HomeLayout } from './Home'
import { DocLayout } from './Doc'
import { NotFound } from './NotFount'

export const Layout = () => {
  const { data } = usePageData()
  const { pageType } = data!

  const getContentLayout = () => {
    switch (pageType) {
      case 'home':
        return <HomeLayout />
      case 'doc':
        return <DocLayout />
      case '404':
        return <NotFound />
      case 'custom':
        return <Content />
      default:
        return <DocLayout />
    }
  }

  return (
    <>
      <Header title="mmc-ssg" />
      <main className={styles['mmc-content']}>{getContentLayout()}</main>
      <Footer />
    </>
  )
}
