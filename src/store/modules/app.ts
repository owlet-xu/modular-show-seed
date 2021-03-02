import store from '@/store';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import { SessionStorageKeys, MySessionStorage } from '@/utils/strorage/session-storage';
// models
import { MenuInfo } from '@/models/menu-info';
import { DeviceType } from '@/common/enums/device-type';
import { ThemeType } from '@/common/enums/theme-type';
// services
import AppService from '@/api/app-service';

export interface IAppState {
  configs: object;
  menus: MenuInfo[];
  deviceType: string;
  themeType: string;
  animateTitle: string[];
  animateIn: string;
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public configs: any = MySessionStorage.getObject(SessionStorageKeys.configs) || {};
  public menus: MenuInfo[] = MySessionStorage.getObject(SessionStorageKeys.menus) || [];
  public deviceType = MySessionStorage.getItem(SessionStorageKeys.deviceType) || DeviceType.desktop1080;
  public themeType: string = MySessionStorage.getItem(SessionStorageKeys.themeType) || ThemeType.white.toString();
  public animateTitle: string[] = ['title', 'animated', 'flip'];
  public animateIn = 'animated fadeInLeft';

  @Mutation
  private SET_CONFIGS(data: any) {
    this.configs = data;
    MySessionStorage.setObject(SessionStorageKeys.configs, data);
  }

  @Action
  public async setConfigs() {
    const data = await AppService.getConfigs();
    this.SET_CONFIGS(data);
  }

  @Mutation
  private SET_MENUS(data: MenuInfo[]) {
    this.menus = data;
    MySessionStorage.setObject(SessionStorageKeys.menus, data);
  }

  @Action
  public async setMenus() {
    const data = await AppService.getMenus();
    this.SET_MENUS(data);
  }

  @Mutation
  private SET_DEVICE_TYPE(deviceType: string) {
    this.deviceType = deviceType;
  }

  @Action
  public async setDeviceType(deviceType: string) {
    this.SET_DEVICE_TYPE(deviceType);
    MySessionStorage.setItem(SessionStorageKeys.deviceType, deviceType);
  }

  @Mutation
  private SET_THEME_TYPE(themeType: string) {
    this.themeType = themeType;
  }

  @Action
  public async setThemeType(themeType: string) {
    this.SET_THEME_TYPE(themeType);
    MySessionStorage.setItem(SessionStorageKeys.themeType, themeType);
  }

  @Mutation
  private SET_ANIMATE_TITLE() {
    const class1 = this.animateTitle[1];
    const class2 = this.animateTitle[2];
    if (class1 && class2) {
      this.animateTitle.splice(1, 2);
    } else {
      this.animateTitle = this.animateTitle.concat(['animated', 'flip']);
    }
  }

  @Action
  public setAnimateTitle() {
    this.SET_ANIMATE_TITLE();
  }

  @Mutation
  private SET_ANIMATE_IN() {
    const classStr = [
      'animated fadeInLeft',
      'animated fadeInRight',
      'animated fadeInDown',
      'animated fadeInUp',
      'animated rotateInDownLeft'
    ];
    let index = classStr.indexOf(this.animateIn);
    index = index === classStr.length - 1 ? 0 : index + 1;
    this.animateIn = classStr[index];
  }

  @Action
  public setAnimateIn() {
    this.SET_ANIMATE_IN();
  }
}

export const AppModule = getModule(App);
