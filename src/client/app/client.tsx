import type { FC } from 'react'
import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PageDataContext, getPageData } from './hooks'
import App from './App'

// entry for client
export const render = async () => {
  const initialPageData = await getPageData(window.location.pathname)

  const root = document.getElementById('root')

  if (!root) throw new Error('#root element not found')

  const Root: FC = () => {
    const [data, setData] = useState(initialPageData)

    return (
      <PageDataContext.Provider value={{ data, setData }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PageDataContext.Provider>
    )
  }

  createRoot(document.getElementById('root') as HTMLElement).render(
    <Root />,
  )
}

render()
