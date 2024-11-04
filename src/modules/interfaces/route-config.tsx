import { ReactNode } from 'react';

export interface RouteConfig {
  path?: string;
  key?: string;
  element?: ReactNode;
  errorElement?: ReactNode;
  children?: RouteConfig[];
}