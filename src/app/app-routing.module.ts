import { NgModule, Injectable } from '@angular/core';
import { Routes, Router, RouterModule, CanActivate } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

import { QueryProfileComponent } from './qan/query-profile/query-profile.component';
import { SummaryComponent } from './summary/summary.component';
import { SettingsComponent } from './settings/settings.component';
import { AddInstanceComponent } from './add-instance/add-instance.component';
import { AddAmazonRDSComponent } from './add-amazon-rds/add-amazon-rds.component';
import { InstanceService } from './core/services/instance.service';
import { AddRemoteInstanceComponent } from './add-remote-instances/add-remote-instance.component';
import { RemoteInstancesListComponent } from './remote-instances-list/remote-instances-list.component';
import { QueryDetailsComponent } from './qan/query-details/query-details.component';
import {InventoryComponent} from './inventory/inventory.component';

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
        path: 'profile', component: QueryProfileComponent, children: [
            { path: 'report/mysql', component: QueryDetailsComponent },
            { path: 'report/mongo', component: QueryDetailsComponent }
        ]
    },
    { path: 'sys-summary', component: SummaryComponent, pathMatch: 'full', canActivate: [RegisteredInstanceGuard] },
    { path: 'settings', component: SettingsComponent, pathMatch: 'full', canActivate: [RegisteredInstanceGuard] },
    { path: 'add-instance', component: AddInstanceComponent, pathMatch: 'full' },
    { path: 'add-amazon-rds', component: AddAmazonRDSComponent, pathMatch: 'full' },
    { path: 'add-remote-postgres', component: AddRemoteInstanceComponent, pathMatch: 'full' },
    { path: 'add-remote-mysql', component: AddRemoteInstanceComponent, pathMatch: 'full' },
    { path: 'pmm-list', component: RemoteInstancesListComponent, pathMatch: 'full' },
    { path: 'pmm-inventory', component: InventoryComponent, pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [RegisteredInstanceGuard],
    exports: [RouterModule]
})
export class AppRoutingModule { }
