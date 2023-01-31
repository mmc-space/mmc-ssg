import { defineConfig } from '@mmc-cloud/ssg'

export default defineConfig({
  route: {
    exclude: ['foo'],
  },
  title: '🐛 ssg!',
  themeConfig: {
    logo: 'https://avatars.githubusercontent.com/u/72542677?v=4',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present MMC',
    },
  },
})
