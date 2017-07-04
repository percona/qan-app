import { Component } from '@angular/core';
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
