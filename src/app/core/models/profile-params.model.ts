export class ProfileParamsModel {
  'var-host': string;
  tz: string;
  theme: string;
  type: string;
  from: string;
  to: string;
  search: string;
  first_seen: boolean;
  filters: string;
  main_metric: string;
  columns: string;
  order_by: string;
  filter_by: string;

  constructor(profile, urlParams) {
    this['var-host'] = urlParams['var-host'] || '';
    this.tz = urlParams['tz'] || '';
    this.theme = urlParams['theme'] || '';
    this.type = urlParams['type'] || '';

    this.from = profile['from'] || '';
    this.to = profile['to'] || '';
    this.search = profile['search'] || '';
    this.first_seen = profile['first_seen'] || '';
    this.filters = profile['filters'].length ? profile['filters'].map(filter => `${filter['groupName']}:${filter['filterName']}`).join(',') : '';
    this.main_metric = profile['main_metric'] || '';
    this.columns = profile['columns'] ? JSON.stringify(profile['columns']) : '';
    this.order_by = profile['order_by'] || '';
    this.filter_by = profile['filter_by'] || '';
  }
}
