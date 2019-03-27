import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServicesService } from '../../inventory-api/services/services.service';
import { InventoryService } from '../inventory.service';
import { ServicesTableService } from './services-table.service';

@Component({
  selector: 'app-services-table',
  templateUrl: './services-table.component.html',
  styleUrls: ['./services-table.component.scss']
})
export class ServicesTableComponent implements OnInit, OnDestroy {
  private servicesList$: any;
  private servicesTableData$: any;

  public servicesData: any;

  constructor(
    private servicesService: ServicesService,
    private servicesTableService: ServicesTableService,
    private inventoryService: InventoryService
  ) {
    this.servicesList$ = this.servicesService.ListServices({}).subscribe(item => {
      const dataStructure = this.inventoryService.generateStructure(item);
      this.servicesTableService.setServicesData(dataStructure);
    });
    this.servicesTableData$ = this.servicesTableService.servicesData.subscribe(services => {
      if (services.length) {
        this.servicesData = services.filter(agent => !agent.isDeleted);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.servicesList$.unsubscribe();
    this.servicesTableData$.unsubscribe();
  }

  removeService(id) {
    this.servicesService.RemoveService({ service_id: id }).subscribe(
      () => this.servicesTableService.setServicesData(this.servicesData)
    );
  }

}
