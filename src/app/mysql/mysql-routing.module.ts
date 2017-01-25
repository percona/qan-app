import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import { MySQLComponent } from './mysql.component';
import { QueryProfileComponent } from './query-profile/query-profile.component';
import { QueryDetailsComponent } from './query-details/query-details.component';
import { SummaryComponent } from './summary/summary.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: MySQLComponent},
            { path: 'profile/:mysqlServer', component: QueryProfileComponent },
            { path: 'profile/:mysqlServer/from/:from/to/:to', component: QueryProfileComponent, children: [
                { path: 'id/:queryID',
                  component: QueryDetailsComponent },
            ]},
            { path: 'sys-summary/:mysqlServer', component: SummaryComponent, pathMatch: 'full' },
            { path: 'settings/:mysqlServer', component: SettingsComponent, pathMatch: 'full' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MySQLRoutingModule { }
