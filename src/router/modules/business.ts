import { Path, RouterName } from '../router-type';

export const businessRouterMap = [
  {
    path: Path.Messages,
    name: RouterName.Messages,
    component: () => import('@/components/messages/messages.vue')
  },
  {
    path: Path.NoData,
    name: RouterName.NoData,
    component: () => import('@/components/no-data/no-data.vue')
  }
];
