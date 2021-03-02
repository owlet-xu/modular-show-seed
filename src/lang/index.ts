// tslint:disable
import Vue from 'vue';
import VueI18n,  { LocaleMessages } from 'vue-i18n';
import * as httpClient from '@/utils/http-client';
import ElementLocale from 'element-ui/lib/locale';
import { merge } from 'lodash';
import { AppModule } from '@/store/modules/app';

import zh from './zh-CN.json';
import es from './es-DO.json';
import dependenciesZhCN from './dependencies/dependencies-zh-CN.json';
import dependenciesEsDO from './dependencies/dependencies-es-DO.json';
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'; // element-ui lang
import elementEsLocale from 'element-ui/lib/locale/lang/es'; // element-ui lang


Vue.use(VueI18n);

const messages: LocaleMessages = {
  'zh': merge(zh, elementZhLocale, dependenciesZhCN),
  'es': merge(es, elementEsLocale, dependenciesEsDO)
};

const i18n = new VueI18n({
  locale: AppModule.configs.lang || 'es',
  messages
});
// 解决Element-ui组件内的词条
ElementLocale.i18n((key: string, value: any) => i18n.t(key, value));

// httpClient.i18n((key: any) => {
//   return i18n.t(key).toString();
// });

export default i18n;
