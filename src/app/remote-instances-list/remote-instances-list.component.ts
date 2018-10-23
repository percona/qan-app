import { Component, OnInit } from '@angular/core';
import {RemoteInstancesListService} from './remote-instances-list.service';

@Component({
  selector: 'app-remote-instances-list',
  templateUrl: './remote-instances-list.component.html',
  styleUrls: ['./remote-instances-list.component.css']
})
export class RemoteInstancesListComponent implements OnInit {

  constructor(private remoteInstancesListService: RemoteInstancesListService) { }

  ngOnInit() {
    const allRDSInstances = this.remoteInstancesListService.getList();
    console.log('allRDSInstances - ', allRDSInstances);
  }

}
