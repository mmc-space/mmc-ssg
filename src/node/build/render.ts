import { join } from 'node:path'
import fs from 'fs-extra'
import type { OutputChunk, RollupOutput } from 'rollup'

export const renderPage = async (
  root: string,
  render: (path: string) => Promise<string>,
  pagePath: string,
  clientChunk: RollupOutput | null,
  appChunk: OutputChunk | undefined,
) => {
  const routePath = `/${pagePath.replace(/\.md$/, '')}`
  const context = await render(routePath)

  const matchingChunk = clientChunk?.output.find(
    chunk => chunk.type === 'chunk' && chunk.isEntry,
  )

  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>title</title>
      <meta name="description" content="xxx">
    </head>
    <body>
      <div id="root">${context}</div>
      ${
        matchingChunk
          ? `<script type="module" src="/${matchingChunk.fileName}"></script>`
          : ''
      }
      ${
        appChunk
          ? `<script type="module" src="/${appChunk.fileName}"></script>`
          : ''
      }
    </body>
  </html>`.trim()
  await fs.ensureDir(join(root, 'dist'))
  await fs.writeFile(join(root, 'dist/index.html'), html)
}
