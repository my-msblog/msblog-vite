import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ElMessage } from 'element-plus';
import store from '@/store';
import { useI18n } from '@/hooks/useI18n';
import { routeList } from './routes';
import { authentication } from '@/api/sys';
import { asyncRouters, weChartTitle } from './permission';


const { t } = useI18n();
const globaleTitle = import.meta.env.VITE_GLOB_APP_TITLE as string;
const adminTitle = import.meta.env.VITE_ADMIN_TITLE as string;
NProgress.configure({
  // 动画方式
  easing: 'ease',
  // 递增进度条的速度
  speed: 500,
  // 是否显示加载ico
  showSpinner: false,
  // 自动递增间隔
  trickleSpeed: 200,
  // 初始化时的最小百分比
  minimum: 0.3
});

const routes: Array<RouteRecordRaw> = routeList;

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH as string),
  routes
});

router.beforeEach( (to, from, next) => {
  NProgress.start();
  weChartTitle(to, globaleTitle, adminTitle);
  if (to.meta.requireAuth) {
    if (store.getters.getToken) {
      authentication().then( () => {
        if(store.getters.getPermissionMenu.length === 0) {
          asyncRouters(router);
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
      asyncRouters(router);
      next({ path: '/admin' });
      NProgress.done();
      return;
    }
    next();
  }
  NProgress.done();
});

router.afterEach(() => {
  // eslint-disable-next-line
  // @ts-ignore
  document.querySelector('body').setAttribute('style', 'overflow: auto !important;');
  NProgress.done();
  window.scrollTo(0, 0);
});

router.onError((handler) => {
  console.log('router-error:', handler);
});


export default router;
