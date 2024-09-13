import { toValue } from 'vue'
import type { MenuOption } from 'naive-ui'
import type { MaybeRefOrGetter } from 'vue'

/**
 * Get selected menu key path
 *
 * @param selectedKey
 * @param menus
 */
export function getSelectedMenuKeyPath(selectedKey: MaybeRefOrGetter<string>, menus: MaybeRefOrGetter<MenuOption[]>): string[] {
  const keyPath: string[] = []

  toValue(menus).some((menu) => {
    const path = findMenuPath(toValue(selectedKey), menu)

    const find = Boolean(path?.length)

    if (find) {
      keyPath.push(...path || [])
    }

    return find
  })

  return keyPath
}

/**
 * Find menu path
 *
 * @param targetKey Target menu key
 * @param menu Menu
 */
function findMenuPath(targetKey: string, menu: MenuOption): string[] | null {
  const path: string[] = []

  function dfs(item: MenuOption): boolean {
    if (item.key) {
      path.push(String(item.key))
    }

    if (item.key === targetKey) {
      return true
    }

    if (item.children) {
      for (const child of item.children) {
        if (dfs(child)) {
          return true
        }
      }
    }

    path.pop()

    return false
  }

  if (dfs(menu)) {
    return path
  }

  return null
}
