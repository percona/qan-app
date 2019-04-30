import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

import { select } from 'd3-selection';
import { scaleLog } from 'd3-scale';

import { HumanizePipe } from './humanize.pipe';

@Directive({
  selector: '[appLatencyChart]'
})
export class LatencyChartDirective {

  @HostBinding('attr.data-tooltip')
  @Input() dataTooltip: string;
  @Input() measurement = 'time';

  @Input() set appLatencyChart(data: {}) {
    if (data !== null) {
      this.drawChart(data);
    }
  }

  constructor(public elementRef: ElementRef) {
  }

  drawChart(data: any) {
    const chart = select(this.elementRef.nativeElement);
    chart.selectAll('*').remove();
    const svg: any = chart.append('svg')
      .attr('height', '20')
      .attr('width', '100')
      .attr('class', 'scaling-svg')
      .attr('viewBox', '0 0 100 20');

    const width = Math.floor(svg.node().getBoundingClientRect().width);
    svg.attr('width', width).attr('viewBox', '0 0 ' + width + ' 20');

    const x = scaleLog()
      .domain([0.00001, 10000])
      .range([2, width - 2])
      .clamp(true)
      .nice();

    const { min = 0, max = 0, avg = 0, p99 = 0 } = data;

    const humanize = new HumanizePipe();

    const minStr = `⌜ Min: ${humanize.transform(min, this.measurement)}`;
    const maxStr = `⌟ Max: ${humanize.transform(max, this.measurement)}`;
    const avgStr = `◦ Avg: ${humanize.transform(avg, this.measurement)}`;
    const p99Str = `${p99 ? `• 95%: ${humanize.transform(p99, this.measurement)}` : ''}`;

    this.dataTooltip = `${minStr}\n${maxStr}\n${avgStr}\n${p99Str}`.trim();

    const g = svg.append('g');

    // hrAxes
    g.append('line')
      .attr('class', 'latency-chart-x')
      .attr('x1', '0')
      .attr('stroke-dasharray', '1, 1')
      .attr('y1', '13px')
      .attr('x2', width)
      .attr('y2', '13px');

    // hrLine
    g.append('line')
      .attr('class', 'latency-chart-line')
      .attr('x1', x(min) + '')
      .attr('y1', '13px')
      .attr('x2', x(max) + '')
      .attr('y2', '13px');

    // minMark
    g.append('line')
      .attr('class', 'latency-chart-min')
      .attr('x1', x(min) + '')
      .attr('y1', '13px')
      .attr('x2', x(min) + '')
      .attr('y2', '19px');

    // maxMark
    g.append('line')
      .attr('class', 'latency-chart-max')
      .attr('x1', x(max) + '')
      .attr('y1', '8px')
      .attr('x2', x(max) + '')
      .attr('y2', '13px');

    // avgMark
    g.append('circle')
      .attr('class', 'latency-chart-avg')
      .attr('r', 3)
      .attr('cx', x(avg) + '')
      .attr('cy', '13px');

    // p99Mark
    if (p99 > 0) {
      g.append('circle')
        .attr('class', 'latency-chart-p95')
        .attr('r', 2)
        .attr('cx', x(p99) + '')
        .attr('cy', '13px');
    }
  }
}
