import type { LayoutMode, LayoutScrollMode } from '@pnpm-monorepo/layouts';

export interface ThemeLayout {
  mode: LayoutMode
  scrollMode: LayoutScrollMode
}

export interface ThemeHeader {
  height: number
  breadcrumb: {
    visible: boolean
    showIcon: boolean
  }
}

export interface ThemeSidebar {
  width: number
  collapsedWidth: number
}

export interface ThemeFooter {
  visible: boolean
  fixed: boolean
  height: number
  right: boolean
}