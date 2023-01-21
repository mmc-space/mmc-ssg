import type { FC } from 'react'
import classNames from 'classnames'

import { Search } from '../Search'
import { ThemeSwitch } from '../ThemeSwitch'

import styles from './index.module.less'

export interface HeaderProps {
  title?: string
}

export const Header: FC<HeaderProps> = (props) => {
  const { title } = props

  return (
    <header className="fixed top-0 left-0 w-full">
      <div className="px-8">
        <div
          className={classNames(
            'flex',
            'mx-auto',
            'items-center',
            styles['mmc-header'],
          )}
        >
          <a href="/" className="text-base font-semibold">
            {title}
          </a>
          <div className="search">
            <Search />
          </div>
          <div className="theme">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  )
}
