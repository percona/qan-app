import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './nav/nav.component';
import { JSONTreeComponent } from './json-tree/json-tree.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InstanceService } from './services/instance.service';
import { QueryProfileComponent } from '../qan/query-profile/query-profile.component';
import { QueryProfileService } from '../qan/query-profile/query-profile.service';
import { MySQLQueryDetailsComponent } from '../mysql-query-details/mysql-query-details.component';
import { MySQLQueryDetailsService } from '../mysql-query-details/mysql-query-details.service';
import { MongoQueryDetailsComponent } from '../mongo-query-details/mongo-query-details.component';
import { MongoQueryDetailsService } from '../mongo-query-details/mongo-query-details.service';
import { SummaryComponent } from '../summary/summary.component';
import { SummaryService } from '../summary/summary.service';
import { SettingsComponent } from '../settings/settings.component';
import { SettingsService } from '../settings/settings.service';
import { AddAmazonRDSService } from '../add-amazon-rds/add-amazon-rds.service';
import { AddRemoteInstanceService } from '../add-remote-instances/add-remote-instance.service';
import { RemoteInstancesListService } from '../remote-instances-list/remote-instances-list.service';
import { ClipboardModule } from 'ngx-clipboard';
import { RemoteInstancesListComponent } from '../remote-instances-list/remote-instances-list.component';
import { BaseQueryDetailsService } from './services/base-query-details.service';
import { QanEditColumnComponent } from '../qan/qan-edit-column/qan-edit-column.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { QanFilterComponent } from '../qan/qan-filter/qan-filter.component';
import { QanFilterService } from '../qan/qan-filter/qan-filter.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FilterSearchService } from './services/filter-search.service';
import { QanEditColumnService } from '../qan/qan-edit-column/qan-edit-column.service';
import { QanSearchComponent } from '../qan/qan-search/qan-search.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [CommonModule, SharedModule, ClipboardModule, NgSelectModule, NgxPaginationModule, PerfectScrollbarModule],
    declarations: [NavComponent, PageNotFoundComponent, QueryProfileComponent,
        MySQLQueryDetailsComponent, MongoQueryDetailsComponent, QanFilterComponent,
        SummaryComponent, SettingsComponent, JSONTreeComponent, RemoteInstancesListComponent, QanEditColumnComponent, QanSearchComponent],
    exports: [NavComponent, PageNotFoundComponent, QueryProfileComponent,
        MySQLQueryDetailsComponent, MongoQueryDetailsComponent, QanFilterComponent,
        SummaryComponent, SettingsComponent, JSONTreeComponent, QanSearchComponent],
    providers: [InstanceService, QueryProfileService, MySQLQueryDetailsService,
        MongoQueryDetailsService, SummaryService, SettingsService, AddAmazonRDSService, AddRemoteInstanceService, BaseQueryDetailsService,
      RemoteInstancesListService, QanEditColumnService, QanFilterService, FilterSearchService]
})
export class CoreModule {

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
