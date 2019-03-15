import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {NavComponent} from './nav/nav.component';
import {JSONTreeComponent} from './json-tree/json-tree.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {InstanceService} from './services/instance.service';
import {QueryProfileComponent} from '../qan/query-profile/query-profile.component';
import {QueryProfileService} from '../qan/query-profile/query-profile.service';
import {SummaryComponent} from '../summary/summary.component';
import {SummaryService} from '../summary/summary.service';
import {SettingsComponent} from '../settings/settings.component';
import {SettingsService} from '../settings/settings.service';
import {AddAmazonRDSService} from '../add-amazon-rds/add-amazon-rds.service';
import {AddRemoteInstanceService} from '../add-remote-instances/add-remote-instance.service';
import {RemoteInstancesListService} from '../remote-instances-list/remote-instances-list.service';
import {ClipboardModule} from 'ngx-clipboard';
import {RemoteInstancesListComponent} from '../remote-instances-list/remote-instances-list.component';
import {QanEditColumnComponent} from '../qan/qan-edit-column/qan-edit-column.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {QanFilterComponent} from '../qan/qan-filter/qan-filter.component';
import {QanFilterService} from '../qan/qan-filter/qan-filter.service';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {FilterSearchService} from './services/filter-search.service';
import {QanEditColumnService} from '../qan/qan-edit-column/qan-edit-column.service';
import {QanSearchComponent} from '../qan/qan-search/qan-search.component';
import {QueryDetailsComponent} from '../qan/query-details/query-details.component';
import {QueryDetailsService} from '../qan/query-details/query-details.service';
import {ApiModule} from '../inventory-api/api.module';
import {InventoryService} from '../inventory/inventory.service';
import {NodesService} from '../inventory-api/services/nodes.service';
import {ServicesService} from '../inventory-api/services/services.service';
import {AgentsService} from '../inventory-api/services/agents.service';
import {InventoryComponent} from '../inventory/inventory.component';
import {ServicesTableComponent} from '../inventory/services-table/services-table.component';
import {AgentsTableComponent} from '../inventory/agents-table/agents-table.component';
import {NodesTableComponent} from '../inventory/nodes-table/nodes-table.component';
import {QanTableCellComponent} from '../qan/qan-table-cell/qan-table-cell.component';
import {QanTableComponent} from '../qan/qan-table/qan-table.component';
import {QanTableHeaderCellComponent} from '../qan/qan-table-header-cell/qan-table-header-cell.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ClipboardModule,
    NgSelectModule,
    PerfectScrollbarModule,
    ApiModule
  ],
  declarations: [
    NavComponent,
    PageNotFoundComponent,
    QueryProfileComponent,
    QanFilterComponent,
    SummaryComponent,
    SettingsComponent,
    JSONTreeComponent,
    QanSearchComponent,
    RemoteInstancesListComponent,
    QanEditColumnComponent,
    QueryDetailsComponent,
    InventoryComponent,
    ServicesTableComponent,
    AgentsTableComponent,
    NodesTableComponent,
    QanTableComponent,
    QanTableHeaderCellComponent,
    QanTableCellComponent,
  ],
  exports: [
    NavComponent,
    PageNotFoundComponent,
    QueryProfileComponent,
    QanFilterComponent,
    SummaryComponent,
    SettingsComponent,
    JSONTreeComponent,
    QanSearchComponent,
    RemoteInstancesListComponent,
    QanEditColumnComponent,
    QueryDetailsComponent,
    InventoryComponent,
    ServicesTableComponent,
    AgentsTableComponent,
    NodesTableComponent,
  ],
  providers: [
    InstanceService,
    QueryProfileService,
    SummaryService,
    SettingsService,
    AddAmazonRDSService,
    AddRemoteInstanceService,
    QueryDetailsService,
    RemoteInstancesListService,
    QanEditColumnService,
    QanFilterService,
    FilterSearchService,
    InventoryService,
    NodesService,
    ServicesService,
    AgentsService
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
