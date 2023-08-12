import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class AppMenuStateService {

  private menuSource = new Subject<string>();
  private resetSource = new Subject();

  menuSource$ = this.menuSource.asObservable();
  resetSource$ = this.resetSource.asObservable();

  onMenuStateChange(key: string): void {
    this.menuSource.next(key);
  }

  reset(): void {
    this.resetSource.next(null);
  }
}
