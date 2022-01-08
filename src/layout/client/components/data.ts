interface BarMenuItem {
  route: string;
  icon: string;
  text: string;
}
export const menuBarItem: BarMenuItem[]= [
  {
    route: '/',
    icon: 'HomeFilled',
    text: 'homepage',
  },
  {
    route: '/archive',
    icon: 'FolderOpened',
    text: 'archive',
  },
  {
    route: '/categories',
    icon: 'Menu',
    text: 'categories',
  },
  {
    route: '/tags',
    icon: 'Management',
    text: 'tags',
  },
  {
    route: '/links',
    icon: 'Connection',
    text: 'links',
  },
  {
    route: '/about',
    icon: 'Promotion',
    text: 'about',
  },
];
