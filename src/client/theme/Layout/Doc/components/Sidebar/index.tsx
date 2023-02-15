import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSidebarData } from '@client'

import type { DefaultTheme } from '@node'
import type { FC } from 'react'

import classNames from 'classnames'
import styles from './index.module.less'

export const SideBar: FC = () => {
  const { pathname } = useLocation()
  const { items } = useSidebarData(pathname)
  const [collapseList, setCollapseList] = useState(
    items.map(item => item.collapsed ?? false),
  )

  const renderGroupItem = (item: DefaultTheme.SidebarItem, depth = 0) => {
    const marginLeft = `${depth * 20}px`
    let children: React.ReactElement[] = []
    if ('items' in item)
      children = item.items.map(child => renderGroupItem(child, depth + 1))

    return (
      <div style={{ marginLeft }}>
        <div className="text-brand">
          <Link to={item.link!}>{item.text}</Link>
        </div>
        {children}
      </div>
    )
  }

  const renderGroup = (item: DefaultTheme.SidebarGroup, index: number) => {
    const collapsed = collapseList[index]
    const toggleCollapse = () => {
      const newCollapseList = [...collapseList]
      newCollapseList[index] = !newCollapseList[index]
      setCollapseList(newCollapseList)
    }
    const collapsableIcon = (item.collapsable || collapsed) && (
      <div
        className="i-carbon-chevron-right"
        onClick={toggleCollapse}
        cursor-pointer="~"
        style={{
          transition: 'transform 0.2s ease-out',
          transform: collapsed ? 'rotate(0deg)' : 'rotate(90deg)',
        }}
      ></div>
    )
    return (
      <section key={item.text} not-first="divider-top mt-4">
        <div className="items-center flex justify-between items-start">
          <h2 className="mt-3 mb-2 text-1 font-bold">{item.text}</h2>
          {collapsableIcon}
        </div>
        <div
          className="mb-1"
          style={{
            transition: 'height 0.2s ease-out',
            height: collapsed ? 0 : `${(item?.items.length || 0) * 28}px`,
            overflow: 'hidden',
          }}
        >
          {item?.items?.map(item => (
            <div key={item.link}>{renderGroupItem(item)}</div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <aside className={classNames('fixed top-0 left-0 bottom-0 px-8 z-1', styles.sidebar)}>
      <nav>{items.map((item, index) => renderGroup(item!, index))}</nav>
    </aside>
  )
}
