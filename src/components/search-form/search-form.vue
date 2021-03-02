<template>
  <div class="search-form">
    <div class="left-inputs">
      <slot name="inputs"></slot>
    </div>
    <div class="right-buttons">
      <el-button v-if="deviceType !== 'mobile'" :class="searchingClass" @click="search"><i class="iconfont icon-search"></i>Consultar</el-button>
      <el-button class="btn-group" @click="refresh"><i class="iconfont icon-reset"></i><span>Redefinir</span></el-button>
    </div>
  </div>
</template>

<script lang="ts" src="./search-form.ts"></script>
<style lang="scss" scoped src="./search-form.scss"></style>