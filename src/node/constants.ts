import { join } from 'node:path'
import { fileURLToPath } from 'url'

export const ROOT_PATH = join(fileURLToPath(import.meta.url), '../../..')

export const APP_PATH = join(ROOT_PATH, 'src', 'client', 'app')

export const SERVER_ENTRY_PATH = join(APP_PATH, 'ssr.tsx')

export const CLIENT_ENTRY_PATH = join(APP_PATH, 'client.tsx')
