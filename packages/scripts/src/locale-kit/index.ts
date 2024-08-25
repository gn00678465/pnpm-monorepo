import { createRequire } from 'node:module'
import { type Auth, google } from 'googleapis'
import type {
  GoogleSheetLanguagesModel as GoogleSheetLanguagesModelClass,
  LanguagesModel,
} from 'google-sheet-languages-model'
import type {
  LocaleKitOptions,
  LocaleKitPullOptions,
  LocaleKitPushOptions,
} from './types'

const required = createRequire(import.meta.url)
const { GoogleSheetLanguagesModel } = required('google-sheet-languages-model')

export class LocaleKit {
  private auth: Auth.GoogleAuth
  private languages: string[]
  private googleSheetLanguagesModel: GoogleSheetLanguagesModelClass

  constructor(SHEET_ID: string, { credentials, languages }: LocaleKitOptions) {
    this.languages = languages
    this.auth = new google.auth.GoogleAuth({
      credentials,
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    })
    const GoogleSheetLanguagesModel = this.getGoogleSheetLanguagesModel()

    this.googleSheetLanguagesModel = new GoogleSheetLanguagesModel({
      sheetId: SHEET_ID,
      auth: this.auth,
    })
  }

  // eslint-disable-next-line ts/explicit-function-return-type
  getGoogleSheetLanguagesModel() {
    const require = createRequire(import.meta.url)
    const {
      GoogleSheetLanguagesModel,
    } = require('google-sheet-languages-model')

    return GoogleSheetLanguagesModel
  }

  private languagesModel(folderPath: string): LanguagesModel {
    return GoogleSheetLanguagesModel.loadFromFolder(folderPath, this.languages)
  }

  async pull({
    folderPath,
    sheetName,
    type = 'nest',
  }: LocaleKitPullOptions): Promise<void> {
    const languagesModel
      = await this.googleSheetLanguagesModel.loadFromGoogleSheet(
        sheetName,
        this.languages,
      )

    languagesModel.saveToFolder(folderPath, type)
  }

  async push({ sheetName, folderPath }: LocaleKitPushOptions): Promise<void> {
    await this.googleSheetLanguagesModel.saveToGoogleSheet(
      sheetName,
      this.languagesModel(folderPath),
    )
  }
}
