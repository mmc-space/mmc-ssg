import { useState } from 'react'

const Layout = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>count: {count}</h1>
      <div>
        <button onClick={() => setCount(count => count + 1)}>
          add Count
        </button>
      </div>
    </div>
  )
}

export default Layout
