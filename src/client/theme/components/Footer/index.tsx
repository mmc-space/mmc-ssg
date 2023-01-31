import classNames from 'classnames'
import type { FC } from 'react'

import styles from './index.module.less'

export const Footer: FC = () => {
  return (
    <footer className={classNames('p-8 font-medium text-sm', styles.footer)}>
      <div className="mx-auto text-center">
        <div className="">
          Released under the MIT License.
        </div>
        <div>
          Copyright © 2022-present MMC
        </div>
      </div>
    </footer>
  )
}
