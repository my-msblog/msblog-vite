import Home from '@/views/client/home/index.vue';
import ClientLayout from '@/layout/client/index.vue';
import Page404 from '@/views/page/404/index.vue';
import { RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: ClientLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
      },
      {
        path: 'tags',
        name: 'Tags',
        component: () => import('@/views/client/tage/index.vue'),
      },
      {
        path: 'tags/:id',
        name: 'TagsList',
        component: () => import('@/views/client/tage/list/index.vue'),
      },
      {
        path: '/links',
        name: 'Links',
        component: () => import('@/views/client/links/index.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/client/about/index.vue'),
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('@/views/client/categories/index.vue'),
      },
      {
        path: 'categories/:id',
        name: 'CategoryList',
        component: () => import('@/views/client/categories/list/index.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/client/login/index.vue'),
      },
      {
        path: 'userInfo',
        name: 'UserInfo',
        component: () => import('@/views/client/info/index.vue'),
      },
      {
        path: 'archive',
        name: 'Archive',
        component: () => import('@/views/client/archive/index.vue'),
      },
      {
        path: 'article/:id',
        name: 'Article',
        component: () => import('@/views/client/article/index.vue'),
      },
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/layout/admin/index.vue'),
    redirect: '/admin/dashboard',
    meta: {
      requireAuth: true,
      title: 'dashboard',
      tag: 'dashboard',
    },
    children: [
      {
        path: 'dashboard',
        name: '/dashboard',
        component: () => import('@/views/admin/dashboard/index.vue'),
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: Page404,
  }
];
