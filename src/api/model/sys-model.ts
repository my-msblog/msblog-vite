import { RouteMeta } from 'vue-router';

export interface PhoneDTO{
  phone: string;
}
export interface MenuVO{
  path: string;
  nameZh?: string;
  component: string;
  icon?: string;
  children: Array<MenuVO>;
  meta?: RouteMeta
}
