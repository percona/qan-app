export class DetailsSparklineModel {
  pointOrder: number;
  pointValue: number;
  time_frame = 0;
  timestamp = 0;

  constructor(data, name) {
    this.pointOrder = data['point'] || 0;
    this.time_frame = data.time_frame;
    this.timestamp = data.timestamp;
    this.pointValue = data[this.makeCorrectName(name)];
  }

  makeCorrectName(name) {
    return name === 'num_queries' ? 'num_queries_per_sec' : `m_${name}_sum_per_sec`
  }
}
