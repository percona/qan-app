import { Directive, Input } from '@angular/core';
import { TemplateRef, ViewContainerRef, ElementRef, Renderer } from '@angular/core';

// import * as d3 from 'd3';
// import * as d3 from 'd3';
import { select } from 'd3'


@Directive({ selector: '[latencyChart]' })
export class LatencyCartDirective {

    constructor(
        // private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        public elementRef: ElementRef,
        public renderer: Renderer
    ) { }

    @Input() set latencyChart(data: {}) {
        // this.drawChart(data);
        // console.log('dddd', d3);
    }


    drawChart(data) {
        // d3.select(this.viewContainer.element.nativeElement);
        let chart = select(this.elementRef.nativeElement);
        console.log(chart);
        this.elementRef.nativeElement.

         this.renderer.setElementStyle(chart[0][0], 'background-color', 'yellow');

        // console.log('ddd', data, chart);
        // var svg = chart.append('svg')
        //     .attr('height', '20')
        //     .attr('width', '100')
        //     .attr('class', 'scaling-svg')
        //     .attr('viewBox', '0 0 100 20');
    }
    /*
           var width = Math.floor(svg.node().getBoundingClientRect().width);
           svg.attr('width', width).attr('viewBox', '0 0 ' + width + ' 20');

           var x = d3.scale.log()
               .clamp(true)
               .domain([0.00001, 10000])
               .range([2, width - 2])
               .nice();
           if (data === undefined) {
               return;
           }

           var min = data.hasOwnProperty('Min') ? data.Min : 0;
           var max = data.hasOwnProperty('Max') ? data.Max : 0;
           var avg = data.hasOwnProperty('Avg') ? data.Avg : 0;
           var p95 = data.hasOwnProperty('P95') ? data.P95 : 0;

           var g = svg.append('g');

           var hrAxes = g.append('line')
               .attr('class', 'latency-chart-x')
               .attr('x1', '0')
               .attr('stroke-dasharray', '1, 1')
               .attr('y1', '13px')
               .attr('x2', width)
               .attr('y2', '13px');

           var hrLine = g.append('line')
               .attr('class', 'latency-chart-line')
               .attr('x1', x(min) + '')
               .attr('y1', '13px')
               .attr('x2', x(max) + '')
               .attr('y2', '13px');

           var minMark = g.append('line')
               .attr('class', 'latency-chart-min')
               .attr('x1', x(min) + '')
               .attr('y1', '13px')
               .attr('x2', x(min) + '')
               .attr('y2', '19px');

           var maxMark = g.append('line')
               .attr('class', 'latency-chart-max')
               .attr('x1', x(max) + '')
               .attr('y1', '8px')
               .attr('x2', x(max) + '')
               .attr('y2', '13px');

           var avgMark = g.append('circle')
               .attr('class', 'latency-chart-avg')
               .attr('r', 3)
               .attr('cx', x(avg) + '')
               .attr('cy', '13px');

           var p95Mark = g.append('circle')
               .attr('class', 'latency-chart-p95')
               .attr('r', 2)
               .attr('cx', x(p95) + '')
               .attr('cy', '13px');
       }
       */
}
