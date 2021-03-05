import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
import i18n from '@/lang';
import config from './utils/appconfig';
import { initLog, initTheme, initElement } from '@/common/init/app-init';

config().then(() => {
  initTheme();
  initLog();
  initElement();
  new Vue({
    router,
    store,
    i18n,
    render: (h: any) => h(App)
  }).$mount('#app');
});
