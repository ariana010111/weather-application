import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private readonly USER_ID = 'userId';

  constructor() {
  }

  public setUserId(userId: number): void {
    localStorage.setItem(this.USER_ID, JSON.stringify(userId));
  }

  public setAccessToken(accessToken: string): void {
    localStorage.setItem('access_token', accessToken);
  }

  public getAccessToken = () => localStorage.getItem('access_token');



}
