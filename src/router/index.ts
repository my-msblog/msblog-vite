import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ElMessage } from 'element-plus';
import store from '@/store';
import { useI18n } from '@/hooks/useI18n';
import { routeList, NotFoundView, whiteList } from './routes';
import { authentication } from '@/api/sys';
import { buildRouters, weChartTitle } from './permission';
import { ref } from 'vue';

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

const routes: Array<RouteRecordRaw> = [...routeList, NotFoundView];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});
const refresh = ref<boolean>(true);
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  weChartTitle(to, globaleTitle, adminTitle);
  const token = sessionStorage.getItem('token');
  if (token) {
    await authentication();
    if (refresh.value && store.getters.getPermissionMenu.length === 0) {
      const asyncRouter = await store.dispatch('fetchMenu');
      buildRouters(router, asyncRouter);
        refresh.value = false;
        next({ path: `${to.path}` , replace: true });
    } else {
      router.addRoute(NotFoundView);
      next();
    }
    
  } else {
    if (whiteList.indexOf(to.name as string) !== -1) {
      next();
    }else{
      ElMessage({
        showClose: true,
        message: t('message.must_login'),
        type: 'error',
        duration: 2 * 1000,
      });
      next(`/login?redirect=${to.path}`);
    }
  }  
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done();
});

router.onError((handler) => {
  console.log('router-error:', handler);
});


export default router;
