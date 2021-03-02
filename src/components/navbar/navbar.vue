<template>
  <div class="navbar">
    <div :class="['logo-bg', deviceType === 'mobile' ? 'logo-bg-small': '']">
      <logo class="logo"></logo>
    </div>
    <div class="empty"></div>
    <login-info class="login-info"></login-info>
    <login-out class="login-out"></login-out>
  </div>
</template>

<script lang="ts" src="./navbar.ts"></script>
<style lang="scss" scoped src="./navbar.scss"></style>