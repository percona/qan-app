import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {RemoteInstance} from '../add-remote-instances/add-remote-instance.service';
import {RDSInstance} from '../add-aws/add-aws.service';

@Injectable({
  providedIn: 'root'
})
export class RemoteInstancesListService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  async getList(): Promise<RemoteInstance[]> {
    const url = `managed/v0/remote`;
    const response = await this.http
      .get(url, { headers: this.headers })
      .toPromise();
    console.log('resp list - ', response);
    return response.json().instances as RemoteInstance[];
  }
}
