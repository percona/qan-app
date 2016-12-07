import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


// @TODO: UTC to local time
// @TODO: printable layout
// @TODO: editable time range
// @TODO: change URL will change values
// @TODO: better error msg.

// moment.fn.toString = function () { this.format('YYYY-MM-DDTHH:mm:ss'); };
// moment.defaultFormat = 'YYYY-MM-DDTHH:mm:ss';
// set the default
// moment.setDefaultFormat('YYYY-MM-DDTHH:mm:ss.SSSZ');
// or
// moment.format.setDefault('YYYY-MM-DDTHH:mm:ss');
// moment(1469141760123).format(); // '2016-07-21T15:56:00.123-07:00'

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
