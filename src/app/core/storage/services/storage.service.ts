import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Storage {
  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return console.error('Error parsing value in storage:', e);
    }
  }

  set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
