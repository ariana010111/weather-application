import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class SourceStorageService {
  STORAGE_PREFIX? = 'apt_';
  abstract storage: Storage | undefined;
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  abstract readonly length: number;

  abstract key(index: number): string | null;

  getInstance(): SourceStorageService {
    return this;
  }
}
