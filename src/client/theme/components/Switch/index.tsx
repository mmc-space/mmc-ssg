import classNames from 'classnames'
import type { FC, PropsWithChildren } from 'react'

import styles from './index.module.less'

interface SwitchProps {
  className?: string
  onClick?: () => void
}

export const Switch: FC<PropsWithChildren<SwitchProps>> = (props) => {
  const { onClick, children, className } = props

  return (
    <button
      type="button"
      role="switch"
      onClick={onClick}
      className={classNames(className, styles.switch)}
    >
      <span className={styles.check}>
        <span className={styles.icon}>{children}</span>
      </span>
    </button>
  )
}
