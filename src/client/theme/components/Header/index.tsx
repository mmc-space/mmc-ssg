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
              {['指南', '教程', 'API'].map(content => (
                <a className="flex items-center p-3 text-sm font-medium" key={content}>
                  {content}
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
