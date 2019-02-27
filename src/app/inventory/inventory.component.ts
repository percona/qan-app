import {Component, OnDestroy, OnInit} from '@angular/core';
import {AgentsService} from '../inventory-api/services/agents.service';
import {NodesService} from '../inventory-api/services/nodes.service';
import {ServicesService} from '../inventory-api/services/services.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {
  public servicesData: any;
  public nodeData: any;
  public agentsData: any;
  private nodeSubscription: any;
  private agentsSubscription: any;
  private servicesSubscription: any;

  constructor(
    private agentsService: AgentsService,
    private nodesService: NodesService,
    private servicesService: ServicesService
  ) {
    this.nodeSubscription = this.nodesService.ListNodes({}).subscribe(data => this.nodeData = data);
    this.agentsSubscription = this.agentsService.ListAgents({}).subscribe(data => this.agentsData = data);
    this.servicesSubscription = this.servicesService.ListServices({}).subscribe(data => this.servicesData = data);
  }

  ngOnInit() {
    console.log('this.nodeData - ', this.nodeData);
    console.log('this.agentsData - ', this.agentsData);
    console.log('this.servicesData - ', this.servicesData);
    this.servicesService.AddAmazonRDSMySQLService({
      address: 'localhost',
      node_id: '1wfvr31',
      port: 3306,
      service_name: 'service'
    }).subscribe(data => console.log('response-data - ', data));
  }

  ngOnDestroy() {
    this.nodeSubscription.unsubscribe();
    this.agentsSubscription.unsubscribe();
    this.servicesSubscription.unsubscribe();
  }
}
