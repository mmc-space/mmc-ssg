import type { FC } from 'react'
import { usePageData } from '../../../'

export const DocLayout: FC = () => {
  const pageData = usePageData()
  console.log('p', pageData)

  return (
    <div>
      DocLayout
    </div>
  )
}
