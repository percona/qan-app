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
  @Input() width = 150;
  @Input() height = 30;

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

    const svg = chart.append('svg')
      .attr('height', '20')
      .attr('width', this.width);

    const x = scaleLog()
      .domain([0.00001, 10000])
      .range([2, this.width - 2])
      .clamp(true)
      .nice();

    const { min = 0, max = 0, avg = 0, p99 = 0 } = data;

    const humanize = new HumanizePipe();

    const minStr = `⌜ Min: ${humanize.transform(min, this.measurement)}`;
    const maxStr = `⌟ Max: ${humanize.transform(max, this.measurement)}`;
    const avgStr = `◦ Avg: ${humanize.transform(avg, this.measurement)}`;
    const p99Str = `${p99 ? `• 99%: ${humanize.transform(p99, this.measurement)}` : ''}`;

    this.dataTooltip = `${minStr}\n${maxStr}\n${avgStr}\n${p99Str}`.trim();

    const g = svg.append('g');

    // hrAxes
    g.append('line')
      .attr('class', 'latency-chart-x')
      .attr('x1', '0')
      .attr('stroke-dasharray', '1, 1')
      .attr('y1', '13px')
      .attr('x2', this.width)
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
