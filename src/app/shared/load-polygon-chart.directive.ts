import { Directive, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';
import { HumanizePipe } from './humanize.pipe';
import { area, curveStepAfter } from 'd3-shape';
import * as moment from 'moment';
import { scaleLinear } from 'd3-scale';
import { event as currentEvent, mouse, select } from 'd3-selection';
import { isoParse } from 'd3-time-format';
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

  findHighestY() {
    const values = this.appLoadPolygonChart.map(data => +data[this.ykey] || 0);
    return Math.max(...values);
  }

  findMinY() {
    const values = this.appLoadPolygonChart.map(data => +data[this.ykey] || 0);
    return Math.min(...values);
  }

  findHighestX() {
    const values = this.appLoadPolygonChart.map(data => +moment.utc(data[this.xkey]) || 0);
    return Math.max(...values);
  }

  findMinX() {
    const values = this.appLoadPolygonChart.map(data => +moment.utc(data[this.xkey]) || 0);
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
    g.append('path')
      .attr('d', areaBar(this.data))
      .style('fill', '#d9721f');

    const focus = g.append('g').style('display', 'none');

    focus.append('line')
      .attr('id', 'focusLineX')
      .attr('class', 'focusLine');

    focus.append('circle')
      .attr('id', 'focusCircle')
      .attr('r', 1.5)
      .attr('class', 'circle focusCircle');

    focus.append('text')
      .attr('id', 'focusText')
      .attr('font-size', '10')
      .attr('x', 1)
      .attr('y', 8);

    // @ts-ignore TS2345
    const bisectDate = bisector((d, x) => +moment.utc(d[this.xkey]).isBefore(x)).right;

    const rect = g.append('rect')
      .attr('class', 'overlay')
      .attr('width', this.width)
      .attr('height', this.height)
      .on('mouseover', () => focus.style('display', null))
      .on('mouseout', () => focus.style('display', 'none'));

    rect.on('mousemove', () => {
      const coords = mouse(currentEvent.currentTarget);

      const mouseDate: any = moment.utc(scaleX.invert(coords[0]));
      // returns the index to the current data item
      const i = Math.min(Math.max(bisectDate(this.appLoadPolygonChart, mouseDate), 0), this.appLoadPolygonChart.length - 1);
      const d = this.appLoadPolygonChart[i];

      const x = scaleX(isoParse(d[this.xkey]));
      const y = scaleY(d[this.ykey] === undefined ? 0 : d[this.ykey]);

      focus.select('#focusCircle')
        .attr('cx', x)
        .attr('cy', y);

      focus.select('#focusLineX')
        .attr('x1', x)
        .attr('y1', scaleY(this.findMinY()))
        .attr('x2', x)
        .attr('y2', scaleY(this.findHighestY()));

      const value = d[this.ykey] === undefined ? 0 : d[this.ykey];
      const load = this.humanize.transform(value, this.measurement);

      const dateToShow = this.dateFormat.transform(moment(d[this.xkey]).utc());
      this.dataTooltip = !value ? `No data at ${dateToShow}` : `${load} at ${dateToShow}`;
    });

    // Create X axis
    const xAxis = axisBottom(scaleX);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform',
        `translate(${this.margin},${this.height - this.margin - 1})`)
      .call(xAxis);
  }
}
