import { PaginationDTO } from './pagination.dto';

export class ResponseDTO<T> {
  status: number;
  message: string;
  data: T;
  meta: object;

  constructor(status: number, message: string, data: T, pagination?: PaginationDTO) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.meta = pagination ? { ...pagination } : {};
  }
}