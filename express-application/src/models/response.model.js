class Pagination {
    constructor(total = 0, limit = 10, page = 1) {
      this.total = total;
      this.limit = limit;
      this.page = page;
      this.totalPage = Math.ceil(total / limit);
    }
  }
  
  class Response {
    constructor(status, message, data, pagination = new Pagination()) {
      this.status = status;
      this.message = message;
      this.data = data;
      this.meta = {
        pagination: pagination
      };
    }
  }
  
  module.exports = {
    Response,
    Pagination
  };
  