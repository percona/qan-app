import { Component, OnInit } from '@angular/core';
import {
  AddRemoteInstanceService,
  RemoteInstanceCredentials,
  RemoteInstance,
} from './add-remote-instance.service'
import { environment } from '../environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-remote-postgres',
  templateUrl: './add-remote-instance.component.html',
  styleUrls: ['./add-remote-instance.component.scss']
})
export class AddRemoteInstanceComponent implements OnInit {

  remoteInstanceCredentials = {} as RemoteInstanceCredentials;
  remoteInstance = {} as RemoteInstance;
  isLoading: boolean;
  errorMessage: string;
  isDemo = false;
  submitted = false;
  instanceType: string;
  currentUrl: string;

  constructor(public addRemoteInstanceService: AddRemoteInstanceService, private router: Router) {
    this.isDemo = environment.demoHosts.includes(location.hostname);
    this.currentUrl = this.router.url;
  }

  async onSubmit() {
    this.errorMessage = '';
    this.isLoading = true;
    this.submitted = true;

    try {
      const res = await this.addRemoteInstanceService.enable(this.remoteInstanceCredentials, this.currentUrl);
      // TODO: do something
    } catch (err) {
      this.errorMessage = err.json().error;
      return;
    } finally {
      this.remoteInstance = {} as RemoteInstance;
      this.isLoading = false;
    }
  }

  async ngOnInit() {
    this.errorMessage = '';
    this.instanceType =
      this.addRemoteInstanceService.checkInstanceType(this.currentUrl) === 'postgresql' ? 'PostgreSQL' : 'MySQL';
  }
}
