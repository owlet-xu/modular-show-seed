<template>
  <div class="logo">
    <img src="../../../assets/imgs/logo.png" />
    <span :class="animateTitle">SISTEMA CENTRAL DE CONTACTO</span>
    <span class="border-1"></span>
    <span class="border-2"></span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';

@Component
export default class Logo extends Vue {
  private animateDelay: any;
  private titleClass = ['title', 'animated', 'flip'];

  get deviceType() {
    return AppModule.deviceType;
  }

  get animateTitle() {
    return AppModule.animateTitle;
  }

  created() {
    this.animateDelay = setInterval(() => {
      AppModule.setAnimateTitle();
    }, 5000);
  }

  beforeDestroy() {
    if (this.animateDelay) {
      clearInterval(this.animateDelay);
    }
  }
}

</script>
<style lang="scss" scoped>
.logo {
  position: relative;
  height: 100%;
  overflow: hidden;
  @include setColorByKeys('background-color', 'head-line');
  img {
    width: 54px;
    height: 53px;
    position: absolute;
    top: 7px;
    left: 21px;
  }
  .title {
    margin-left: 13px;
    position: absolute;
    top: 16px;
    left: 71px;
    color: #fefefe;
    font-size: 30px;
    font-weight: bold;
    font-family: Segoe UI Bold， Segoe UI Bold-Bold;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.35);
  }
  .border-1 {
    position: absolute;
    top: 16px;
    left: 670px;
    width: 200px;
    @include setColorByKeysWithArgs('border-top', '5px solid', 'main-color');
    transform: rotate(-40deg);
  }
  .border-2 {
    position: absolute;
    top: 16px;
    left: 750px;
    width: 200px;
    @include setColorByKeysWithArgs('border-top', '100px solid', 'main-color');
    transform: rotate(-40deg);
  }
}
</style>