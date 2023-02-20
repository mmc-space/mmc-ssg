import classNames from 'classnames'
import { usePageData } from '@client'
import type { FC } from 'react'

import styles from './index.module.less'

export const Footer: FC = () => {
  const { data } = usePageData()
  const { message, copyright } = data?.siteData?.themeConfig?.footer || {}

  return (
    <footer className={classNames('p-8 font-medium text-sm', styles.footer)}>
      <div className="mx-auto text-center">
        {message && (<div>{message}</div>)}
        {copyright && (<div>{copyright}</div>)}
      </div>
    </footer>
  )
}
