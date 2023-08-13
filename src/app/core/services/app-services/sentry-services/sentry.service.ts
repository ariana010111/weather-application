import {ErrorHandler, Injectable} from '@angular/core';
import * as Sentry from '@sentry/angular';
@Injectable({
  providedIn: 'root'
})
export class SentryService implements ErrorHandler{
  //z#d3+gTGGdgGr5!
  private reportedErrorList: Array<string> = [];
  constructor() { }

  handleError(error) {
    if (error && error.name === 'TypeError' && error.message) {
      const uniqueParameter = error.message.split("'")[1].toString();
      if (this.reportedErrorList.indexOf(uniqueParameter) === -1) {
        Sentry.captureException(error.originalError || error);
        this.reportedErrorList.push(uniqueParameter);
        console.info('One error added to list and logged in Sentry' , this.reportedErrorList)
        console.error(error);
      } else {
        console.error('Duplicate sent error log =  ' + uniqueParameter);
      }
    } else {
      console.error(error);
    }
  }
}
