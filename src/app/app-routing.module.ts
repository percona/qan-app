import { NgModule, Injectable } from '@angular/core';
import { Routes, Router, RouterModule, CanActivate } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

import { QanProfileComponent } from './qan/profile/qan-profile.component';
import { InstanceService } from './core/services/instance.service';
import { ProfileDetailsComponent } from './qan/profile-details/profile-details.component';

@Injectable()
export class RegisteredInstanceGuard implements CanActivate {
  private existsRegisteredInstances: boolean;

  constructor(public instanceService: InstanceService, public router: Router) {
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
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
    canActivate: [RegisteredInstanceGuard],
  },
  {
    path: 'profile',
    component: QanProfileComponent,
    children: [{ path: 'details/:id', component: ProfileDetailsComponent }],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [RegisteredInstanceGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
