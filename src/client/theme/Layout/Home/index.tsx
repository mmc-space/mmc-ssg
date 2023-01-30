import type { FC } from 'react'
import classNames from 'classnames'
import { useFrontmatter, usePageData } from '@client'

import type { Hero } from '@client'
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

export const HomeLayout: FC = () => {
  const { data } = usePageData()
  const frontmatter = useFrontmatter()
  const hero = frontmatter?.hero || DEFAULT_HERO

  return (
    <div className="p-16 pt-20">
      <div className="max-w-6xl mx-auto flex">
        <div className="text-left max-w-xl">
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
          <div className="pt-8 flex">
            {hero.actions.map((action, index) => (
              <div className="p-1" key={index}>
                <Button theme={action.theme}>
                  {action.text}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center m-auto">
          <img src="https://avatars.githubusercontent.com/u/72542677?v=4" />
        </div>
      </div>
      <div className='max-w-6xl mx-auto flex flex-wrap justify-between'>
        HomeLayout
        {data?.element}
      </div>
    </div>
  )
}
