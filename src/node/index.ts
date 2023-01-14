import { loadConfigFromFile } from './config'
import { createDevServer } from './dev'

const bootstrap = async () => {
  const root = process.cwd()
  const server = await createDevServer(root)
  await server.listen()
  server.printUrls()

  // todo confit entry
  const configPath = await loadConfigFromFile()
  console.log(configPath);
}

bootstrap()
