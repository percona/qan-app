import {Directive, Input, HostBinding, OnChanges} from '@angular/core';
import {ElementRef} from '@angular/core';

import * as moment from 'moment';
import * as d3 from 'd3';
import {select, selectAll} from 'd3-selection';
import {scaleLinear, scaleTime} from 'd3-scale';
import {isoParse, utcFormat, extent, line, area, bisector, axisBottom, axisLeft} from 'd3';
import {event as currentEvent, mouse} from 'd3-selection';

import {HumanizePipe} from './humanize.pipe';
import {MomentFormatPipe} from './moment-format.pipe';

/**
 * Display sparklines in top queries and metrics.
 */
@Directive({selector: '[appLoadSparklines]'})
export class LoadSparklinesDirective implements OnChanges {

  public _xkey: number;
  public _ykey: string;
  public _measurement: string;

  public height = 30;
  public width = 130;
  public margin = 0;
  public padding = 0;
  public data = [
    {x: 1, y: 55},
    {x: 2, y: 67},
    {x: 3, y: 74},
    {x: 4, y: 63},
    {x: 5, y: 56},
    {x: 6, y: 24},
    {x: 7, y: 26},
    {x: 8, y: 19},
    {x: 9, y: 42},
    {x: 10, y: 88},
    {x: 11, y: 80},
    {x: 12, y: 77}
  ];

  humanize = new HumanizePipe();
  dateFormat = new MomentFormatPipe();

  @HostBinding('attr.data-tooltip')
  @Input() dataTooltip: string;
  @Input() appLoadSparklines: Array<{}>;

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
    console.log('this.appLoadSparklines - ', this.appLoadSparklines);
    // setTimeout(() => this.drawChart(this.appLoadSparklines), 0);
    this.drawChart();
  }

  // drawChart(data: Array<{}>) {
  //   const xkey = this._xkey;
  //   const ykey = this._ykey;
  //   const measurement = this._measurement || 'number';
  //
  //   const chart = select(this.elementRef.nativeElement);
  //   chart.selectAll('*').remove();
  //   const svg: any = chart.append('svg')
  //     .attr('height', '20')
  //     .attr('width', '100')
  //     .attr('class', 'scaling-svg')
  //     .attr('preserveAspectRatio', 'none')
  //     .attr('viewBox', '-1 0 102 20');
  //
  //   const height = 15;
  //   const width = Math.floor(svg.node().getBoundingClientRect().width);
  //   svg.attr('width', width).attr('viewBox', '-1 0 ' + (width + 2) + ' 20');
  //
  //   const xDomain = extent(data.map(d => moment.utc(d[xkey])));
  //
  //   const xScale = scaleTime().range([2, width - 2]).domain(xDomain);
  //
  //   const yDomain = extent(data.map(d => ykey in d ? d[ykey] : 0));
  //
  //   const yScale = scaleLinear().range([height, 2]).domain(yDomain).clamp(true);
  //
  //   const svgLine = line()
  //     .defined(d => !d['NoData'])
  //     .x(d => xScale(moment.utc(d[xkey])))
  //     .y(d => yScale(d[ykey] === undefined ? 0 : d[ykey]));
  //
  //   const svgArea = area()
  //     .defined(d => !d['NoData'])
  //     .x(d => xScale(moment.utc(d[xkey])))
  //     .y0(d => yScale(d[ykey] === undefined ? 0 : d[ykey]))
  //     .y1(height - 1);
  //
  //   const g = svg.append('g').attr('transform', 'translate(0, 0)');
  //
  //   g.append('path')
  //     .datum(data)
  //     .attr('class', 'area')
  //     .attr('d', svgArea);
  //
  //   g.append('path')
  //     .datum(data)
  //     .attr('class', 'line')
  //     .attr('d', svgLine);
  //
  //   g.append('line')
  //     .attr('x1', width + 20)
  //     .attr('y1', height)
  //     .attr('x2', '0')
  //     .attr('y2', height)
  //     .attr('class', 'x-axis');
  //
  //   const focus = g.append('g').style('display', 'none');
  //
  //   focus.append('line')
  //     .attr('id', 'focusLineX')
  //     .attr('class', 'focusLine');
  //
  //   focus.append('circle')
  //     .attr('id', 'focusCircle')
  //     .attr('r', 1.5)
  //     .attr('class', 'circle focusCircle');
  //
  //   focus.append('text')
  //     .attr('id', 'focusText')
  //     .attr('font-size', '10')
  //     .attr('x', 1)
  //     .attr('y', 8);
  //
  //   // @ts-ignore TS2345
  //   const bisectDate = bisector((d, x) => moment.utc(d[xkey]).isBefore(x)).right;
  //
  //   const rect = g.append('rect')
  //     .attr('class', 'overlay')
  //     .attr('width', width)
  //     .attr('height', height)
  //     .on('mouseover', () => focus.style('display', null))
  //     .on('mouseout', () => focus.style('display', 'none'));
  //
  //   rect.on('mousemove', (p, e) => {
  //     const coords = mouse(currentEvent.currentTarget);
  //
  //     const mouseDate: any = moment.utc(xScale.invert(coords[0]));
  //     // returns the index to the current data item
  //     const i = Math.min(Math.max(bisectDate(data, mouseDate), 0), data.length - 1);
  //     let d = data[i];
  //
  //     // correction bisector to use data[0] on right edge of sparkline.
  //     if (i === 1) {
  //       const d0 = moment.utc(data[0][xkey]);
  //       const d1 = moment.utc(data[1][xkey]);
  //       if (mouseDate.diff(d1) > 0 && d0.diff(mouseDate) < mouseDate.diff(d1)) {
  //         d = data[0];
  //       }
  //     }
  //
  //     const x = xScale(isoParse(d[xkey]));
  //     const y = yScale(d[ykey] === undefined ? 0 : d[ykey]);
  //
  //     const MIN = 0,
  //       MAX = 1;
  //     focus.select('#focusCircle')
  //       .attr('cx', x)
  //       .attr('cy', y);
  //     focus.select('#focusLineX')
  //       .attr('x1', x).attr('y1', yScale(yDomain[MIN]))
  //       .attr('x2', x).attr('y2', yScale(yDomain[MAX]));
  //
  //     const value = d[ykey] === undefined ? 0 : d[ykey];
  //     const load = this.humanize.transform(value, measurement);
  //
  //     const dateToShow = this.dateFormat.transform(moment(d[xkey]).utc());
  //     this.dataTooltip = d['NoData'] ? `No data at ${dateToShow}` : `${load} at ${dateToShow}`;
  //   });
  // }
  drawChart() {
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
      .domain([1, this.appLoadSparklines.length + 1])
      .range([0, xAxisLength]);

    // interpolate Y axis
    const scaleY = scaleLinear()
      .domain([this.findHighest(), 0])
      .range([0, yAxisLength]);

    // создаем объект g для прямоугольников
    const g = svg.append('g')
      .attr('class', 'body')
      .attr('transform',  // сдвиг объекта вправо
        `translate(${this.margin}, 0)`);

    // связываем данные с прямоугольниками
    g.selectAll('rect.bar')
      .data(this.appLoadSparklines)
      .enter()
      .append('rect')
      .attr('class', 'bar');

    // устанавливаем параметры прямоугольников
    console.log('this._xkey - ', this._xkey);
    g.selectAll('rect.bar')
      .data(this.appLoadSparklines)
      .attr('x', (d, index) => scaleX(index))
      .attr('y', d => scaleY(d[this._ykey]) + this.margin)
      .attr('height', d => yAxisLength - scaleY(d[this._ykey]))
      .attr('width', () => Math.floor(xAxisLength / this.appLoadSparklines.length) - this.padding);
  }

  findHighest() {
    const values = this.appLoadSparklines.map(data => data[this._ykey]);
    console.log(Math.max(...values));
    return Math.max(...values);
  }

  drawAxis() {
    // // // создаем ось X
    // const xAxis = axisBottom(scaleX);
    // // // создаем ось Y
    // const yAxis = axisLeft(scaleY);

    // // отрисовка оси Х
    // svg.append('g')
    //   .attr('class', 'x-axis')
    //   .attr('transform',  // сдвиг оси вниз и вправо
    //     `translate(${this.margin},${this.height - this.margin})`)
    //   .call(xAxis);
    //
    // // отрисовка оси Y
    // svg.append('g')
    //   .attr('class', 'y-axis')
    //   .attr('transform', // сдвиг оси вниз и вправо на margin
    //     `translate(${this.margin},${this.margin})`)
    //   .call(yAxis);

    // // рисуем горизонтальные линии
    // selectAll('g.y-axis g.tick')
    //   .append('line')
    //   .classed('grid-line', true)
    //   .attr('x1', 0)
    //   .attr('y1', 0)
    //   .attr('x2', xAxisLength)
    //   .attr('y2', 0);
  }
}
