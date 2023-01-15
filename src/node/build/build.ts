import { join } from 'node:path'
import type { OutputChunk } from 'rollup'
import { resolveConfig } from '../config'
import { bundle } from './bundle'
import { renderPage } from './render'

export const build = async (root: string = process.cwd()) => {
  const siteConfig = await resolveConfig(root, 'build')
  const { clientResult } = await bundle(root)

  const entryPath = join(root, 'temp', 'ssr.mjs')
  const { render } = await import(entryPath)

  const pages = ['404.md', ...siteConfig.pages]

  try {
    const appChunk
      = clientResult
      && (clientResult.output.find(
        chunk =>
          chunk.type === 'chunk'
          && chunk.isEntry
          && chunk.facadeModuleId?.endsWith('.js'),
      ) as OutputChunk)

    await Promise.all(
      pages.map(page =>
        renderPage(root, render, page, clientResult, appChunk),
      ),
    )
  }
  catch (error) {
    console.log(error)
  }
}

build()
