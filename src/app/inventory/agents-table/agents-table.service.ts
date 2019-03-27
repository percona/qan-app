import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AgentsTableService {
  private agentsDataSource = new BehaviorSubject([]);

  constructor() { }

  setAgentsData(data) {
    this.agentsDataSource.next(data)
  }

  get agentsData() {
    return this.agentsDataSource;
  }
}
