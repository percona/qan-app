import { Component, Inject, OnInit } from '@angular/core';

import { InstanceService } from './core/instance.service';
import { environment } from './environment';
import * as moment from 'moment';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Query Analytics';
  version = environment.version;
  isDemo = false;
  hideNav = false;
  isInstancesListEmpty: boolean;
  theme = 'app-theme-light';

  constructor(instanceService: InstanceService, @Inject(DOCUMENT) private document) {
    this.isDemo = environment.demoHosts.indexOf(location.hostname) > -1;
    // show message how to configure pmm-client.
    this.hideNav = this.inIframe() || instanceService.dbServers.length === 0;
  }

  /**
   * inIframe is used to show/hide navbar.
   */
  inIframe(): boolean {
    let inIframe = false;
    try {
      inIframe = window.self !== window.top;
    } catch (e) {
      inIframe = true;
    }
    return inIframe;
  }

  getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  }

  setCookie(key, value) {
    const expireDays = moment().utc().add(7, 'y').toString();
    document.cookie = `${key}=${value}; expires=${expireDays}; path=/`;
  }

  ngOnInit() {
    let res: any;
    res = this.getJsonFromUrl()
    const theme = res.theme || '';
    if (theme === '') {
      this.theme = this.getCookie('theme');
    } else if (theme === 'dark') {
      this.theme = 'app-theme-dark';
    } else if (theme === 'light') {
      this.theme = 'app-theme-light';
    }
    this.setCookie('theme', this.theme);
    this.document.body.className = this.theme;
  }

  getJsonFromUrl() {
    const query = location.search.substr(1);
    const result = {};
    query.split('&').forEach(function(part) {
      const item = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  }

}
