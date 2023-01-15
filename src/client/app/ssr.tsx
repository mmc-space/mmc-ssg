import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

// entry for ssr
export const render = (path: string) => {
  console.log('path', path)

  return renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>,
  )
}
