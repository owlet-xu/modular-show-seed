<template>
  <div class="sidebar">
    <el-menu :class="['menus-container',deviceType === 'mobile'?'menus-container-mobile': '']" default-active="5-1" :collapse="deviceType === 'mobile'">
      <label v-for="(item, index) in menus" :key="index">
        <!-- 无子菜单 -->
        <el-menu-item v-if="!item.subMenus" :index="item.id" @click="menuClick(item)">
          <i :aria-hidden="true" :class="['iconfont', item.icon]" />
          <span v-if="deviceType !== 'mobile'" class="menu-title" slot="title">{{ item.name }}</span>
        </el-menu-item>
        <!-- 有子菜单 -->
        <el-submenu class="submenu" v-else :index="item.id">
          <template slot="title">
            <i :aria-hidden="true" :class="['iconfont', item.icon]" />
            <span v-if="deviceType !== 'mobile'" class="menu-title" slot="title">{{ item.name }}</span>
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

<script lang="ts" src="./sidebar.ts"></script>
<style lang="scss" scoped src="./sidebar.scss"></style>