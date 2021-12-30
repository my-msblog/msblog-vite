export interface TabOption {
  label: string;
  name: string;
  path: string;
}
export interface MenuOptions{
  path: string;
  nameZh: string;
  component: any;
  icon: string;
  children: Array<MenuOptions>;
}
