import { getMenu } from '@/api/sys';
import { Router } from 'vue-router';
import { MenuVO } from '@/api/model/sys-model';
import { MenuOptions } from '@/constant/StoreOption';
import AdminLayout from '@/layout/admin/index.vue';
import store from '@/store';

export async function asyncRouters (router: Router) {
  await getMenu().then(res => {
    const fmtRouter = formatRoutes(res);
    fmtRouter.forEach(item => {
      if (item.children.length !== 0) {
        router.addRoute(item);
      } else {
        router.addRoute('Admin', item);
      }
    });
    store.commit('setPermissionMenu', fmtRouter);
  });
}

function formatRoutes(menuRouter: Array<MenuVO>): Array<MenuOptions>{
  const resRouters: Array<MenuOptions> = [];
  menuRouter.forEach(route => {
    if (route.children){
      route.children = formatRoutes(route.children);
    }
    const fmtRoute = {
      path: route.path,
      component: route.component === 'layout' ? AdminLayout // : () => import('@/views/admin' + route.component),
        : () => require('@/views/admin' + route.component + '/index.vue'),
      nameZh: route.nameZh,
      icon: route.icon,
      children: route.children,
      meta: {
        requireAuth: true,
        title: route.nameZh,
        tag: route.component === 'layout' ? 'dashboard' : route.nameZh,
      }
    };
    resRouters.push(fmtRoute);
  });
  return resRouters;
}

