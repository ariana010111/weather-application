// import {
//   HttpClient,
//   HttpErrorResponse,
//   HttpEvent,
//   HttpHeaders,
//   HttpParams,
//   HttpResponse,
// } from '@angular/common/http';
// import {Injectable} from '@angular/core';
// import {Message, MessageService} from 'primeng/api';
// import {Observable, of} from 'rxjs';
// import {catchError, map} from 'rxjs/operators';
// import {IResponse} from "../../../models/response.model";
// import {IHttpError1, IHttpError2} from "../../../models/errors.model";
//
//
// interface IOptions {
//   headers?:
//     | HttpHeaders
//     | {
//     [header: string]: string | string[];
//   };
//   observe: 'events';
//   params?:
//     | HttpParams
//     | {
//     [param: string]: string | string[];
//   };
//   reportProgress?: boolean;
//   responseType?: 'json';
//   withCredentials?: boolean;
// }
//
// @Injectable({
//   providedIn: 'root',
// })
// export class ApiBaseService {
//   constructor(private http: HttpClient, private toast: MessageService) {
//   }
//
//   post<T>(
//     url: string,
//     body,
//     options?: Partial<IOptions>
//   ): Observable<IResponse<T>> {
//     return this._responseTranslator(
//       this.http.post<T>(url, body, {...options, observe: 'response'})
//     );
//   }
//
//   put<T>(
//     url: string,
//     body,
//     options?: Partial<IOptions>
//   ): Observable<IResponse<T>> {
//     return this._responseTranslator(
//       this.http.put<T>(url, body, {...options, observe: 'response'})
//     );
//   }
//
//   delete<T>(url: string, options?: Partial<IOptions>): Observable<IResponse<T>> {
//     return this._responseTranslator(
//       this.http.delete<T>(url, {...options, observe: 'response'})
//     );
//   }
//
//   get<T>(url: string, options?: Partial<IOptions>): Observable<IResponse<T>> {
//     return this._responseTranslator(
//       this.http.get<T>(url, {...options, observe: 'response'})
//     );
//   }
//
//   // tslint:disable-next-line:ban-types
//   getParams(params: Object): HttpParams {
//     let httpParams = new HttpParams();
//     Object.keys(params).forEach((key: string) => {
//       if (!params[key]) {
//         return null;
//       }
//       return (httpParams = httpParams.set(key, `${params[key]}`));
//     });
//     return httpParams;
//   }
//
//   private _responseTranslator<T>(
//     req: Observable<HttpEvent<any>>
//   ): Observable<IResponse<T>> {
//     return req.pipe(
//       map((event: HttpEvent<T>) => {
//         if (event instanceof HttpResponse) {
//           return {
//             response: event.body,
//             errors: null,
//             status: event.status,
//           };
//         } else {
//           return {
//             response: null,
//             errors: null,
//             status: 0,
//           };
//         }
//       }),
//       catchError((httpError: HttpErrorResponse) => {
//         const messages: Message[] = [];
//         const error: Partial<IHttpError1 & IHttpError2> = httpError.error;
//         if (error?.message) {
//           messages.push({
//             severity: 'error',
//             summary: 'Error',
//             detail: error.message,
//           });
//         }
//         if (error?.errors) {
//           const errorsObj = error.errors;
//           Object.keys(error?.errors).forEach((key) => {
//             const message = {
//               severity: 'error',
//               summary: 'Error',
//               detail: errorsObj[key][0],
//             };
//             messages.push(message);
//           });
//         }
//         return of({
//           response: null,
//           errors: messages,
//           status: httpError.status,
//         });
//       })
//     );
//   }
//
//   showToast(body: IResponse<any>, message: Message): void {
//     const {errors, response, status} = body;
//     if (response || status === 200) {
//       this.toast.add(message);
//     }
//     if (errors) {
//       this.toast.addAll(errors);
//     }
//   }
// }
