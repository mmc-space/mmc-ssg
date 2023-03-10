import type { FC } from 'react'
import classNames from 'classnames'
import { useFrontmatter } from '@client'

import type { Feature, Hero } from '@shared/types'
import { Button } from '../../components/Button'

import styles from './index.module.less'

const DEFAULT_HERO: Hero = {
  name: 'MMCð',
  text: 'mmc ssg',
  tagline: 'mmc ssg',
  actions: [
    {
      text: 'å¿«éå¥é¨',
      theme: 'brand',
      link: '/guide/getting-started',
    },
    {
      text: 'GitHubå°å',
      theme: 'alt',
      link: 'https://github.com/mmc-space/ssg',
    },
  ],
  image: undefined,
}

const DEFAULT_FEATURES: Feature[] = [
  {
    title: 'Vite: æéçå¼åååºéåº¦',
    details: 'åºäº Vite æå»ºï¼å¼åæ¶çååºéåº¦æå¿«ï¼å³æ¶çç­æ´æ°ï¼å¸¦ç»ä½ æè´çå¼åä½éªã',
    icon: 'ð',
  },
  {
    title: 'MDX: Markdown & React ç»ä»¶æ¥ååå®¹',
    details: 'MDX æ¯ä¸ç§å¼ºå¤§çæ¹å¼æ¥ååå®¹ãä½ å¯ä»¥å¨ Markdown ä¸­ä½¿ç¨ React ç»ä»¶ã',
    icon: 'ð¦',
  },
  {
    icon: 'ð ï¸',
    title: 'åè½ä¸°å¯: ä¸ç«å¼è§£å³æ¹æ¡',
    details: 'å¯¹å¨ææç´¢ãå½éåç­å¸¸è§åè½å¯ä»¥åå°å¼ç®±å³ç¨ã',
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
            åºäº Vite & MDX è¯­æ³çéæç«ç¹çæå¨
          </p>
          <p
            className={classNames('pt-3 font-medium text-2xl', styles.tagline)}
          >
            ç®åãå¼ºå¤§ãé«æãæ»¡è¶³æ¨ä¸ç´æ³è¦çç°ä»£SSGæ¡æ¶
          </p>
          <div
            className={classNames('pt-8 flex justify-center', styles.actions)}
          >
            {hero.actions.map((action, index) => (
              <div className="p-1" key={index}>
                <Button type="link" href={action.link} theme={action.theme}>{action.text}</Button>
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
