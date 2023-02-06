import { RouteMeta } from 'vue-router';

export interface TabOption {
  label: string;
  name: string;
  path: string;
}
export interface MenuOptions{
  path: string;
  component: any;
  children: Array<MenuOptions>
  meta?: RouteMeta;
}
