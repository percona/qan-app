import { Component } from '@angular/core';

import { InstanceService } from './core/instance.service';
import { environment } from './environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Query Analytics';
  version = environment.version;
  isDemo = environment.demo;
  showNav = !this.inIframe();
  isInstancesListEmpty: boolean;

  constructor(instanceService: InstanceService) {
    // show message how to configure pmm-client.
    this.isInstancesListEmpty = !instanceService.dbServers.length;
  }

  /**
   * inIframe is used to show/hide navbar.
   */
  inIframe(): boolean {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

}
