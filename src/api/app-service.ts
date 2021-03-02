import * as httpClient from '@/utils/http-client';
// models
import { MenuInfo } from '@/models/menu-info';

export default {
  /**
   * 查找配置文件
   */
  async getConfigs(): Promise<any> {
    const url = './config.json';
    return httpClient.getPromise(url);
  },
  /**
   * 获取菜单数据
   */
  async getMenus(): Promise<MenuInfo[]> {
    const url = './data/menus.json';
    return httpClient.getPromise(url);
  }
};
