import { useLocation } from 'react-router-dom'
import { routes } from 'virtual:routes'
import Theme from '../theme'

const App = () => {
  const { pathname } = useLocation()
  console.log('routes', routes, pathname)

  return <Theme.Layout />
}

export default App
