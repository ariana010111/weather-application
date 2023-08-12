import { Message } from 'primeng/api';

export interface IResponse<T> {
  response: T | null | undefined;
  errors: Message[] | null;
  status: number;
}
