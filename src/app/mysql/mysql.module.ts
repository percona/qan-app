import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MySQLRoutingModule } from './mysql-routing.module';
import { MySQLComponent } from './mysql.component';
import { QueryProfileComponent } from './query-profile/query-profile.component';
import { QueryProfileService } from './query-profile/query-profile.service';
import { QueryDetailsComponent } from './query-details/query-details.component';
import { QueryDetailsService } from './query-details/query-details.service';
import { SummaryComponent } from './summary/summary.component';
import { SummaryService } from './summary/summary.service';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from './settings/settings.service';

@NgModule({
  imports: [
    SharedModule,
    MySQLRoutingModule
  ],
  declarations: [
    MySQLComponent,
    QueryProfileComponent,
    QueryDetailsComponent,
    SummaryComponent,
    SettingsComponent,
  ],
  providers: [
    QueryProfileService,
    QueryDetailsService,
    SummaryService,
    SettingsService
  ],
})
export class MySQLModule { }
