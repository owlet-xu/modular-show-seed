<template>
  <div class="item-default">
    <el-menu class="menus-container" default-active="5-1" :collapse="deviceType === 'mobile'">
      <label v-for="(item, index) in menus" :key="index">
        <!-- 无子菜单 -->
        <el-menu-item v-if="!item.subMenus" :index="item.id" @click="menuClick(item)">
          <i :aria-hidden="true" :class="['iconfont', item.icon]" />
          <span class="menu-title" slot="title">{{ item.name }}</span>
        </el-menu-item>
        <!-- 有子菜单 -->
        <el-submenu class="submenu" v-else :index="item.id">
          <template slot="title">
            <i :aria-hidden="true" :class="['iconfont', item.icon]" />
            <span class="menu-title" slot="title">{{ item.name }}</span>
          </template>
          <label v-for="(subItem, index) in item.subMenus" :key="index">
            <el-menu-item :index="subItem.id" @click="menuClick(subItem)">
              <span class="submenu-title" slot="title">{{ subItem.name }}</span>
            </el-menu-item>
          </label>
        </el-submenu>
      </label>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
// models
import { MenuInfo } from '@/models/menu-info';
/**
 * 默认菜单
 */
@Component
export default class ItemDefault extends Vue {
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
.item-default {
  width: 100%;
  height: 100%;
  @include leftMenu();
  .menus-container {
    height: 100%;
    @include setColorByKeys('background-color', 'menus-bg');
    .submenu {
      .submenu-title {
        margin-left: 48px;
        @include leftMenuSub();
      }
    }
  }
}

.iconfont {
  @include leftMenu();
  font-size: 26px;
}
</style>