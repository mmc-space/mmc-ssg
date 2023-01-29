import type { FC } from 'react'
import { Switch } from '../Switch'
import SunSvg from '../../assets/sun.svg'
import MoonSvg from '../../assets/moon.svg'

import styles from './index.module.less'

export const useTheme = () => {
  const classList = document.documentElement.classList
  let isDark = false

  const setClass = (dark?: boolean) =>
    classList[dark ? 'add' : 'remove']('dark')

  const toggle = () => setClass((isDark = !isDark))

  return toggle
}

export const ThemeSwitch: FC = () => {
  const toggle = useTheme()

  return (
    <Switch onClick={toggle}>
      <div className={styles.sun}>
        <SunSvg />
      </div>
      <div className={styles.moon}>
        <MoonSvg />
      </div>
    </Switch>
  )
}
