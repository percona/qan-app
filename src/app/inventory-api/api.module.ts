/* tslint:disable */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { AgentsService } from './services/agents.service';
import { NodesService } from './services/nodes.service';
import { ServicesService } from './services/services.service';
import { MySQLService } from './services/my-sql.service';
import { NodeService } from './services/node.service';
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
    MySQLService,
    NodeService,
    FiltersService,
    MetricsNamesService,
    ProfileService,
    ObjectDetailsService,
    ServerService
  ],
})
export class ApiModule { }
