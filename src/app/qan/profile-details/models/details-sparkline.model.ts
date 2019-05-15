export class DetailsSparklineModel {
  pointOrder: number;
  pointValue: number;
  time_frame = 0;
  timestamp = 0;

  constructor(data, name) {
    this.pointOrder = data['point'];
    this.time_frame = data.time_frame;
    this.timestamp = data.timestamp;
    this.pointValue = data[this.makeCorrectName(name)];
  }

  makeCorrectName(name) {
    switch (name) {
      case 'query_time':
        return 'm_query_time_per_sec';
      case 'lock_time':
        return 'm_lock_time_sum';
      default:
        return `m_${name}_sum_per_sec`;
    }
  }
}
