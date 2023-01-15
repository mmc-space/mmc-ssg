import { routes } from 'virtual:routes'
import Layout from '../theme/Layout'

const App = () => {
  console.log('routes', routes)
  return <Layout />
}

export default App
