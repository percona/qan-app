import {
    NgModule,
    Optional, SkipSelf
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ErrorHandler } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { QanErrorHandler } from './qan-error.handler';
import { InstanceService } from './instance.service';
import { CoreComponent } from './core.component';

import { QueryProfileComponent } from '../query-profile/query-profile.component';
import { QueryProfileService } from '../query-profile/query-profile.service';
import { MySQLQueryDetailsComponent } from '../mysql-query-details/mysql-query-details.component';
import { MySQLQueryDetailsService } from '../mysql-query-details/mysql-query-details.service';
import { MongoQueryDetailsComponent } from '../mongo-query-details/mongo-query-details.component';
import { MongoQueryDetailsService } from '../mongo-query-details/mongo-query-details.service';
import { SummaryComponent } from '../summary/summary.component';
import { SummaryService } from '../summary/summary.service';
import { SettingsComponent } from '../settings/settings.component';
import { SettingsService } from '../settings/settings.service';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [NavComponent, PageNotFoundComponent, QueryProfileComponent,
        MySQLQueryDetailsComponent, MongoQueryDetailsComponent,
        SummaryComponent, SettingsComponent],
    exports: [NavComponent, PageNotFoundComponent, QueryProfileComponent,
        MySQLQueryDetailsComponent, MongoQueryDetailsComponent,
        SummaryComponent, SettingsComponent],
    providers: [InstanceService, QueryProfileService, MySQLQueryDetailsService,
        MongoQueryDetailsService, SummaryService, SettingsService]
})
export class CoreModule {

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
