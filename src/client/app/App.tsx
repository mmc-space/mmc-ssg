import { useLocation } from 'react-router-dom'
import { routes } from 'virtual:routes'
import Layout from '../theme/Layout'

const App = () => {
  const { pathname } = useLocation()
  console.log('routes', routes, pathname)

  return <Layout />
}

export default App
