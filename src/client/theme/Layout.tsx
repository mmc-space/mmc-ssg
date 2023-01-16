import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from 'virtual:routes'

const Layout = () => {
  const [count, setCount] = useState(0)
  const routesElement = useRoutes(routes)

  return (
    <div>
      <h1>count: {count}</h1>
      <div>
        <button onClick={() => setCount(count => count + 1)}>
          add Count
        </button>
      </div>
      <main>
        {routesElement}
      </main>
    </div>
  )
}

export default Layout
