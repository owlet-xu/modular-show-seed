import { Vue, Component, Prop } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
// models
import { PageInfo } from '@/models/page-info';
import { DeviceType } from '@/common/enums/device-type';

@Component
export default class SearchForm extends Vue {
  @Prop() pageInfo!: PageInfo;

  get deviceType() {
    return AppModule.deviceType;
  }

  get pageLayout() {
    if (this.deviceType === DeviceType.mobile) {
      return 'prev, pager, next';
    } else {
      return 'total, prev, pager, next,jumper';
    }
  }

  handleCurrentChange(data: any) {
    this.$emit('current-change', data);
  }
}
