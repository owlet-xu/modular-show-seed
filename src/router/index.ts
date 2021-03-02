import Vue from 'vue';
import Router from 'vue-router';
// router
import { constantRouterMap } from './modules';

Vue.use(Router);
export default new Router({
  routes: constantRouterMap
});


