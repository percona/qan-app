import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app',
  template: `
  <nav class="navbar navbar-fixed-top navbar-light bg-faded"></nav>

  <!-- Router Outlet -->
  <router-outlet></router-outlet>
  `
})
export class AppComponent { }