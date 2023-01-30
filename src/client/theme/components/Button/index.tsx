import { createElement } from 'react'
import classNames from 'classnames'

import type { AnchorHTMLAttributes, FC, PropsWithChildren } from 'react'

import styles from './index.module.less'

type ButtonProps = {
  type?: 'button' | 'link'
  size?: 'medium' | 'big'
  theme?: 'brand' | 'alt'
  href?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { theme = 'brand', size = 'big', href = '/', type = 'link', children } = props

  return createElement(
    type === 'button' ? 'button' : 'a',
    {
      className: classNames(styles.button, styles[theme], styles[size]),
      href,
    },
    children,
  )
}
