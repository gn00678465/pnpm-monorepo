interface OtherColor {
  info: string
  success: string
  warning: string
  error: string
}

export interface NaiveThemeColor extends OtherColor {
  primary: string
}

export type NaiveThemeColorKey = keyof NaiveThemeColor
export type NaiveThemeColorScene = 'hover' | 'suppl' | 'pressed'

export type NaiveColorKey = `${NaiveThemeColorKey}Color${'' | Capitalize<NaiveThemeColorScene>}`
