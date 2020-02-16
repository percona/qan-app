import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { JSONTreeComponent } from './json-tree/json-tree.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InstanceService } from './services/instance.service';
import { QanProfileComponent } from '../qan/profile/qan-profile.component';
import { QanProfileService } from '../qan/profile/qan-profile.service';
import { ClipboardModule } from 'ngx-clipboard';
import { EditColumnComponent } from '../qan/edit-column/edit-column.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterMenuComponent } from '../qan/filter-menu/filter-menu.component';
import { FilterMenuService } from '../qan/filter-menu/filter-menu.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FilterSearchService } from './services/filter-search.service';
import { EditColumnService } from '../qan/edit-column/qan-edit-column.service';
import { SearchAutocompleteComponent } from '../qan/search-autocomplete/search-autocomplete.component';
import { ProfileDetailsComponent } from '../qan/profile-details/profile-details.component';
import { ProfileDetailsService } from '../qan/profile-details/profile-details.service';
import { ApiModule } from '../pmm-api-services/api.module';
import { NodesService } from '../pmm-api-services/services/nodes.service';
import { ServicesService } from '../pmm-api-services/services/services.service';
import { AgentsService } from '../pmm-api-services/services/agents.service';
import { TableCellComponent } from '../qan/table-cell/table-cell.component';
import { ProfileTableComponent } from '../qan/profile-table/profile-table.component';
import { TableHeaderCellComponent } from '../qan/table-header-cell/table-header-cell.component';
import { MainCellComponent } from '../qan/main-cell/main-cell.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailsRowComponent } from '../qan/profile-details/components/details-row/details-row.component';
import { DetailsLabelsComponent } from '../qan/profile-details/components/details-labels/details-labels.component';
import { ExamplesViewerComponent } from '../qan/profile-details/components/examples-viewer/examples-viewer.component';
import { QueryExampleComponent } from '../qan/profile-details/components/query-example/query-example.component';
import { ExplainComponent } from '../qan/profile-details/components/explain/explain.component';
import { FilterMenuViewerComponent } from '../qan/filter-menu-viewer/filter-menu-viewer.component';
import { ActionsService } from '../pmm-api-services/services/actions.service';
import { TablesComponent } from '../qan/profile-details/components/tables/tables.component';
import { TableCreateComponent } from '../qan/profile-details/components/tables/components/table-create/table-create.component';
import { TableStatusComponent } from '../qan/profile-details/components/tables/components/table-status/table-status.component';
import { DetailsTableComponent } from '../qan/profile-details/components/details-table/details-table.component';
import { DetailsFingerprintComponent } from '../qan/profile-details/components/details-fingerprint/details-fingerprint.component';
import { TableIndexesComponent } from '../qan/profile-details/components/tables/components/table-indexes/table-indexes.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ClipboardModule,
    NgSelectModule,
    NgxPaginationModule,
    PerfectScrollbarModule,
    ApiModule,
  ],
  declarations: [
    PageNotFoundComponent,
    QanProfileComponent,
    FilterMenuComponent,
    JSONTreeComponent,
    SearchAutocompleteComponent,
    EditColumnComponent,
    ProfileDetailsComponent,
    ProfileTableComponent,
    TableHeaderCellComponent,
    TableCellComponent,
    MainCellComponent,
    DetailsRowComponent,
    DetailsLabelsComponent,
    ExamplesViewerComponent,
    QueryExampleComponent,
    ExplainComponent,
    FilterMenuViewerComponent,
    TablesComponent,
    TableCreateComponent,
    TableStatusComponent,
    DetailsTableComponent,
    DetailsFingerprintComponent,
    TableIndexesComponent,
  ],
  exports: [
    PageNotFoundComponent,
    QanProfileComponent,
    FilterMenuComponent,
    JSONTreeComponent,
    SearchAutocompleteComponent,
    EditColumnComponent,
    ProfileDetailsComponent,
    DetailsRowComponent,
    DetailsLabelsComponent,
    ExamplesViewerComponent,
    QueryExampleComponent,
    ExplainComponent,
    FilterMenuViewerComponent,
    TablesComponent,
    TableCreateComponent,
    TableStatusComponent,
    DetailsTableComponent,
    DetailsFingerprintComponent,
    TableIndexesComponent,
  ],
  providers: [
    InstanceService,
    QanProfileService,
    ProfileDetailsService,
    EditColumnService,
    FilterMenuService,
    FilterSearchService,
    NodesService,
    ServicesService,
    AgentsService,
    ActionsService,
  ],
})
export class CoreModule {}
