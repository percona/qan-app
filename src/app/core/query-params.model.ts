export class QueryParamsModel {
  from?: string;
  to?: string;
  'var-host'?: string; // | string[];
  search?: string;
  queryID?: string;
  tz?: string;
  theme?: string;
  first_seen?: boolean;

  constructor(params) {
    // this.from = params.from;
    // this.to = params.to;
    // this['var-host'] = params['var-host'];
    // this.search = params.search;
    // this.queryID = params.queryID;
    // this.tz = params.tz;
    // this.theme = params.theme;
    // this.first_seen = params.first_seen;
    console.log('params - ', params);
  }
}
