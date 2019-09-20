import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Instance {
  Created: string;
  DSN: string;
  Deleted: string;
  Distro: string;
  Id: number;
  Name: string;
  ParentUUID: string;
  Subsystem: string;
  UUID: string;
  Version: string;
  Agent?: Instance | null;
}

@Injectable()
export class InstanceService {
  public dbServers: Array<Instance> = [];
  public dbServerMap: { [key: string]: Instance } = {};
  constructor() { }
}
