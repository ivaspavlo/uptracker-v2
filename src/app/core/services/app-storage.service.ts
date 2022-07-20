
import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE } from '@app/core/constants/tokens';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: Storage) { }

  public get(key: string): any {
    return this.localStorage.getItem(key);
  }

  public set(key: string, value: any): void {
    this.localStorage.setItem(key, value);
  }

  public remove(key: string): void {
    this.localStorage.removeItem(key);
  }

}
