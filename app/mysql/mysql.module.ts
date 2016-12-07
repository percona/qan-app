import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MySQLRoutingModule } from './mysql-routing.component';
import { MySQLComponent } from './mysql.component';
import { QueryProfileComponent } from './query-profile.component';
import { QueryProfileService } from './query-profile.service';
import { QueryDetailsComponent } from './query-details.component';
import { QueryDetailsService } from './query-details.service';
import { SummaryComponent } from './summary.component';
import { SummaryService } from './summary.service';
import { SettingsComponent } from './settings.component';
import { SettingsService } from './settings.service';

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
