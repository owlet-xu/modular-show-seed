import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';

import Logo from './items/logo.vue';
import LoginInfo from './items/login-info.vue';
import LoginOut from './items/login-out.vue';

@Component({
  components: {
    Logo,
    LoginInfo,
    LoginOut
  }
})
export default class Navbar extends Vue {
  get deviceType() {
    return AppModule.deviceType;
  }
}
