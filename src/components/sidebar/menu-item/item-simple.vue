<template>
  <div class="item-simple">
    bbb
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
// models
import { MenuInfo } from '@/models/menu-info';
/**
 * 简单菜单
 */
@Component
export default class ItemSimple extends Vue {
  get menus(): MenuInfo[] {
    return AppModule.menus;
  }

  get deviceType() {
    return AppModule.deviceType;
  }

  menuClick(menu: MenuInfo) {
    this.$router.push({ name: menu.RouterName }).catch((error: any) => error);
  }
}
</script>
<style lang="scss" scoped>
.item-simple {

}
</style>