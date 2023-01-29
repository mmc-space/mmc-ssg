import type { FC } from 'react'
import { usePageData } from '@client'

export const DocLayout: FC = () => {
  const { data } = usePageData()

  return (
    <div>
      DocLayout
      {data?.element}
    </div>
  )
}
