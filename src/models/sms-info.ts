export class SmsInfo {
  id: string;
  time: string;
  phone: string;
  state: number;
  tip: string;

  constructor() {
    this.id = '';
    this.time = '';
    this.phone = '';
    this.state = 0;
    this.tip = '';
  }
}
