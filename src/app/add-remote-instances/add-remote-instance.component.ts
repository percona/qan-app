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
    const currentParrentUrl = `${window.parent.location}`;
    const neededPart = '_pmm-rds-and-remote-instances';
    const currentPart = '_pmm-add-instance';
    const newParentUrl = currentParrentUrl.replace(currentPart, neededPart);

    this.errorMessage = '';
    this.isSubmitted = true;
    if (!form.valid) { return; }

    if (this.remoteInstanceCredentials.name === undefined) {
      this.remoteInstanceCredentials.name = this.remoteInstanceCredentials.address; // set default value for name (like address)
    }

    if (this.remoteInstanceCredentials.port === undefined) {
      this.remoteInstanceCredentials.port = this.instanceType === 'PostgreSQL' ? 5432 : 3306; // set default value for port
    }

    try {
      const res = await this.addRemoteInstanceService.enable(this.remoteInstanceCredentials, this.currentUrl)
        .then(() => {
          window.parent.location.replace(newParentUrl);
        });

    } catch (err) {
      this.errorMessage = err.json().error;
    }
  }
}
