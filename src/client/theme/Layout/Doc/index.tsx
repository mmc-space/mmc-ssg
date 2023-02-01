import type { FC } from 'react'
import { usePageData } from '@client'

import { SiderBar } from './components/Siderbar'

export const DocLayout: FC = () => {
  const { data } = usePageData()

  return (
    <div className='flex'>
      <SiderBar />
      <main className='flex-1'>
        {data?.element}
      </main>
    </div>
  )
}
