import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { InstanceService } from './core/instance.service';
import { AddAwsComponent } from './add-aws/add-aws.component';
import { AddRemoteInstanceComponent } from './add-remote-instances/add-remote-instance.component';
import { AddInstanceComponent } from './add-instance/add-instance.component';
import { HttpModule } from '@angular/http';

export function getInstances(instanceService: InstanceService) {
  return function () { return instanceService.getDBServers(); };
}

@NgModule({
  declarations: [
    AppComponent,
    AddAwsComponent,
    AddRemoteInstanceComponent,
    AddInstanceComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    CoreModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedModule,
  ],
  providers: [
    InstanceService,
    {
      provide: APP_INITIALIZER,
      useFactory: getInstances,
      deps: [InstanceService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
