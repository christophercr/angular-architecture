import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsPublisher {
  events: Array<EventEmitter<any>> = [];

  publish(key: string, data?: any): void {
    if (!this.events[key]) {
      this.events[key] = new EventEmitter();
    }

    this.events[key].emit(data);
  }

  get(key: string): EventEmitter<any> {
    if (!this.events[key]) {
      this.events[key] = new EventEmitter();
    }

    return this.events[key];
  }

  reset(): void {
    this.events = [];
  }
}
