import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgentsService } from '../../pmm-api-services/services/agents.service';
import { InventoryService } from '../inventory.service';
import { AgentsTableService } from './agents-table.service';

@Component({
  selector: 'app-agents-table',
  templateUrl: './agents-table.component.html',
  styleUrls: ['./agents-table.component.scss']
})
export class AgentsTableComponent implements OnInit, OnDestroy {
  private agentsList$: any;
  private agentsTableData$: any;

  public agentsData: any;

  constructor(
    private agentsService: AgentsService,
    private agentTableService: AgentsTableService,
    private inventoryService: InventoryService
  ) {
    this.agentsList$ = this.agentsService.ListAgents({}).subscribe(item => {
      const dataStructure = this.inventoryService.generateStructure(item);
      this.agentTableService.setAgentsData(dataStructure);
    });
    this.agentsTableData$ = this.agentTableService.agentsData.subscribe(agents => {
      if (agents.length) {
        this.agentsData = agents.filter(agent => !agent.isDeleted);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.agentsList$.unsubscribe();
    this.agentsTableData$.unsubscribe();
  }

  isString(value): boolean {
    return typeof value === 'string';
  }

  removeAgents(id) {
    this.agentsService.RemoveAgent({ agent_id: id }).subscribe(() => {
      this.agentTableService.setAgentsData(this.agentsData);
    });
  }
}
