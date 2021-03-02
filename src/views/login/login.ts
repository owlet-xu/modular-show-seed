import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
// route
import { RouterName } from '@/router/router-type';
@Component
export default class Login extends Vue {
  loading = false;
  loginForm = {
    email: 'admin@xgy.com',
    password: '123456'
  };

  public handleLogin() {
    const lForm: any = this.$refs.loginForm;
    lForm.validate((valid: boolean) => {
      if (valid) {
        this.loading = true;
        AppModule.setMenus();
        this.$router.push({ name: RouterName.Messages });
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
}
