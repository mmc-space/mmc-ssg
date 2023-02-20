import { defineConfig } from '@mmc-cloud/ssg'

export default defineConfig({
  route: {
    exclude: ['foo'],
  },
  title: '🐛 @mmc-cloud/ssg',
  themeConfig: {
    nav: [
      {
        text: '指南',
        link: '/guide/getting-started',
      },
    ],
    sidebar: {
      '/guide': [
        {
          text: '介绍',
          items: [
            {
              text: '快速开始',
              link: '/guide/getting-started',
            },
          ],
        },
      ],
    },
    logo: 'https://avatars.githubusercontent.com/u/72542677?v=4',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present MMC',
    },
  },
})
