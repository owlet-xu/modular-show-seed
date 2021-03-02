<template>
  <div class="login-info">
    <img class="user-img" src="../../../assets/imgs/user.png" />
    <div class="user-info">
      <div class="phone">6003</div>
      <div class="name">Membro sentado</div>
    </div>
    <el-popover v-model="showPopover" placement="bottom" trigger="click">
      <div>
        <el-radio-group v-model="skinRadio" :size="size" @change="skinChange">
          <el-radio-button label="white">白天模式</el-radio-button>
          <el-radio-button label="black">夜色模式</el-radio-button>
        </el-radio-group>
      </div>
      <div class="menu" slot="reference">
        <i class="iconfont icon-menu" />
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { DeviceType } from '@/common/enums/device-type';
// service
import AppBiz from '@/business/app-biz';

@Component
export default class LoginInfo extends Vue {
  private showPopover = false;
  private skinRadio = AppModule.themeType;

  get deviceType() {
    return AppModule.deviceType;
  }

  get size() {
    if (this.deviceType === DeviceType.mobile) {
      return 'mini';
    }
    return 'medium';
  }

  @Watch('deviceType')
  deviceTypeChange(val: string) {
    this.showPopover = false;
  }

  skinChange(val: string) {
    AppBiz.changeTheams(val);
  }
}

</script>
<style lang="scss" scoped>
.login-info {
  display: flex;
  align-items: center;
  .user-img {
    width: 46px;
    height: 46px;
    border-radius: 100%;
  }
  .user-info {
    margin-left: 11px;
    .phone {
      color: #ffffff;
      font-size: 16px;
      font-weight: 600;
    }
    .name {
      color: #ffffff;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .menu {
    margin-left: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;
    height: 46px;
    border-radius: 3px;
    cursor: pointer;
    @include setColorByKeys('background-color', 'head-btn-bg');
    i {
      font-size: 18px;
      color: #f1fffe;
    }
  }
}
</style>