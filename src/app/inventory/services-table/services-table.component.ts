import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../inventory-api/services/services.service';
import {AmazonRDSMySQL, MongoDBService, MySQLService} from '../inventory.service';
import {Observable} from 'rxjs/internal/Observable';
import {ContainerModel} from '../nodes-table/models/container.model';
import {GenericModel} from '../nodes-table/models/generic.model';
import {RemoteModel} from '../nodes-table/models/remote.model';
import {RemoteAmazonRdsModel} from '../nodes-table/models/remote-amazon-rds.model';
import {ServicesTableService} from './services-table.service';
import {AmazonRdsMysqlModel} from './models/amazon-rds-mysql.model';
import {MongodbModel} from './models/mongodb.model';
import {MysqlModel} from './models/mysql.model';

@Component({
  selector: 'app-services-table',
  templateUrl: './services-table.component.html',
  styleUrls: ['./services-table.component.scss']
})
export class ServicesTableComponent implements OnInit {
  public servicesData: any;

  public amazonRDSMySQL = new AmazonRDSMySQL();
  public mySQLService = new MySQLService();
  public mongoDBService = new MongoDBService();

  constructor(private servicesService: ServicesService, private servicesTableService: ServicesTableService) {
    this.servicesService.ListServices({}).subscribe(item => {
      const dataStructure = this.generateAgentStructure(item);
      this.servicesTableService.setServicesData(dataStructure);
    });
    this.servicesTableService.servicesData.subscribe(services => {
      if (services.length) {
        this.servicesData = services.filter(agent => !agent.isDeleted);
      }
    });
  }

  checkAgentType(params, type) {
    let model = {};
    switch (type) {
      case 'amazon_rds_mysql':
        model = new AmazonRdsMysqlModel(params, type);
        break;
      case 'mongodb':
        model = new MongodbModel(params, type);
        break;
      case 'mysql':
        model = new MysqlModel(params, type);
        break;
    }
    return model;
  }

  generateAgentStructure(item) {
    const newData2 = Object.keys(item).map(agentType => new Object({agentType: agentType, params: item[agentType]}));
    const newResult = newData2.map(agent => agent['params'].map(arrItem => this.checkAgentType(arrItem, agent['agentType'])));
    return [].concat(...newResult);
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

  addAmazonRDSMySQL() {
    this.servicesService.AddAmazonRDSMySQLService(this.amazonRDSMySQL);
  }

  addMySQLService() {
    this.servicesService.AddMySQLService(this.mySQLService);
  }

  addMongoDBService() {
    this.servicesService.AddMongoDBService(this.mongoDBService);
  }

  removeService(id) {
    this.servicesService.RemoveService({service_id: id}).subscribe(
      () => this.servicesTableService.setServicesData(this.servicesData)
    );
  }

}
