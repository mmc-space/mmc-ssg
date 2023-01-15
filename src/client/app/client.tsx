import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// entry for client
export const render = () => {
  const root = document.getElementById('root')

  if (!root)
    throw new Error('#root element not found')

  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

render()
