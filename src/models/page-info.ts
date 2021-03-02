export class PageInfo {
  currentPage: number;
  total: number;
  pageSize: number;

  constructor() {
    this.currentPage = 1;
    this.total = 0;
    this.pageSize = 16;
  }
}
