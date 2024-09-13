export default defineAppConfig({
  theme: {
    primary: '#1677ff',
    info: '#722ed1',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d'
  },
  layout: {
    mode: 'vertical',
    scrollMode: 'content'
  },
  header: {
    height: 56,
    breadcrumb: {
      visible: true,
      showIcon: true
    }
  },
  sidebar: {
    width: 220,
    collapsedWidth: 64,
  },
  footer: {
    visible: false,
    fixed: false,
    height: 48,
    right: true
  }
})