import { Directive, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';
import { HumanizePipe } from './humanize.pipe';
import { area, curveStepAfter } from 'd3-shape';
import * as moment from 'moment';
import { scaleLinear, scaleTime } from 'd3-scale';
import { event as currentEvent, mouse, select } from 'd3-selection';
import { isoParse } from 'd3-time-format';
import { bisector, extent } from 'd3-array';
import { MomentFormatPipe } from './moment-format.pipe';

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

    // focus.append('circle')
    //   .attr('id', 'focusCircle')
    //   .attr('r', 1.5)
    //   .attr('class', 'circle focusCircle');
    //
    // focus.append('text')
    //   .attr('id', 'focusText')
    //   .attr('font-size', '10')
    //   .attr('x', 1)
    //   .attr('y', 8);

    // const bisectDate = bisector((d, x) => +moment.utc(d[this.xkey]).isBefore(x)).right;

    const rect = g.append('rect')
      .attr('class', 'overlay')
      .attr('width', this.width)
      .attr('height', this.height)
      .on('mouseover', () => focus.style('display', null))
      .on('mouseout', () => focus.style('display', 'none'));

    rect.on('mousemove', (p, e) => {
      const coords = mouse(currentEvent.currentTarget);
      const bisectDate = bisector((fullData, x) => +moment.utc(fullData[this.xkey]).isBefore(x)).right;
      const mouseData: any = +moment.utc(scaleX(coords[0]));
      console.log('mouseData - ', mouseData);
      console.log('bisectDate(this.data, mouseData) - ', bisectDate(this.data, mouseData));

      // returns the index to the current data item
      const i = Math.min(Math.max(bisectDate(this.data, mouseData), 0), this.data.length - 1);
      console.log('i - ', i);
      const d = this.data[i];
      console.log('d - ', d);

      // const xCoor = scaleX(coords[0]);
      // const yCoor = scaleY(coords[1]);
      // console.log('x - ', xCoor);
      // console.log('y - ', yCoor);

      // focus.select('#focusLineX')
      //   .attr('x1', xCoor)
      //   .attr('y1', scaleY(this.findMinY()))
      //   .attr('x2', xCoor)
      //   .attr('y2', scaleY(this.findHighestY()));

      // const mouseData: any = +moment.utc(scaleX.invert(coords[0]));
      // console.log('mouseDate - ', mouseData);
      // returns the index to the current data item
      // const i = Math.min(Math.max(bisectDate(this.data, mouseData), 0), this.data.length - 1);
      // const d = this.data[i];

      // correction bisector to use data[0] on right edge of sparkline.
      // if (i === 1) {
      //   const d0 = moment.utc(this.data[0][this.xkey]);
      //   const d1 = moment.utc(this.data[1][this.xkey]);
      //   if (mouseDate.diff(d1) > 0 && d0.diff(mouseDate) < mouseDate.diff(d1)) {
      //     d = this.data[0];
      //   }
      // }

      // const x = scaleX(isoParse(d[this.xkey]));
      // const y = scaleY(d[this.ykey] === undefined ? 0 : d[this.ykey]);
      // console.log('x - ', x);
      // console.log('y - ', y);

      // const xDomain = extent(this.data.map(xDom => moment.utc(xDom[this.xkey])));
      // const yDomain = extent(this.data.map(yDom => this.ykey in yDom ? yDom[this.ykey] : 0));

      // const MIN = 0, MAX = 1;

      // focus.select('#focusCircle')
      //   .attr('cx', x)
      //   .attr('cy', y);
      // focus.select('#focusLineX')
      //   .attr('x1', x).attr('y1', scaleY(this.findMinY()))
      //   .attr('x2', x).attr('y2', scaleY(this.findHighestY()));
      //
      // const value = d[this.ykey] === undefined ? 0 : d[this.ykey];
      // const load = this.humanize.transform(value, this.measurement);
      //
      // const dateToShow = this.dateFormat.transform(moment(d[this.xkey]).utc());
      // console.log('value - ', value);
      // console.log('measurement - ', this.measurement);
      // console.log('load - ', load);
      // console.log('dateToShow - ', dateToShow);
      //
      // this.dataTooltip = d['NoData'] ? `No data at ${dateToShow}` : `${load} at ${dateToShow}`;
    });
  }
}
