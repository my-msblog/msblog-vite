interface BarMenuItem {
  route: string;
  icon: string;
  text: string;
}
export const menuBarItem: BarMenuItem[]= [
  {
    route: '/',
    icon: 'el-icon-s-home',
    text: 'homepage',
  },
  {
    route: '/archive',
    icon: 'el-icon-folder-opened',
    text: 'archive',
  },
  {
    route: '/categories',
    icon: 'el-icon-menu',
    text: 'categories',
  },
  {
    route: '/tags',
    icon: 'el-icon-s-management',
    text: 'tags',
  },
  {
    route: '/links',
    icon: 'el-icon-connection',
    text: 'links',
  },
  {
    route: '/about',
    icon: 'el-icon-s-promotion',
    text: 'about',
  },
];
