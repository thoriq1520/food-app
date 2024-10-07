export class PaginationDTO {
    total: number;
    limit: number;
    page: number;
    totalPage: number;
  
    constructor(total = 0, limit = 10, page = 1) {
      this.total = total;
      this.limit = limit;
      this.page = page;
      this.totalPage = Math.ceil(total / limit);
    }
  }
  