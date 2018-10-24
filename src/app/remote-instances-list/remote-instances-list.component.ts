import { Component, OnInit } from '@angular/core';
import {RemoteInstancesListService} from './remote-instances-list.service';
import {RemoteInstance, RemoteInstanceNode, RemoteInstanceService} from '../add-remote-instances/add-remote-instance.service';
import {environment} from '../environment';

@Component({
  selector: 'app-remote-instances-list',
  templateUrl: './remote-instances-list.component.html',
  styleUrls: ['./remote-instances-list.component.css']
})
export class RemoteInstancesListComponent implements OnInit {
  isDemo = false;
  errorMessage: string;
  allInstances;
  registeredInstances: string[] = [];
  remoteInstances: RemoteInstance[] = [];

  constructor(private remoteInstancesListService: RemoteInstancesListService) {
    this.isDemo = environment.demoHosts.includes(location.hostname);
  }

  async ngOnInit() {
    this.allInstances = await this.remoteInstancesListService.getList();
  }

  async disableInstance(node: RemoteInstanceNode, service: RemoteInstanceService) {
    if (this.isDemo) {
      return false;
    }

    const text = `Are you sure you want to delete? ${node.name}`;
    if (confirm(text)) {
      try {
        const res = await this.remoteInstancesListService.disable(node, service);
        await this.getRegistered(service);
      } catch (err) {
        this.errorMessage = err.json().error;
      }
    }
  }

  async getRegistered(service: RemoteInstanceService) {
    this.errorMessage = '';
    try {
      this.allInstances = await this.remoteInstancesListService.getRegistered(service);
    } catch (err) {
      this.errorMessage = err.json().error;
    }
    this.registeredInstances = [];
    if (this.remoteInstances !== undefined) {
      this.remoteInstances.forEach(element => {
        this.registeredInstances.push(element.node.name + ':' + element.node.region);
      });
    }
  }

}
