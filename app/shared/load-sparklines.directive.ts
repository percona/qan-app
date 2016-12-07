import { Directive, Input } from '@angular/core';
import { ElementRef } from '@angular/core';

import * as moment from 'moment';
import { select } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { isoParse, utcParse, utcFormat, extent, line, area, bisector, mouse } from 'd3';


@Directive({ selector: '[loadSparklines]' })
export class LoadSparklinesDirective {

    protected _xkey: string;
    protected _ykey: string;
    protected _measurement: string;

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

    @Input() set loadSparklines(data: Array<{}>) {
        if (data !== null) {
            this.drawChart(data);
        }
    }

    drawChart(data: Array<{}>) {
        let iso = utcFormat('%Y-%m-%dT%H:%M:%SZ');
        let xkey = this._xkey;
        let ykey = this._ykey;
        let measurement = this._measurement || 'number';

        let chart = select(this.elementRef.nativeElement);
        chart.selectAll('*').remove();
        let svg = chart.append('svg')
            .attr('height', '20')
            .attr('width', '100')
            .attr('class', 'scaling-svg')
            .attr('preserveAspectRatio', 'none')
            .attr('viewBox', '0 0 100 20');

        let height = 15;
        let width = Math.floor(svg.node().getBoundingClientRect().width);
        svg.attr('width', width).attr('viewBox', '0 0 ' + width + ' 20');

        let xDomain = extent(data.map(d => moment.utc(d[xkey])));

        let xScale = scaleTime().range([0, width]).domain(xDomain);

        let yDomain = extent(data.map(d => ykey in d ? d[ykey] : 0));

        let yScale = scaleLinear().range([height, 0]).domain(yDomain);

        let svgLine = line()
            .x(d => xScale(moment.utc(d[xkey])))
            .y(d => yScale(d[ykey] === undefined ? 0 : d[ykey]));

        let svgArea = area()
            .x(d => xScale(moment.utc(d[xkey])))
            .y0(d => yScale(d[ykey] === undefined ? 0 : d[ykey]))
            .y1(height - 1);

        let g = svg.append('g').attr('transform', 'translate(0, 0)');

        g.append('path')
            .datum(data)
            .attr('class', 'area')
            .attr('d', svgArea);


        g.append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('d', svgLine);

        let focus = g.append('g').style('display', 'none');

        focus.append('line')
            .attr('id', 'focusLineX')
            .attr('class', 'focusLine');

        focus.append('circle')
            .attr('id', 'focusCircle')
            .attr('r', 1)
            .attr('class', 'circle focusCircle');

        focus.append('text')
            .attr('id', 'focusText')
            .attr('font-size', '10')
            .attr('x', 1)
            .attr('y', 8);



        let bisectDate = bisector((d, x) => moment.utc(d[xkey]).isBefore(x)).right;

        let rect = g.append('rect')
            .attr('class', 'overlay')
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', () => focus.style('display', null))
            .on('mouseout', () => focus.style('display', 'none'))

        rect.on('mousemove', (e, el) => {
            let r = rect._groups[0][0];
            let mouse_ = mouse(r);

            let mouseDate = moment.utc(xScale.invert(mouse_[0]));
            let i = bisectDate(data, mouseDate); // returns the index to the current data item
            i = i > 59 ? 59 : i;
            i = i < 1 ? 1 : i;
            let d0 = data[i - 1]
            let d1 = data[i];
            // work out which date value is closest to the mouse
            let d = mouseDate - moment.utc(d0[xkey]) > moment.utc(d1[xkey]) - mouseDate ? d1 : d0;

            let x = xScale(isoParse(d[xkey]));
            let y = yScale(d[ykey] === undefined ? 0 : d[ykey]);

            let MIN = 0,
                MAX = 1;
            focus.select('#focusCircle')
                .attr('cx', x)
                .attr('cy', y);
            focus.select('#focusLineX')
                .attr('x1', x).attr('y1', yScale(yDomain[MIN]))
                .attr('x2', x).attr('y2', yScale(yDomain[MAX]));


            let load = d[ykey] === undefined ? 0 : d[ykey];
            // $rootScope.popover = $filter('humanize')(load, measurement) + ' at ' + moment(d[xkey]).utc().format('YYYY-MM-DD HH:mm:ss [UTC]');
            // $rootScope.$apply();

            //focus.select("#focusText")
            //    .text($filter('humanize')(load, 'number') + ' at ' + moment(d[xkey]).utc().format('YYYY-MM-DD HH:mm:ss [UTC]'));
        });
    }
}