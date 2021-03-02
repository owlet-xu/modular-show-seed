import { Component, Vue } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { DeviceType } from '@/common/enums/device-type';

/**
 * 监听窗口的宽度，做小屏幕自适应
 */
@Component
export default class ResizeMixin extends Vue {
  private WIDTH_MOBILE = 900;
  private WIDTH_PAD = 1200;
  private WIDTH_DESKTOP_1080 = 1080;

  created() {
    this.resizeHandler();
  }

  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  private getDeviceType() {
    const htmlDom = document.getElementsByTagName('html')[0];
    const rect = document.body.getBoundingClientRect();
    if (rect.width - 1 < this.WIDTH_MOBILE) {
      htmlDom.style.fontSize = '12px';
      htmlDom.className = 'mobile-themes';
      return DeviceType.mobile;
    }
    if (rect.width - 1 < this.WIDTH_PAD) {
      htmlDom.style.fontSize = '14px';
      htmlDom.className = '';
      return DeviceType.pad;
    }
    if (rect.width - 1 < this.WIDTH_DESKTOP_1080) {
      htmlDom.style.fontSize = '16px';
      htmlDom.className = '';
      return DeviceType.desktop1080;
    }
    htmlDom.className = '';
    htmlDom.style.fontSize = '16px';
    return DeviceType.desktop1080;
  }

  private resizeHandler() {
    if (!document.hidden) {
      AppModule.setDeviceType(this.getDeviceType());
    }
  }
}
