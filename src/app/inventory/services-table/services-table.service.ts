import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ServicesTableService {
  private servicesDataSource = new BehaviorSubject([]);

  constructor() { }

  setServicesData(data) {
    this.servicesDataSource.next(data)
  }

  get servicesData() {
    return this.servicesDataSource;
  }
}
