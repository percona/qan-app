import {Component, OnDestroy, OnInit} from '@angular/core';
import {NodesService} from '../../inventory-api/services/nodes.service';
import {InventoryService} from '../inventory.service';
import {NodesTableService} from './nodes-table.service';

@Component({
  selector: 'app-nodes-table',
  templateUrl: './nodes-table.component.html',
  styleUrls: ['./nodes-table.component.scss']
})
export class NodesTableComponent implements OnInit, OnDestroy {
  private nodesList$: any;
  private nodesTableData$: any;

  public nodesData: any;

  constructor(
    private nodesService: NodesService,
    private nodesTableService: NodesTableService,
    private inventoryService: InventoryService
  ) {
    this.nodesList$ = this.nodesService.ListNodes({}).subscribe(item => {
      const dataStructure = this.inventoryService.generateStructure(item);
      this.nodesTableService.setNodesData(dataStructure);
    });
    this.nodesTableData$ = this.nodesTableService.nodesData.subscribe(nodes => {
      if (nodes.length) {
        this.nodesData = nodes.filter(agent => !agent.isDeleted);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.nodesList$.unsubscribe();
    this.nodesTableData$.unsubscribe();
  }

  removeNode(id) {
    this.nodesService.RemoveNode({node_id: id}).subscribe(
      () => this.nodesTableService.setNodesData(this.nodesData)
    )
  }
}
