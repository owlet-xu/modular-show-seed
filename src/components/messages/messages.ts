import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
// models
import { SmsInfo } from '@/models/sms-info';
import { PageInfo } from '@/models/page-info';
// services
import MessageService from '@/api/message-service';
import MessagesBiz from '@/business/messages-biz';
// componets
import SearchForm from '../search-form/search-form.vue';
import DataTable from '../data-table/data-table.vue';

@Component({
  components: {
    SearchForm,
    DataTable
  }
})
export default class Messages extends Vue {
  private smsAll: SmsInfo[] = [];
  private sms: SmsInfo[] = [];
  private loading = false;
  private pageInfo: PageInfo = new PageInfo();
  private searchText = '';
  private searchDate: any[] = [];

  created() {
    this.getSms();
  }

  get deviceType() {
    return AppModule.deviceType;
  }

  get searching() {
    if (this.searchText) {
      return true;
    }
    if (this.searchDate.length > 0) {
      return true;
    }
    return false;
  }

  getSms() {
    this.loading = true;
    MessageService.getSms()
      .then((res: SmsInfo[]) => {
        this.smsAll = res;
        this.getPageData();
      })
      .finally(() => {
        this.loading = false;
      });
  }

  /**
   * 搜索和计算分页数据
   */
  getPageData() {
    this.sms = MessagesBiz.getPageData(this.smsAll, this.searchText, this.searchDate, this.pageInfo);
  }

  /**
   * 斑马条纹样式
   * @param row
   * @param rowIndex
   */
  tableRowClassName(row: any) {
    if (row.rowIndex % 2 === 0) {
      return 'table-row-light';
    } else {
      return 'table-row-dark';
    }
  }

  /**
   * 页数改变
   * @param data
   */
  currentChange(data: any) {
    this.getPageData();
  }

  /**
   * 搜索
   */
  search() {
    this.pageInfo = new PageInfo();
    this.getPageData();
  }

  /**
   * 刷新列表
   */
  refresh() {
    this.searchDate = [];
    this.searchText = '';
    this.pageInfo = new PageInfo();
    this.getSms();
  }

  /**
   * 删除数据
   * @param pos
   */
  removeConfirm(id: string) {
    MessagesBiz.removeConfirm(id, this);
  }
}
