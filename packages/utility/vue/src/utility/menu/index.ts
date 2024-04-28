/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RouteRecordRaw } from 'vue-router';

type MenuRecordSingle = Record<string, any>;

type MenuRecordSingleWithChildren = MenuRecordSingle & {
  children: MenuRecordSingleWithChildren;
};

type MenuRecordRaw = MenuRecordSingle | MenuRecordSingleWithChildren;

export interface TransVueRoutesToNMenuOptions<T> {
  checkPagePermissions?: (route: RouteRecordRaw) => boolean;
  checkPageHideInMenu?: (route: RouteRecordRaw) => boolean;
  sortRoutes?: (arg: RouteRecordRaw[]) => RouteRecordRaw[];
  addPartialProps?: (route: RouteRecordRaw) => T;
}

export function transVueRoutesToMenu<MenuType extends MenuRecordRaw = any>(
  routes?: RouteRecordRaw[],
  options: TransVueRoutesToNMenuOptions<MenuType> = {}
) {
  const { sortRoutes = (arg) => arg } = options;

  if (!routes) return [];
  return sortRoutes(routes).flatMap((route) =>
    transVueRouteToMenu<MenuType>(route, options)
  );
}

function transVueRouteToMenu<MenuType extends MenuRecordRaw = any>(
  route: RouteRecordRaw,
  options: TransVueRoutesToNMenuOptions<MenuType> = {}
) {
  const {
    checkPageHideInMenu = () => false,
    checkPagePermissions = () => true,
    sortRoutes = (arg) => arg,
    addPartialProps = (arg) => arg
  } = options;

  const routes: (MenuType | RouteRecordRaw)[] = [];
  const { name, path, children, ...rest } = route;
  let _route = addPartialProps({
    name,
    path,
    ...rest
  } as RouteRecordRaw);

  /** 處理是否隱藏頁面 */
  if (checkPageHideInMenu(route)) return routes;

  /** 處理特定頁面權限 */
  if (!checkPagePermissions(route)) return routes;

  /** 處理 children */
  if (Array.isArray(children) && children.length) {
    const childRoutes = sortRoutes(children).flatMap((child) =>
      transVueRouteToMenu(child, options)
    );

    if (childRoutes.length === 1) {
      _route = childRoutes[0];
    } else {
      _route.children = childRoutes;
    }
  }

  routes.unshift(_route);
  return routes;
}
