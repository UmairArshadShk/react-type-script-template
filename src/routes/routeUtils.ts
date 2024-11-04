// routeUtils.ts
import { AppRoutes } from './routes';
import { RouteConfig } from '../modules/interfaces/route-config';

const _getRoutePathById = (
  routeCfg: RouteConfig,
  acc: string,
  id: string
): string | null => {
  const rawCurrentPath = !routeCfg.path
    ? acc
    : routeCfg.path[0] === '/' || acc[acc.length - 1] === '/'
      ? `${acc}${routeCfg.path}`
      : `${acc}/${routeCfg.path}`;
  const currentPath = rawCurrentPath.replace('//', '/');

  if (routeCfg.key && routeCfg.key === id) {
    return currentPath;
  }
  if (routeCfg.children) {
    for (const routeChild of routeCfg.children) {
      const path = _getRoutePathById(routeChild, currentPath, id);
      if (path) {
        return path;
      }
    }
  }
  return null;
};

export const getRoutePathById = (() => {
  const memo: Record<string, string> = {};

  return (id: string): string => {
    const cachedRoute = memo[id];
    if (cachedRoute) {
      return cachedRoute;
    }

    for (const routeCfg of AppRoutes) {
      const path = _getRoutePathById(routeCfg, '', id);
      if (path) {
        memo[id] = path; // Cache the found path
        return path;
      }
    }
    throw new Error('Path cannot be found');
  };
})();