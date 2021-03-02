<template>
  <div class="login-out" @click="loginOut">
    <i class="iconfont icon-power-off" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// route
import { RouterName } from '@/router/router-type';

@Component
export default class LoginOut extends Vue {
  loginOut() {
    this.$router.push({
      path: RouterName.Login
    });
  }
}

</script>
<style lang="scss" scoped>
.login-out {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: (0.8);
  cursor: pointer;
  @include setColorByKeys('background-color', 'head-btn-bg');
  i {
    font-size: 25px;
    color: #ffffff;
  }
}
</style>