import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

export const renderInBrowser = () => {
  const root = document.getElementById('root')

  if (!root)
    throw new Error('#root element not found')

  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

renderInBrowser()
