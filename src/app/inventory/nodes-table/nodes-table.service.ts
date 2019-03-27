import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class NodesTableService {
  private nodesDataSource = new BehaviorSubject([]);

  constructor() { }

  setNodesData(data) {
    this.nodesDataSource.next(data)
  }

  get nodesData() {
    return this.nodesDataSource;
  }
}
