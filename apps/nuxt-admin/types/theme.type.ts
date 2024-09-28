import type { LayoutMode, LayoutScrollMode } from '@pnpm-monorepo/layouts';

type BreakpointsKey = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface AppConfig {
  themeScheme: 'light' | 'dark' | 'auto'
  theme: {
    primary: string
    info: string
    success: string
    warning: string
    error: string
  }
  breakpoints: Record<BreakpointsKey, number>
  layout: {
    mode: LayoutMode
    scrollMode: LayoutScrollMode
  }
  header: {
    height: number
    breadcrumb: {
      visible: boolean
      showIcon: boolean
    }
  }
  sidebar: {
    width: number
    collapsedWidth: number
  }
  footer: {
    visible: boolean
    fixed: boolean
    height: number
    right: boolean
  }
}