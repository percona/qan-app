import { Directive, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';
import { HumanizePipe } from './humanize.pipe';
import { MomentFormatPipe } from './moment-format.pipe';
import { area, curveStepAfter, line } from 'd3-shape';
import * as moment from 'moment';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

export interface DataType {
  x: any,
  y: any
}

@Directive({
  selector: '[appLoadPolygonChart]'
})
export class LoadPolygonChartDirective implements OnChanges {
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
  @Input() appLoadPolygonChart: Array<{}>;

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
    this.drawPolygonChart();
  }

  findHighestY() {
    const values = this.appLoadPolygonChart.map(data => data[this._ykey]);
    return Math.max(...values);
  }

  findMinY() {
    const values = this.appLoadPolygonChart.map(data => data[this._ykey]);
    return Math.min(...values);
  }

  findHighestX() {
    const values = this.appLoadPolygonChart.map(data => +moment.utc(data[this._xkey]));
    return Math.max(...values);
  }

  findMinX() {
    const values = this.appLoadPolygonChart.map(data => +moment.utc(data[this._xkey]));
    return Math.min(...values);
  }

  drawPolygonChart() {
    const chart = select(this.elementRef.nativeElement);
    chart.selectAll('*').remove();

    const svg = chart.append('svg')
      .attr('class', 'axis')
      .attr('width', this.width)
      .attr('height', this.height);

    const xAxisLength = this.width - 2 * this.margin;

    const yAxisLength = this.height - 2 * this.margin;

    const scaleX = scaleLinear()
      .domain([this.findMinX(), this.findHighestX()])
      .range([0, xAxisLength]);

    const scaleY = scaleLinear()
      .domain([this.findHighestY(), this.findMinY()])
      .range([0, yAxisLength]);

    for (let i = 0, length = this.appLoadPolygonChart.length; i < length; i++) {
      this.data.push({
        x: scaleX(moment.utc(this.appLoadPolygonChart[i][this._xkey])),
        y: scaleY(this.appLoadPolygonChart[i][this._ykey]) + this.margin
      });
    }

    const lineBar = line<DataType>().curve(curveStepAfter)
      .x(d => d.x)
      .y(d => d.y);

    const areaBar = area<DataType>().curve(curveStepAfter)
      .x(d => d.x)
      .y0(this.height - this.margin)
      .y1(d => d.y);

    const g = svg.append('g');
    g.append('path')
      .attr('d', areaBar(this.data))
      .style('fill', 'lightblue');
  }

  drawHeadLine() {
    // Main line
    // g.append('path')
    //   .attr('d', lineBar(this.data))
    //   .style('stroke', 'steelblue')
    //   .style('stroke-width', 2);
  }

  drawPolygonAxises() {
    // const xAxis = axisBottom(scaleX);
    // const yAxis = axisLeft(scaleY);

    // svg.append('g')
    //   .attr('class', 'x-axis')
    //   .attr('transform',
    //     'translate(' + this.margin + ',' + (this.height - this.margin) + ')')
    //   .call(xAxis);
    //
    // svg.append('g')
    //   .attr('class', 'y-axis')
    //   .attr('transform',
    //     `translate(${this.margin},${this.margin})`)
    //   .call(yAxis);

    // d3.selectAll('g.x-axis g.tick')
    //   .append('line')
    //   .classed('grid-line', true)
    //   .attr('x1', 0)
    //   .attr('y1', 0)
    //   .attr('x2', 0)
    //   .attr('y2', -(this.height - 2 * this.margin));
    //
    // d3.selectAll('g.y-axis g.tick')
    //   .append('line')
    //   .classed('grid-line', true)
    //   .attr('x1', 0)
    //   .attr('y1', 0)
    //   .attr('x2', xAxisLength)
    //   .attr('y2', 0);
  }
}
