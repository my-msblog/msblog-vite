import Home from '@/views/client/home/index.vue';
import ClientLayout from '@/layout/client/index.vue';
import Page404 from '@/views/page/404/index.vue';
import { RouteRecordRaw } from 'vue-router';

export const routeList: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: ClientLayout,
    redirect: '/home',
    meta: {
      title: '主页'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
      },
      {
        path: '/tags',
        name: 'Tags',
        component: () => import('@/views/client/tage/index.vue'),
        meta: {
          title: '标签'
        }
      },
      {
        path: '/tags/:id',
        name: 'TagsList',
        component: () => import('@/views/client/tage/list/index.vue'),
        meta: {
          title: '标签'
        }
      },
      {
        path: '/links',
        name: 'Links',
        component: () => import('@/views/client/links/index.vue'),
        meta: {
          title: '链接'
        }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/client/about/index.vue'),
        meta: {
          title: '关于我'
        }
      },
      {
        path: '/categories',
        name: 'Categories',
        component: () => import('@/views/client/categories/index.vue'),
        meta: {
          title: '分类'
        }
      },
      {
        path: '/categories/:id',
        name: 'CategoryList',
        component: () => import('@/views/client/categories/list/index.vue'),
        meta: {
          title: '分类'
        }
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/client/login/index.vue'),
        meta: {
          title: '登录'
        }
      },
      {
        path: '/userInfo',
        name: 'UserInfo',
        component: () => import('@/views/client/info/index.vue'),
        meta: {
          title: '个人信息'
        }
      },
      {
        path: '/archive',
        name: 'Archive',
        component: () => import('@/views/client/archive/index.vue'),
        meta: {
          title: '归档'
        }
      },
      {
        path: '/article/:id',
        name: 'Article',
        component: () => import('@/views/client/article/index.vue'),
        meta: {
          title: '文章'
        }
      },
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/layout/admin/index.vue'),
    redirect: '/admin/dashboard',
    meta: {
      title: 'dashboard',
      tag: 'dashboard',
    },
    children: [
      {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/admin/dashboard/index.vue'),
      }
    ]
  },
];

export const NotFoundView =  {
  path: '/:pathMatch(.*)*',
  name: '404',
  component: Page404,
  meta: {
    title: '404'
  }
};

export const  whiteList: string[] = [
  'Home', 'home', 'Article', 'Archive', 'UserInfo', 'Login', 
  'CategoryList', 'Categories', 'About', 'Links', 
  'TagsList', 'Tags', '404',
];