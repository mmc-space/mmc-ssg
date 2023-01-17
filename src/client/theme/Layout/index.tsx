import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from 'virtual:routes'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import styles from './index.module.less'

const Layout = () => {
  const [count, setCount] = useState(0)
  const routesElement = useRoutes(routes)

  return (
    <div className={styles.layout}>
      <Header title='mmc' />
      <h1>count: {count}</h1>
      <div>
        <button onClick={() => setCount(count => count + 1)}>
          add Count
        </button>
      </div>
      <main>
        {routesElement}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
