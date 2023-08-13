import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpHeaders, HttpErrorResponse, HttpEvent
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NotificationService} from "../services/app-services/notification/notification.service";
import {StoreService} from "../services/store.service";
import {INotification} from "../models/notification";
import {SeverityNotification} from "../enums/severity-notification";
import {SystemMessages} from "../enums/system-messages";


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private errorMessageMap: Record<number, string> = {
    400: 'bad-request',
    401: 'unauthorized',
    403: 'forbidden',
    404: 'not-found',
    500: 'internal-server-error'
  };
  constructor(
    private notificationService: NotificationService,
    private storeService: StoreService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(this.addToken(request, this.storeService.getAccessToken()))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage: INotification = {};
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage.title = '';
            errorMessage.message = `Error: ${error.error.message}`;
            errorMessage.severity = SeverityNotification.Error;
            this.notificationService.showToast(errorMessage);
          } else {
            // server-side error
            errorMessage.message = `Error Code: ${error.status}\nMessage: ${error.message}`;

            if (error.status === 404 || error.status === 500 || error.status === 0) {
              errorMessage.title = error.status.toString();
              errorMessage.severity = SeverityNotification.Warn;
              errorMessage.message = SystemMessages.Request_Sent_Error;
            }
          }

          this.notificationService.showToast(errorMessage);
          return throwError({status: error.status, message : errorMessage});
        })
      );
  }

  addToken(request: HttpRequest<any>, newToken: string): HttpRequest<any> {
    const headerSettings: any = {};
    if (newToken) {
      headerSettings.Authorization = 'Bearer ' + newToken;
    }
    headerSettings['Content-Type'] = 'application/json';
    return request.clone({ headers:  new HttpHeaders(headerSettings) });
  }
}
