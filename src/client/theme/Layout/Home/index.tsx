import type { FC } from 'react'
import { usePageData } from '@client'

export const HomeLayout: FC = () => {
  const { data } = usePageData()

  return (
    <div>
      HomeLayout
      {data?.element}
    </div>
  )
}
