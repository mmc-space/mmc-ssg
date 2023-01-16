import { cac } from 'cac'
import type { UserConfig } from 'vite'
import { version } from '../../package.json'
import { createDevServer } from './dev'

export interface CLIOptions extends UserConfig {
  config?: string
}

const cli = cac('mmc').version(version).help()

cli.option(
  '--config [config]',
  '[string]explicitly specify a config file to use with the --config CLI option',
)

cli
  .command('[root]', 'start dev server') // default command
  .alias('dev')
  .action(async (root: string, options: CLIOptions) => {
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

cli.parse()
