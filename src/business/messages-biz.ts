// models
import { SmsInfo } from '@/models/sms-info';
import { PageInfo } from '@/models/page-info';
import { format } from 'date-fns';
// import Messages from '@/components/messages/messages';

export default {
  getPageData(smsAll: SmsInfo[], searchText: any, searchDate: any, pageInfo: PageInfo) {
    // 1 搜索
    const filterData: SmsInfo[] = smsAll
      .filter((res: SmsInfo) => {
        // 1.1 第一个字段搜索
        if (!searchText) {
          return true;
        }
        if (res.phone.includes(searchText) || res.tip.includes(searchText)) {
          return true;
        }
        return false;
      })
      .filter((res: SmsInfo) => {
        // 1.2 第二个字段搜索
        const time = new Date(format(res.time, 'YYYY-MM-DD 00:00:00'));
        if (!searchDate || searchDate.length < 2) {
          return true;
        }
        if (time >= searchDate[0] && time <= searchDate[1]) {
          return true;
        }
        return false;
      });
    // 2 计算分页
    pageInfo.total = filterData.length;
    const start = (pageInfo.currentPage - 1) * pageInfo.pageSize;
    const end = start + pageInfo.pageSize;
    return filterData.slice(start, end);
  },
  removeConfirm(id: string, components: any) {
    components.$confirm('Eliminar', 'Aviso', {
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      type: 'warning'
    }).then(() => {
      const pos = components.smsAll.findIndex((item: SmsInfo) => item.id === id);
      components.smsAll.splice(pos, 1);
      components.getPageData();
    });
  }
};
