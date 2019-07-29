export class DetailsSparklineModel {
  pointOrder: number;
  pointValue: number;
  time_frame = 0;
  timestamp = 0;

  constructor(data, name) {
    this.pointOrder = data['point'] || 0;
    this.time_frame = data.time_frame;
    this.timestamp = data.timestamp;
    this.pointValue = data[this.makeCorrectName(name)] && data[this.makeCorrectName(name)] !== 'NaN' ?
      data[this.makeCorrectName(name)] : 0;
  }

  makeCorrectName(name) {
    switch (name) {
      case 'load':
        return 'load';
      case 'num_queries':
        return 'num_queries_per_sec';
      default:
        return `m_${name}_sum_per_sec`
    }
  }
}
