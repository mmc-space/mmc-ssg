import type { FC } from 'react'
import classNames from 'classnames'
import styles from './index.module.less'

export const NotFound: FC = () => {
  return (
    <div className="text-center p-24">
      <p className="text-6xl leading-normal font-semibold">404</p>
      <h1 className="text-lg font-bold ">PAGE NOT FOUND</h1>
      <div className={classNames('w-16 h-px mx-auto my-4', styles.divider)} />
      <blockquote
        className={classNames(
          'mx-auto max-w-xs text-sm font-medium',
          styles.quote,
        )}
      >
        But if you don't change your direction, and if you keep looking, you may
        end up where you are heading.
      </blockquote>

      <div className="pt-5">
        <a
          className={classNames(
            'font-medium rounded-2xl border border-solid px-4 py-1 text-sm cursor-pointer transition-all',
            styles.link,
          )}
          aria-label="go to home"
          href="/"
        >
          Take me home
        </a>
      </div>
    </div>
  )
}
