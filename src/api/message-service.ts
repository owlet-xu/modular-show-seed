import * as httpClient from '@/utils/http-client';
// models
import { SmsInfo } from '@/models/sms-info';

export default {
  /**
   * 查找消息
   */
  async getSms(): Promise<SmsInfo[]> {
    const url = './data/sms.json';
    return httpClient.getPromise(url);
  }
};
