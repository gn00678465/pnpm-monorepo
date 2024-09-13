import { CubeLoading } from './CubeLoading'

export const webComponents = {
  'cube-loading': CubeLoading,
}

export function register(keys?: (keyof typeof webComponents)[]) {
  Object.entries(webComponents).forEach(([key, component]) => {
    if (!keys || (Array.isArray(keys) && !keys.length)) {
      customElements.define(key, component)
    }
    if (
      keys
      && Array.isArray(keys)
      && keys.length
      && keys.includes(key as keyof typeof webComponents)
    ) {
      customElements.define(key, component)
    }
  })
}
