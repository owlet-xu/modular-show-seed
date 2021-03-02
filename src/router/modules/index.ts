import { Path, RouterName } from '../router-type';
// routes
import { businessRouterMap } from './business';

export const constantRouterMap = [
  {
    path: Path.Layout,
    name: RouterName.Layout,
    component: () => import('@/views/layout/layout.vue'),
    redirect: Path.Login,
    children: businessRouterMap
  },
  {
    path: Path.Login,
    name: RouterName.Login,
    component: () => import('@/views/login/login.vue')
  },
  {
    path: Path.Error,
    name: RouterName.Error,
    component: () => import('@/views/error/404.vue'),
    hidden: true
  }
];
