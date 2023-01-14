import { join } from 'node:path'
import { fileURLToPath } from 'url'

export const PACKAGE_ROOT_PATH = join(
  fileURLToPath(import.meta.url),
  '../../..',
)

export const DEFAULT_CONFIG_FILES = ['mmc.config.ts', 'mmc.config.js']

export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT_PATH, 'template.html')
