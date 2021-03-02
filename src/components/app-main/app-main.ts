import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';

@Component
export default class AppMain extends Vue {
  get animateIn() {
    return AppModule.animateIn;
  }
}
