import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';
import { useI18n } from '@/hooks/useI18n';
import { routes as routeList } from './routes';
import { authentication } from '@/api/sys';
import { asyncRouters } from './permission';
import { ElMessage } from 'element-plus';

const { t } = useI18n();

const routes: Array<RouteRecordRaw> = routeList;

const router = createRouter({
  history: createWebHistory(process.env.VITE_PUBLIC_PATH),
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.getters.getToken) {
      await authentication().then(async () => {
        if(store.getters.getPermissionMenu.length === 0) {
          await asyncRouters(router);
          next({ ...to, replace: true });
        } else {
          next();
        }
      });
    }else {
      ElMessage({
        showClose: true,
        message: t('message.must_login'),
        type: 'error',
        duration: 2 * 1000,
      });
      next({ path: 'login', query: { redirect: to.fullPath } });
    }
  }else {
    // 解决刷新空白，跳转admin主页
    if (to.path.includes('/admin/')) {
      await asyncRouters(router);
      next({ path: 'admin' });
      return;
    }
    next();
  }
});

router.afterEach((to, from, next) => {
  // eslint-disable-next-line
  // @ts-ignore
  document.querySelector('body').setAttribute('style', 'overflow: auto !important;');
  window.scrollTo(0, 0);
});

router.onError((handler) => {
  console.log('router-error:', handler);
});


export default router;
