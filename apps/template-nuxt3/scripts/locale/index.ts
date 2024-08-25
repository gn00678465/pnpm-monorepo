import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { LocaleKit } from '@pnpm-monorepo/scripts'
import * as dotenv from 'dotenv'
import credentials from '../../credentials.json'

dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url))

export const localKit = new LocaleKit(process.env.SHEET_ID as string, {
  credentials,
  languages: ['zhTW', 'enUS', 'jaJP'],
})

export const folderPath = resolve(__dirname, '../../locales')
