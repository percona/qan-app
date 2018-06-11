import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import {InstanceService} from './core/instance.service';
import {environment} from './environment';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Query Analytics';
  version = environment.version;
  isDemo = environment.demo;
  hideNav = false;
  isInstancesListEmpty: boolean;
  theme = 'app-theme-light';

  constructor(instanceService: InstanceService, @Inject(DOCUMENT) private document) {
    // show message how to configure pmm-client.
    console.log(this.inIframe() || instanceService.dbServers.length === 0);
    this.hideNav = this.inIframe() || instanceService.dbServers.length === 0;
  }

  toggleTheme() {
    this.theme = this.theme === 'app-theme-light' ? 'app-theme-dark' : 'app-theme-light';
    this.setCookie('theme', this.theme)
    this.document.body.className = this.theme;
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
    query.split('&').forEach(function (part) {
      const item = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  }
}
