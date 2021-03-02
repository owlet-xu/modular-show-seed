import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/fonts/iconfont';
import Vue from 'vue';
import ElementUI from 'element-ui';
import Animate from 'animate.css';
import { Skin } from '@/skin/skin';
// import { initLog as initLogs, gblog } from './logger';
import { AppModule } from '@/store/modules/app';

/**
 * 加载用户主题
 */
const initTheme = () => {
  Skin.changeTheme(AppModule.themeType);
};

/**
 * 初始化日志
 */
const initLog = () => {
  // initLogs();
  // gblog.info('violet-seed start to init');
};

const initElement = () => {
  Vue.use(ElementUI);
  Vue.use(Animate);
};

export { initTheme, initLog, initElement };
