import { defineConfig } from '@mmc-cloud/ssg'

export default defineConfig({
  route: {
    exclude: ['foo'],
  },
  title: '🐛 ssg!',
})
