import type { FC } from 'react'
import classNames from 'classnames'

import type { DefaultTheme } from '@node'
import { Search } from '../Search'
import { ThemeSwitch } from '../ThemeSwitch'

import styles from './index.module.less'

export interface HeaderProps {
  title?: string
  nav?: DefaultTheme.NavItem[]
}

export const Header: FC<HeaderProps> = (props) => {
  const { title, nav = [] } = props

  return (
    <header className="z-2 fixed top-0 left-0 w-full">
      <div className={classNames('px-8', styles.fill)}>
        <div
          className={classNames(
            'flex',
            'mx-auto',
            'items-center',
            'justify-center',
            styles['mmc-header'],
          )}
        >
          <div className="title">
            <a href="/" className="text-base font-semibold">
              {title}
            </a>
          </div>
          <div className="flex-grow flex justify-end items-center">
            <div className="search">
              <Search />
            </div>
            <nav className="flex items-center">
              {nav.map(item => (
                <a className="flex items-center p-3 text-sm font-medium" key={item.text} href={item.link}>
                  {item.text}
                </a>
              ))}
            </nav>
            <div className="theme">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
