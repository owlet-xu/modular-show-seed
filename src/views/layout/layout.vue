<template>
  <div class="layout">
    <navbar class="head"></navbar>
    <div class="main-container">
      <sidebar :class="['left-menus', deviceType === 'mobile' ? 'left-menus-small': '']"></sidebar>
      <app-main class="right-content"></app-main>
    </div>
  </div>
</template>

<script lang="ts" src="./layout.ts"></script>
<style lang="scss" scoped src="./layout.scss"></style>
