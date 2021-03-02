import { Vue, Component, Prop } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';

@Component
export default class SearchForm extends Vue {

  @Prop({default: false})
  searching!: boolean;

  get deviceType() {
    return AppModule.deviceType;
  }

  get searchingClass() {
    if (this.searching) {
      return 'btn-sms  animated infinite pulse delay-2s';
    } else {
      return 'btn-sms';
    }
  }

  search() {
    this.$emit('search');
  }
  refresh() {
    this.$emit('refresh');
  }
}
