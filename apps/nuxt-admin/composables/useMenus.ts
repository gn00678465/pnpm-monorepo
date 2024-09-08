import { transVueRoutesToMenu } from '@pnpm-monorepo/naive-ui-extension'
import type { MenuOption } from 'naive-ui';
import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { iconMap } from '../assets/iconMap';
import { NuxtLink } from '#components';

export const useMenus = (routes: MaybeRefOrGetter<RouteRecordRaw[]>) => {

  const treeMenus = computed(() => {
    return transVueRoutesToMenu<RouteRecordRaw, MenuOption>(toValue(routes), {
      transform: addPartialProps,
      sortRoutes: sortRoutes
    }) as MenuOption[];
  });

  /**
 * 將 vue-route 的設定轉為 NaiveUI 的 menu 格式
 * @param route
 * @returns
 */
  function addPartialProps(route: RouteRecordRaw): MenuOption {
    const { meta, children } = route;

    const item: MenuOption = {
      label: () => h(NuxtLink, { to: route }, () => meta?.['title'] || String(route.path).replace('/', '')),
      key: String(route.name)
    };

    /** render Icon */
    renderIcon(meta, item);

    if (children && children.length) {
      Object.assign(item, { children: children.map(addPartialProps) });
    }

    return item;
  }

  /** 確認 menu 有設定 icon */
  function hasIcon(meta: RouteMeta | undefined): meta is RouteMeta & { icon: string } {
    return !!(meta && 'icon' in meta && !!meta?.icon)
  }

  /**
   * 取得 meta 內設定的 icon 處理後匯入 item menu 內
   * @param meta
   * @returns
   */
  function renderIcon(meta: RouteMeta | undefined, item: MenuOption) {
    if (hasIcon(meta) && String(meta.icon) && meta.icon in iconMap) {
      Object.assign(item, {
        icon: () => h(iconMap[meta.icon])
      });
    }
  }

  // function getIconSize(meta: RouteMeta | undefined): number | undefined {
  //   const iconSize = meta?.['iconSize'];
  //   if (isNumber(iconSize)) return Number(iconSize);
  //   return undefined;
  // }


  /**
 * 依據 meta 內設定的 sort: number 做排序
 * @param route
 * @returns
 */
  function sortRoutes(routes: RouteRecordRaw[]) {
    return routes.sort((a, b) => {
      if (getSort(a) < getSort(b)) return -1;
      if (getSort(a) > getSort(b)) return 1;
      return 0;
    });
  }

  /**
 * 取得 meta 內設定的 sort: number 未設定回傳 1
 * @param route
 * @returns
 */
  function getSort(route: RouteRecordRaw): number {
    if (typeof route.meta?.['sort'] === 'string')
      return parseInt(route.meta?.['sort']);
    if (typeof route.meta?.['sort'] === 'number') return route.meta?.['sort'];
    return 1;
  }

  return treeMenus
}