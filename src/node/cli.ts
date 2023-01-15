import { resolve } from 'node:path'
import { cac } from 'cac'
import { version } from '../../package.json'
import { createDevServer } from './dev'

const cli = cac('mmc').version(version).help()

cli.option(
  '--config [config]',
  '[string]explicitly specify a config file to use with the --config CLI option',
)

cli
  .command('[root]', 'start dev server') // default command
  .alias('dev')
  .option('--host <host>', '[string] specify hostname')
  .option('-p, --port <port>', '[number] specify port')
  .option('--cacheDir [cacheDir]', '[string] set the directory of cache')
  .option(
    '--force [force]',
    '[boolean] force the optimizer to ignore the cache and re-bundle',
  )
  .option('-m, --mode <mode>', '[string] set env mode')
  .option('-l, --logLevel <level>', '[string] info | warn | error | silent')
  .option('--clearScreen', '[boolean] allow/disable clear screen when logging')
  .option('--https', '[boolean] use TLS + HTTP/2')
  .option('--cors', '[boolean] enable CORS')
  .option('--strictPort', '[boolean] exit if specified port is already in use')
  .option('--open [path]', '[boolean | string] open browser on startup')
  .action(async (root: string) => {
    try {
      root = resolve(root)
      console.log('root', root)
      const createServer = async () => {
        const server = await createDevServer(root)
        await server.listen()
        server.printUrls()
      }
      await createServer()
    }
    catch (e) {
      console.log(e)
      process.exit(1)
    }
  })

cli.parse()
