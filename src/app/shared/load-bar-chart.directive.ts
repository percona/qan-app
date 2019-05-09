import { Directive, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import * as moment from 'moment';
import { HumanizePipe } from './humanize.pipe';
import { MomentFormatPipe } from './moment-format.pipe';

@Directive({
  selector: '[appLoadBarChart]'
})
export class LoadBarChartDirective implements OnChanges {
  public _xkey: number;
  public _ykey: string;
  public _measurement: string;

  public height = 30;
  public width = 150;
  public margin = 0;
  public padding = 0;
  public data = [];

  humanize = new HumanizePipe();
  dateFormat = new MomentFormatPipe();

  @HostBinding('attr.data-tooltip')
  @Input() dataTooltip: string;
  @Input() appLoadBarChart: Array<{}>;

  constructor(public elementRef: ElementRef) {
  }

  @Input() set xkey(xkey: number) {
    this._xkey = xkey;
  }

  @Input() set ykey(ykey: string) {
    this._ykey = ykey;
  }

  @Input() set measurement(measurement: string) {
    this._measurement = measurement;
  }

  ngOnChanges() {
    this.drawBarChart();
  }


  drawBarChart() {
    const chart = select(this.elementRef.nativeElement);
    chart.selectAll('*').remove();

    const svg = chart.append('svg')
      .attr('class', 'axis')
      .attr('width', this.width)
      .attr('height', this.height);

    // calculate X axis length = widthSvgContainer - indents
    const xAxisLength = this.width - 2 * this.margin;

    // calculate Y axis length = heightSvgContainer - indents
    const yAxisLength = this.height - 2 * this.margin;

    // interpolate X axis
    const scaleX = scaleLinear()
      .domain([1, this.appLoadBarChart.length + 1])
      .range([0, xAxisLength]);

    // interpolate Y axis
    const scaleY = scaleLinear()
      .domain([this.findHighestY(), 0])
      .range([0, yAxisLength]);

    // Create g object for rectangles
    const g = svg.append('g')
      .attr('class', 'body')
      .attr('transform',  // сдвиг объекта вправо
        `translate(${this.margin}, 0)`);

    // Bind data with rectangles
    g.selectAll('rect.bar')
      .data(this.appLoadBarChart)
      .enter()
      .append('rect')
      .attr('class', 'bar');

    // Set parameters for rectangles
    g.selectAll('rect.bar')
      .data(this.appLoadBarChart)
      .attr('x', (d, index) => scaleX(index))
      .attr('y', d => scaleY(d[this._ykey]) + this.margin)
      .attr('height', d => yAxisLength - scaleY(d[this._ykey]))
      .attr('width', () => Math.floor(xAxisLength / this.appLoadBarChart.length) - this.padding);

    // const dateToShow = this.dateFormat.transform(moment(d[xkey]).utc());
    // this.dataTooltip = d['NoData'] ? `No data at ${dateToShow}` : `${load} at ${dateToShow}`;
  }

  findHighestY() {
    const values = this.appLoadBarChart.map(data => data[this._ykey]);
    return Math.max(...values);
  }

  findMinY() {
    const values = this.appLoadBarChart.map(data => data[this._ykey]);
    return Math.min(...values);
  }

  findHighestX() {
    const values = this.appLoadBarChart.map(data => +moment.utc(data[this._xkey]));
    return Math.max(...values);
  }

  findMinX() {
    const values = this.appLoadBarChart.map(data => +moment.utc(data[this._xkey]));
    return Math.min(...values);
  }

  // drawAxises() {
  // // // Create X axis
  // const xAxis = axisBottom(scaleX);
  // // // Create Y axis
  // const yAxis = axisLeft(scaleY);

  // // Draw X axis
  // svg.append('g')
  //   .attr('class', 'x-axis')
  //   .attr('transform',  // сдвиг оси вниз и вправо
  //     `translate(${this.margin},${this.height - this.margin})`)
  //   .call(xAxis);
  //
  // // Draw Y axis
  // svg.append('g')
  //   .attr('class', 'y-axis')
  //   .attr('transform', // сдвиг оси вниз и вправо на margin
  //     `translate(${this.margin},${this.margin})`)
  //   .call(yAxis);

  // // Draw horizontal lines
  // selectAll('g.y-axis g.tick')
  //   .append('line')
  //   .classed('grid-line', true)
  //   .attr('x1', 0)
  //   .attr('y1', 0)
  //   .attr('x2', xAxisLength)
  //   .attr('y2', 0);
  // }
}
