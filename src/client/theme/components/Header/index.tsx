import type { FC } from 'react'
import classNames from 'classnames'
import styles from './index.module.less'

export interface HeaderProps {
  title?: string
}

export const Header: FC<HeaderProps> = (props) => {
  const { title } = props

  return (
    <header className="fixed top-0 left-0 w-full">
      <div className={classNames('mx-auto', 'px-8', styles['mmc-header'])}>
        {title}
      </div>
    </header>
  )
}
