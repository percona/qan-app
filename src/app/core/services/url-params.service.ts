import { Injectable } from '@angular/core';

export interface QueryParams {
  from?: string;
  to?: string;
  'var-host'?: string; // | string[];
  search?: string;
  queryID?: string;
  tz?: string;
  theme?: string;
  first_seen?: boolean;
  filters?: any;
}

@Injectable()
export class UrlParamsService {

}
