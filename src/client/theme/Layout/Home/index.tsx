import type { FC } from 'react'
import classNames from 'classnames'
import { useFrontmatter } from '@client'

import type { Feature, Hero } from '@client'
import { Button } from '../../components/Button'

import styles from './index.module.less'

const DEFAULT_HERO: Hero = {
  name: 'MMC🐛',
  text: 'mmc ssg',
  tagline: 'mmc ssg',
  actions: [
    {
      text: 'Get Started',
      theme: 'brand',
      link: '/',
    },
    {
      text: 'View on GitHub',
      theme: 'alt',
      link: '/',
    },
  ],
  image: undefined,
}

const DEFAULT_FEATURES: Feature[] = [
  {
    title: 'title',
    details: '2023年01月31日 星期二',
    icon: '🚀',
  },
  {
    title: 'title2',
    details: '2023年01月31日 星期二',
    icon: 'i',
  },
]

const getGridClass = (count?: number) => {
  if (!count) return ''
  else if (count === 2) return 'grid-2'
  else if (count === 3) return 'grid-3'
  else if (count % 3 === 0) return 'grid-4'
  else if (count % 2 === 0) return 'grid-6'
}

export const HomeLayout: FC = () => {
  const frontmatter = useFrontmatter()
  console.log(frontmatter, '=frontmatter')
  const hero = frontmatter?.hero || DEFAULT_HERO
  const features = frontmatter?.features ?? DEFAULT_FEATURES
  const gridClass = getGridClass(features.length)

  return (
    <div className="pb-16">
      <div
        className={classNames(
          'max-w-6xl mx-auto flex flex-col text-center p-8 pt-0',
          styles.container,
        )}
      >
        <div className={classNames('text-center order-2', styles.main)}>
          <h1 className="text-6xl font-bold">
            <span className={styles.clip}>mmc ssg</span>
          </h1>
          <p className="text-6xl font-bold">
            Vite & React Powered Static Site Generator
          </p>
          <p
            className={classNames('pt-3 font-medium text-2xl', styles.tagline)}
          >
            Simple, powerful, and performant. Meet the modern SSG framework
            you've always wanted.
          </p>
          <div
            className={classNames('pt-8 flex justify-center', styles.actions)}
          >
            {hero.actions.map((action, index) => (
              <div className="p-1" key={index}>
                <Button theme={action.theme}>{action.text}</Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex max-w-xs justify-center items-center m-auto order-1">
          <img src="https://avatars.githubusercontent.com/u/72542677?v=4" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between">
        {features.map(({ title, icon, details }) => (
          <div
            key={title}
            className={classNames('p-4', { [styles[gridClass!]]: gridClass })}
          >
            <article
              className={classNames(
                'p-6 border rounded-xl border-solid',
                styles.article,
              )}
            >
              {icon && (
                <div
                  className={classNames(
                    'h-12 w-12 mb-6 rounded-md text-3xl flex justify-center items-center',
                    styles.icon,
                  )}
                >
                  {icon}
                </div>
              )}
              <h2 className="font-bold">{title}</h2>
              <p
                className={classNames(
                  'pt-2 leading-6 font-medium text-sm',
                  styles.details,
                )}
              >
                {details}
              </p>
            </article>
          </div>
        ))}
      </div>
    </div>
  )
}
