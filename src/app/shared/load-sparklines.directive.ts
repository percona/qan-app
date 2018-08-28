import { Directive, Input, HostBinding } from '@angular/core';
import { ElementRef } from '@angular/core';

import * as moment from 'moment';
import { select } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { isoParse, utcFormat, extent, line, area, bisector } from 'd3';
import { event as currentEvent, mouse } from 'd3-selection';

import { HumanizePipe } from './humanize.pipe';
import { MomentFormatPipe } from './moment-format.pipe';

/**
 * Display sparklines in top queries and metrics.
 */
@Directive({ selector: '[appLoadSparklines]' })
export class LoadSparklinesDirective {

    protected _xkey: string;
    protected _ykey: string;
    protected _measurement: string;

    humanize = new HumanizePipe();
    dateFormat = new MomentFormatPipe();

    @HostBinding('attr.data-tooltip')
    @Input() dataTooltip: string;

    constructor(
        public elementRef: ElementRef,
    ) { }

    @Input() set xkey(xkey: string) {
        this._xkey = xkey;
    }

    @Input() set ykey(ykey: string) {
        this._ykey = ykey;
    }

    @Input() set measurement(measurement: string) {
        this._measurement = measurement;
    }

    @Input() set appLoadSparklines(data: Array<{}>) {
        if (data !== null) {
            this.drawChart(data);
        }
    }

    drawChart(data: Array<{}>) {
        const xkey = this._xkey;
        const ykey = this._ykey;
        const measurement = this._measurement || 'number';

        const chart = select(this.elementRef.nativeElement);
        chart.selectAll('*').remove();
        const svg: any = chart.append('svg')
            .attr('height', '20')
            .attr('width', '100')
            .attr('class', 'scaling-svg')
            .attr('preserveAspectRatio', 'none')
            .attr('viewBox', '-1 0 102 20');

        const height = 15;
        const width = Math.floor(svg.node().getBoundingClientRect().width);
        svg.attr('width', width).attr('viewBox', '-1 0 ' + (width + 2) + ' 20');

        const xDomain = extent(data.map(d => moment.utc(d[xkey])));

        const xScale = scaleTime().range([0, width]).domain(xDomain);

        const yDomain = extent(data.map(d => ykey in d ? d[ykey] : 0));

        const yScale = scaleLinear().range([height, 0]).domain(yDomain).clamp(true);

        const svgLine = line()
            .defined(d => !d['NoData'])
            .x(d => xScale(moment.utc(d[xkey])))
            .y(d => yScale(d[ykey] === undefined ? 0 : d[ykey]));

        const svgArea = area()
            .defined(d => !d['NoData'])
            .x(d => xScale(moment.utc(d[xkey])))
            .y0(d => yScale(d[ykey] === undefined ? 0 : d[ykey]))
            .y1(height - 1);

        const g = svg.append('g').attr('transform', 'translate(0, 0)');

        g.append('path')
            .datum(data)
            .attr('class', 'area')
            .attr('d', svgArea);

        g.append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('d', svgLine);

        g.append('line')
            .attr('x1', width + 20)
            .attr('y1', height)
            .attr('x2', '0')
            .attr('y2', height)
            .attr('class', 'x-axis');

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
        const bisectDate = bisector((d, x) => moment.utc(d[xkey]).isBefore(x)).right;

        const rect = g.append('rect')
            .attr('class', 'overlay')
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', () => focus.style('display', null))
            .on('mouseout', () => focus.style('display', 'none'));

        rect.on('mousemove', (p, e) => {
            const coords = mouse(currentEvent.currentTarget);

            const mouseDate: any = moment.utc(xScale.invert(coords[0]));
            // returns the index to the current data item
            const i = Math.min(Math.max(bisectDate(data, mouseDate), 0), data.length - 1);
            let d = data[i];

            // correction bisector to use data[0] on right edge of sparkline.
            if (i === 1) {
                const d0 = moment.utc(data[0][xkey]);
                const d1 = moment.utc(data[1][xkey]);
                if (mouseDate.diff(d1) > 0 && d0.diff(mouseDate) < mouseDate.diff(d1)) {
                    d = data[0];
                }
            }

            const x = xScale(isoParse(d[xkey]));
            const y = yScale(d[ykey] === undefined ? 0 : d[ykey]);

            const MIN = 0,
                MAX = 1;
            focus.select('#focusCircle')
                .attr('cx', x)
                .attr('cy', y);
            focus.select('#focusLineX')
                .attr('x1', x).attr('y1', yScale(yDomain[MIN]))
                .attr('x2', x).attr('y2', yScale(yDomain[MAX]));

            const value = d[ykey] === undefined ? 0 : d[ykey];
            const load = this.humanize.transform(value, measurement);

            const dateToShow = this.dateFormat.transform(moment(d[xkey]).utc());
            this.dataTooltip = d['NoData'] ? `No data at ${dateToShow}` : `${load} at ${dateToShow}`;
        });
    }
}
