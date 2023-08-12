import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {INotification} from '@core/models/notification';
import {SystemMessages} from '@core/enums/system-messages';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
  public notification: Subject<INotification> = new Subject();
  get SystemMessages(): any {
    return SystemMessages;
  }
  public showToast(notification: INotification): void {
    this.notification.next(notification);
  }
}
