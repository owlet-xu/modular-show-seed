/**
 * 配置文件初始化
 */
import { AppModule } from '@/store/modules/app';

const Config = async () => {
  AppModule.setConfigs();
};

export default Config;
