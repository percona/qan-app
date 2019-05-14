export class DetailsSparklineModel {
  pointOrder: any = false;
  pointValue: any = false;
  time_frame = 0;
  timestamp = 0;

  constructor(data, name) {
    this.pointOrder = data['point'];
    this.pointValue = data[`m_${name}_sum_per_sec`];
    this.time_frame = data.time_frame;
    this.timestamp = data.timestamp;
  }
}
