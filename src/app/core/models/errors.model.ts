export interface IHttpError1 {
  message: string;
  data: any;
  hResult: number;
}

export interface IHttpError2 {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: Errors;
}

interface Errors {
  [key: string]: string[];
}
