/* tslint:disable */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { AgentsService } from './services/agents.service';
import { NodesService } from './services/nodes.service';
import { ServicesService } from './services/services.service';
import { MySQLService } from './services/my-sql.service';
import { MetricsService } from './services/metrics.service';
import { MetricsNamesService } from './services/metrics-names.service';
import { ProfileService } from './services/profile.service';
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
    MetricsService,
    MetricsNamesService,
    ProfileService,
    ServerService
  ],
})
export class ApiModule { }
