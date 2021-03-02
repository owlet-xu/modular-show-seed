import { Skin } from '@/skin/skin';
import { ThemeType } from '@/common/enums/theme-type';

export default {
  changeTheams(skinType: string) {
    Skin.changeTheme(skinType);
  },
  changeDeviceType(deviceType: string) {}
};
