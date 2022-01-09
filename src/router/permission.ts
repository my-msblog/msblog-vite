import { getMenu } from '@/api/sys';
import { RouteLocationNormalized, Router } from 'vue-router';
import { MenuVO } from '@/api/model/sys-model';
import { MenuOptions } from '@/constant/StoreOption';
import AdminLayout from '@/layout/admin/index.vue';
import store from '@/store';
import { ElMessage } from 'element-plus';

const modules = import.meta.glob('../views/**/**.vue');

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
      component: route.component === 'layout' ? AdminLayout
          : modules[`../views/admin${route.component}/index.vue`],
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

export function weChartTitle(to: RouteLocationNormalized, defTitle: string, adminTitle: string) {
  if(to.path.includes('admin')){
    document.title = adminTitle;
  } else {
    if(to.meta.title === undefined){
      if(!to.path.includes('home')){
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
