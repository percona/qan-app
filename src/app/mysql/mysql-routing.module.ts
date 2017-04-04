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
            { path: '', redirectTo: 'profile'},
            { path: 'profile', component: QueryProfileComponent, children: [
                { path: 'report', component: QueryDetailsComponent }
            ]},
            { path: 'sys-summary', component: SummaryComponent, pathMatch: 'full' },
            { path: 'settings', component: SettingsComponent, pathMatch: 'full' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MySQLRoutingModule { }
