import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

import { QueryProfileComponent } from './query-profile/query-profile.component';
import { MySQLQueryDetailsComponent } from './mysql-query-details/mysql-query-details.component';
import { MongoQueryDetailsComponent } from './mongo-query-details/mongo-query-details.component';
import { SummaryComponent } from './summary/summary.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    {
        path: 'profile', component: QueryProfileComponent, children: [
            { path: 'report/mysql', component: MySQLQueryDetailsComponent },
            { path: 'report/mongo', component: MongoQueryDetailsComponent }
        ]
    },
    { path: 'sys-summary', component: SummaryComponent, pathMatch: 'full' },
    { path: 'settings', component: SettingsComponent, pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
