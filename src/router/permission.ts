import { RouteLocationNormalized, Router } from 'vue-router';
import { MenuVO } from '@/api/model/sys-model';
import { MenuOptions } from '@/constant/StoreOption';
import store from '@/store';
import { ElMessage } from 'element-plus';

const modules = import.meta.glob('../views/**/**.vue');

export function buildRouters(router: Router, res: Array<MenuVO>) {
  if (router.hasRoute('404')) {
    router.removeRoute('404');
  }
  const fmtRouter = formatRoutes(res);
  fmtRouter.forEach(item => {
    router.addRoute('Admin', item);
  });

  store.commit('setPermissionMenu', fmtRouter);
}

export function formatRoutes(menuRouter: Array<MenuVO>): Array<MenuOptions> {
  const resRouters: Array<MenuOptions> = [];
  if(menuRouter === undefined || menuRouter === null){
    return [];
  }
  menuRouter.forEach(route => {
    const fmtRoute = {
      path: route.path,
      component: // route.component === 'layout' ? AdminLayout :
         modules[`../views/admin${route.component}/index.vue`],
      children: formatRoutes(route.children),
      meta: {
        nameZh: route.nameZh,
        icon: route.icon,
        title: route.nameZh,
        tag: route.component === 'layout' ? 'dashboard' : route.nameZh,
      }
    };
    resRouters.push(fmtRoute);
  });
  return resRouters;
}

export function weChartTitle(to: RouteLocationNormalized, defTitle: string, adminTitle: string) {
  if (to.path.includes('admin')) {
    document.title = adminTitle;
  } else {
    if (to.meta.title === undefined) {
      if (!to.path.includes('home')) {
        ElMessage.error({
          type: 'error',
          message: 'error: this page didn`t set title'
        });
        document.title = defTitle;
      }
      return;
    }
    document.title = to.meta.title as string;
  }
}
