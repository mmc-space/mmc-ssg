import fs from 'fs-extra'
import type { Plugin } from 'vite'

export const pluginSvg = (
  options: {
    defaultExport?: 'url' | 'component'
  } = {},
): Plugin => {
  const { defaultExport = 'component' } = options

  return {
    name: 'vite-plugin-svg',
    async transform(code, id) {
      if (!id.endsWith('.svg')) return code

      const { transform: svgrTransform } = await import('@svgr/core')
      const { transform: esbuildTransform } = await import('esbuild')
      const svg = await fs.promises.readFile(id, 'utf8')
      const svgrResult = await svgrTransform(
        svg,
        {},
        { componentName: 'ReactComponent' },
      )
      let componentCode = svgrResult
      if (defaultExport === 'url') {
        componentCode = svgrResult.replace(
          'export default ReactComponent',
          'export { ReactComponent }',
        )
        componentCode += code
      }
      const result = await esbuildTransform(componentCode, {
        loader: 'jsx',
      })
      return result.code
    },
  }
}
