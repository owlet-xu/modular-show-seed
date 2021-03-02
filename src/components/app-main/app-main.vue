<template>
  <section class="app-main">
    <transition :enter-active-class="animateIn">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script lang="ts" src="./app-main.ts"></script>
<style lang="scss" scoped src="./app-main.scss"></style>