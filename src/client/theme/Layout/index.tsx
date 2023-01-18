import { useRoutes } from 'react-router-dom'
import { routes } from 'virtual:routes'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import styles from './index.module.less'

const Layout = () => {
  const routesElement = useRoutes(routes)

  return (
    <>
      <Header title='mmc' />
      <main className={styles['mmc-content']}>
        {routesElement}
      </main>
      <Footer />
    </>
  )
}

export default Layout
