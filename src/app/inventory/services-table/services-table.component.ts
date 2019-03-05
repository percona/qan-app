import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServicesService} from '../../inventory-api/services/services.service';
import {AmazonRDSMySQL, MongoDBService, MySQLService} from '../inventory.service';

@Component({
  selector: 'app-services-table',
  templateUrl: './services-table.component.html',
  styleUrls: ['./services-table.component.scss']
})
export class ServicesTableComponent implements OnInit, OnDestroy {
  public servicesData: any;
  private servicesSubscription: any;

  public amazonRDSMySQL = new AmazonRDSMySQL();
  public mySQLService = new MySQLService();
  public mongoDBService = new MongoDBService();

  constructor(private servicesService: ServicesService) {
    this.servicesSubscription = this.servicesService.ListServices({}).subscribe(data => this.servicesData = data);
  }

  ngOnInit() {
    // this.servicesData = {
    //   amazon_rds_mysql: [
    //     {
    //       address: 'address-0',
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp2: 'additionalProp2',
    //         additionalProp3: 'additionalProp3'
    //       },
    //       node_id: 'node_id-0',
    //       port: 0,
    //       service_id: 'service_id-0',
    //       service_name: 'service_name-0'
    //     },
    //     {
    //       address: 'address-0',
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp3: 'additionalProp3'
    //       },
    //       node_id: 'node_id-0',
    //       port: 0,
    //       service_id: 'service_id-0',
    //       service_name: 'service_name-0'
    //     },
    //     {
    //       address: 'address-0',
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp2: 'additionalProp2',
    //       },
    //       node_id: 'node_id-0',
    //       port: 0,
    //       service_id: 'service_id-0',
    //       service_name: 'service_name-0'
    //     }
    //   ],
    //   mysql: [
    //     {
    //       address: 'address-0',
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp2: 'additionalProp2',
    //         additionalProp3: 'additionalProp3'
    //       },
    //       node_id: 'node_id-0',
    //       port: 0,
    //       service_id: 'service_id-0',
    //       service_name: 'service_name-0',
    //     },
    //     {
    //       address: 'address-0',
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp3: 'additionalProp3'
    //       },
    //       node_id: 'node_id-0',
    //       port: 0,
    //       service_id: 'service_id-0',
    //       service_name: 'service_name-0',
    //     },
    //     {
    //       address: 'address-0',
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp2: 'additionalProp2',
    //       },
    //       node_id: 'node_id-0',
    //       port: 0,
    //       service_id: 'service_id-0',
    //       service_name: 'service_name-0',
    //     }
    //   ],
    //   mongodb: [
    //     {
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp2: 'additionalProp2',
    //         additionalProp3: 'additionalProp3'
    //       },
    //       node_id: 'node_id',
    //       service_id: 'service_id',
    //       service_name: 'service_name'
    //     }
    //   ],
    // };
  }

  ngOnDestroy() {
    this.servicesSubscription.unsubscribe();
  }

  addAmazonRDSMySQL() {
    this.servicesService.AddAmazonRDSMySQLService(this.amazonRDSMySQL).subscribe(data => console.log('amazonRDSMySQL - ', data));
  }

  addMySQLService() {
    this.servicesService.AddMySQLService(this.mySQLService).subscribe(data => console.log('mySQLService - ', data));
  }

  addMongoDBService() {
    this.servicesService.AddMongoDBService(this.mongoDBService).subscribe(data => console.log('mongoDBService - ', data));
  }

}
