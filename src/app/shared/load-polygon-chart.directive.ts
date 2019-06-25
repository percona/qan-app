import { Directive, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';
import { HumanizePipe } from './humanize.pipe';
import { area, curveStepAfter } from 'd3-shape';
import * as moment from 'moment';
import { scaleLinear } from 'd3-scale';
import { event as currentEvent, mouse, select } from 'd3-selection';
import { bisector } from 'd3-array';
import { MomentFormatPipe } from './moment-format.pipe';
import { axisBottom } from 'd3-axis';

export interface DataType {
  x: any,
  y: any
}

@Directive({
  selector: '[appLoadPolygonChart]'
})
export class LoadPolygonChartDirective implements OnChanges {
  public margin = 0;
  public padding = 0;
  public data: any = [];
  dateFormat = new MomentFormatPipe();
  humanize = new HumanizePipe();

  @HostBinding('attr.data-tooltip')
  @Input() dataTooltip: string;
  @Input() appLoadPolygonChart: Array<{}>;
  @Input() xkey: string;
  @Input() ykey: string;
  @Input() measurement: string;
  @Input() width = 300;
  @Input() height = 30;

  constructor(public elementRef: ElementRef) {
  }

  ngOnChanges() {
    this.drawPolygonChart();
  }

  findHighestY(array) {
    const values = array.map(data => +data[this.ykey] || 0);
    return Math.max(...values);
  }

  findMinY(array) {
    const values = array.map(data => +data[this.ykey] || 0);
    return Math.min(...values);
  }

  findHighestX(array) {
    const values = array.map(data => +moment.utc(data[this.xkey]) || 0);
    return Math.max(...values);
  }

  findMinX(array) {
    const values = array.map(data => +moment.utc(data[this.xkey]) || 0);
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
      .domain([this.findMinX(this.appLoadPolygonChart), this.findHighestX(this.appLoadPolygonChart)])
      .range([0, xAxisLength]);

    const scaleY = scaleLinear()
      .domain([this.findHighestY(this.appLoadPolygonChart), this.findMinY(this.appLoadPolygonChart)])
      .range([0, yAxisLength]);

    this.data = this.appLoadPolygonChart.map(item =>
      new Object({
        x: scaleX(moment.utc(item[this.xkey])),
        y: scaleY(item[this.ykey] || 0) + this.margin
      }));

    const areaBar = area<DataType>().curve(curveStepAfter)
      .x(d => d.x)
      .y0(this.height - this.margin)
      .y1(d => d.y);

    const g = svg.append('g');
    const focusG = svg.append('g').style('display', 'none');

    g.append('path')
      .attr('d', areaBar(this.data))
      .style('fill', 'rgba(215, 114, 44, 0.6)');

    const focusBar = focusG
      .append('path')
      .attr('class', 'active-rect')
      .style('fill', 'white')
      .on('mouseout', () => focusG.style('display', 'none'));

    focusBar.append('text')
      .attr('id', 'focusText')
      .attr('font-size', '10')
      .attr('x', 1)
      .attr('y', 8);

    // @ts-ignore TS2345
    const bisectDate = bisector((d, x) => +moment.utc(d[this.xkey]).isBefore(x)).right;

    svg.on('mousemove', () => {
      const coords = mouse(currentEvent.currentTarget);
      const mouseDate: any = moment.utc(scaleX.invert(coords[0]));

      const indexOfStartPoint = Math.min(
        Math.max(
          bisectDate(this.appLoadPolygonChart, mouseDate),
          0
        ),
        this.appLoadPolygonChart.length - 1
      );
      const hoveredPoint = this.appLoadPolygonChart[indexOfStartPoint];
      const endPoint = this.appLoadPolygonChart[indexOfStartPoint - 1];
      const focusPointsRange = [hoveredPoint, endPoint];
      const activeArea: any = focusPointsRange.map(item => new Object(
        {
          x: scaleX(moment.utc(item[this.xkey])) || 0,
          y: scaleY(endPoint[this.ykey] || 0) + this.margin
        }));
      const value = endPoint[this.ykey] === undefined ? 0 : endPoint[this.ykey];
      const load = this.humanize.transform(value, this.measurement);
      const dateToShow = this.dateFormat.transform(moment(endPoint[this.xkey]).utc());

      focusBar.attr('d', areaBar(activeArea));
      this.dataTooltip = !value ? `NA at ${dateToShow}` : `${load} at ${dateToShow}`;
    });
    svg.on('mouseover', () => focusG.style('display', null));
    svg.on('mouseout', () => focusG.style('display', 'none'));

    // Create X axis
    const xAxis = axisBottom(scaleX);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform',
        `translate(${this.margin},${this.height - this.margin - 1})`)
      .call(xAxis);
  }
}
