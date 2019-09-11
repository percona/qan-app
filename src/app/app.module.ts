import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { InstanceService } from './core/services/instance.service';

export function getInstances(instanceService: InstanceService) {
  return function() { return instanceService.getDBServers(); };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
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
