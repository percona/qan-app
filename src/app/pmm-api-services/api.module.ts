/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { AgentsService } from './services/agents.service';
import { NodesService } from './services/nodes.service';
import { ServicesService } from './services/services.service';
import { ActionsService } from './services/actions.service';
import { MongoDBService } from './services/mongo-db.service';
import { MySQLService } from './services/my-sql.service';
import { NodeService } from './services/node.service';
import { PostgreSQLService } from './services/postgre-sql.service';
import { ProxySQLService } from './services/proxy-sql.service';
import { ServiceService } from './services/service.service';
import { FiltersService } from './services/filters.service';
import { MetricsNamesService } from './services/metrics-names.service';
import { ProfileService } from './services/profile.service';
import { ObjectDetailsService } from './services/object-details.service';
import { ServerService } from './services/server.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    AgentsService,
    NodesService,
    ServicesService,
    ActionsService,
    MongoDBService,
    MySQLService,
    NodeService,
    PostgreSQLService,
    ProxySQLService,
    ServiceService,
    FiltersService,
    MetricsNamesService,
    ProfileService,
    ObjectDetailsService,
    ServerService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
