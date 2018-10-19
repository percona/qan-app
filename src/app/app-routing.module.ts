import { NgModule, Injectable } from '@angular/core';
import { Routes, Router, RouterModule, CanActivate } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

import { QueryProfileComponent } from './query-profile/query-profile.component';
import { MySQLQueryDetailsComponent } from './mysql-query-details/mysql-query-details.component';
import { MongoQueryDetailsComponent } from './mongo-query-details/mongo-query-details.component';
import { SummaryComponent } from './summary/summary.component';
import { SettingsComponent } from './settings/settings.component';
import { AddInstanceComponent } from './add-instance/add-instance.component';
import { AddAwsComponent } from './add-aws/add-aws.component';
import { InstanceService } from './core/instance.service';
import { AddRemotePostgresComponent } from './add-remote-postgres/add-remote-postgres.component';

@Injectable()
export class RegisteredInstanceGuard implements CanActivate {

    private existsRegisteredInstances: boolean;

    constructor(public instanceService: InstanceService, public router: Router) {
        console.log('EmptyInstanceGuard.constructor', instanceService.dbServers);
        this.existsRegisteredInstances = instanceService.dbServers.length > 0;
    }
    canActivate() {
        if (!this.existsRegisteredInstances) {
            this.router.navigate(['add-instance']);
        }
        return this.existsRegisteredInstances;
    }
}

const routes: Routes = [
    { path: '', redirectTo: 'profile', pathMatch: 'full', canActivate: [RegisteredInstanceGuard] },
    {
        path: 'profile', component: QueryProfileComponent, canActivate: [RegisteredInstanceGuard], children: [
            { path: 'report/mysql', component: MySQLQueryDetailsComponent, canActivate: [RegisteredInstanceGuard] },
            { path: 'report/mongo', component: MongoQueryDetailsComponent, canActivate: [RegisteredInstanceGuard] }
        ]
    },
    { path: 'sys-summary', component: SummaryComponent, pathMatch: 'full', canActivate: [RegisteredInstanceGuard] },
    { path: 'settings', component: SettingsComponent, pathMatch: 'full', canActivate: [RegisteredInstanceGuard] },
    { path: 'add-instance', component: AddInstanceComponent, pathMatch: 'full' },
    { path: 'add-aws', component: AddAwsComponent, pathMatch: 'full' },
    { path: 'add-remote-postgres', component: AddRemotePostgresComponent, pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [RegisteredInstanceGuard],
    exports: [RouterModule]
})
export class AppRoutingModule { }
