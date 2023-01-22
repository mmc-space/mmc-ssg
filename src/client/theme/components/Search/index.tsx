import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import SearchSvg from '../../assets/search.svg'

import styles from './index.module.less'

export const Search: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchHotKey = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      console.log('e', e)
      inputRef?.current?.focus()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleSearchHotKey)

    return () => {
      window.removeEventListener('keydown', handleSearchHotKey)
    }
  }, [])

  return (
    <div
      className={classNames(
        'transition',
        'flex',
        'items-center',
        'ml-8',
        styles['mmc-search'],
      )}
    >
      <SearchSvg />
      <input
        placeholder="Search"
        className="px-2 text-base"
        ref={inputRef}
        type="text"
      />
    </div>
  )
}
