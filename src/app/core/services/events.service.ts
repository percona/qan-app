import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private customEvents = {
    checkFilters: new Event('checkFilters'),
    copySuccess: new Event('showSuccessNotification'),
    selectQuery: new Event('selectQuery'),
    searchQuery: new Event('searchQuery'),
    updateUrl: new Event('updateUrl'),
    sendEvent: (event) => setTimeout(() => document.dispatchEvent(event), 0)
  };

  constructor() { }

  get events() {
    return this.customEvents;
  }
}
