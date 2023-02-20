import type { FC } from 'react'
import classNames from 'classnames'
import { usePageData } from '@client'

import { SideBar } from './components/Sidebar'

import styles from './index.module.less'

export const DocLayout: FC = () => {
  const { data } = usePageData()

  return (
    <div className='flex relative'>
      <SideBar />
      <section className={classNames('flex flex-1 p-6 mmc-doc', styles.doclayout)}>
        <div className={classNames('mx-auto flex-1', styles.container)}>
          {data?.element}
        </div>
        <div className='pl-8 w-64'>
          {/* 目录 */}
        </div>
      </section>
    </div>
  )
}
