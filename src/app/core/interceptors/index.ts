import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpErrorInterceptor} from './http-error.interceptor';

export const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: HttpErrorInterceptor,
  },
];
