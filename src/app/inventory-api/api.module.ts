/* tslint:disable */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { AgentsService } from './services/agents.service';
import { NodesService } from './services/nodes.service';
import { ServicesService } from './services/services.service';

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
    ServicesService
  ],
})
export class ApiModule { }
