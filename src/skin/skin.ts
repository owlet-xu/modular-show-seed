import { AppModule } from '@/store/modules/app';

export const Skin = {
  // 切换主题
  changeTheme(themeValue: string) {
    // 1 elementui 主题
    const itemPath = './themes/' + themeValue.toLowerCase() + '/themes.css';
    this.loadCss(itemPath);
    // 2 自定义主题
    window.document.documentElement.setAttribute('data-theme', themeValue);
    // 3 当前主题保存
    AppModule.setThemeType(themeValue);
  },
  loadCss(path: string) {
    const head = document.getElementsByTagName('head')[0];
    const old: any = head.getElementsByClassName('skinCss');
    const link = document.createElement('link');
    link.setAttribute('class', 'skinCss');
    link.href = path;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    if (old.length) {
      head.removeChild(old[0]);
    }
    head.appendChild(link);
  }
};

