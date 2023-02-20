import { resolve } from 'node:path'
import { cac } from 'cac'
import type { UserConfig } from 'vite'
import { version } from '../../package.json'
import { createDevServer } from './dev'
import { build } from './build/build'

export interface CLIDevOptions extends UserConfig {
  force?: boolean
  config?: string
}

export interface CLIBuildOption extends UserConfig {
  config?: string
  force?: boolean
  sourcemap?: boolean | 'inline' | 'hidden'
}

const cli = cac('mmc').version(version).help()

cli.option(
  '--config [config]',
  '[string]explicitly specify a config file to use with the --config CLI option',
)

/** dev */
cli
  .command('[root]', 'start dev server') // default command
  .alias('dev')
  .action(async (root: string, options: CLIDevOptions) => {
    try {
      const server = await createDevServer(root, options)
      await server.listen()
      server.printUrls()
    }
    catch (e) {
      console.log(e)
      process.exit(1)
    }
  })

/** build */
cli
  .command('build [root]', 'build for production') // default command
  .option(
    '--force [force]',
    '[boolean] force the optimizer to ignore the cache and re-bundle',
  )
  .option(
    '--sourcemap',
    '[boolean] output source maps for build (default: false)',
  )
  .action(async (root: string, buildOptions: CLIBuildOption) => {
    try {
      root = resolve(root)
      console.log('buildOptions', root, buildOptions)
      await build(root)
    }
    catch (e) {
      console.log(e)
    }
  })

/** start */
// todo

cli.parse()
