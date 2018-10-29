import {Component, OnInit} from '@angular/core';
import {AddRemoteInstanceService, RemoteInstanceCredentials} from './add-remote-instance.service'
import {environment} from '../environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-remote-postgres',
  templateUrl: './add-remote-instance.component.html',
  styleUrls: ['./add-remote-instance.component.scss']
})
export class AddRemoteInstanceComponent implements OnInit {

  remoteInstanceCredentials = {} as RemoteInstanceCredentials;
  isLoading: boolean;
  errorMessage: string;
  isDemo = false;
  isSubmitted = false;
  instanceType: string;
  currentUrl: string;

  constructor(public addRemoteInstanceService: AddRemoteInstanceService, private router: Router) {
    this.isDemo = environment.demoHosts.includes(location.hostname);
    this.currentUrl = this.router.url;
  }

  async ngOnInit() {
    this.errorMessage = '';
    this.instanceType =
      this.addRemoteInstanceService.checkInstanceType(this.currentUrl) === 'postgresql' ? 'PostgreSQL' : 'MySQL';
  }

  async onSubmit(form) {
    const currentUrl = `${window.parent.location}`;
    const newURL = currentUrl.split('/graph/d/').shift() + '/graph/d/pmm-list/';

    this.errorMessage = '';
    this.isSubmitted = true;
    if (!form.valid) { return; }

    if (this.remoteInstanceCredentials.name === undefined || this.remoteInstanceCredentials.name === '') {
      this.remoteInstanceCredentials.name = this.remoteInstanceCredentials.address; // set default value for name (like address)
    }

    if (this.remoteInstanceCredentials.port === undefined || this.remoteInstanceCredentials.port === '') {
      this.remoteInstanceCredentials.port = this.instanceType === 'PostgreSQL' ? '5432' : '3306'; // set default value for port
    }

    try {
      const res = await this.addRemoteInstanceService.enable(this.remoteInstanceCredentials, this.currentUrl)
        .then(() => {
          window.parent.location.assign(newURL);
        });

    } catch (err) {
      this.errorMessage = err.json().error;
    }
  }
}
