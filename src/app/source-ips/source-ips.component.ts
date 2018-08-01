import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxEchartsService } from 'ngx-echarts';
import { SourceIpsService } from './source-ips.service';

import * as _ from 'lodash';

declare const require: any;

@Component({
    selector: 'app-source-ips',
    templateUrl: './source-ips.component.html',
    styleUrls: ['./source-ips.component.css']
})
export class SourceIpsComponent implements OnInit {

    public iPs: any = {};

    constructor(private http: HttpClient, private es: NgxEchartsService, private sourceIpsService: SourceIpsService) { }

    async ngOnInit() {
        const data = await this.sourceIpsService.getIprmData();
        this.sourceIpChart(data);
    }

    public sourceIpChart(data) {
        data = this.sourceIpsService.getSourceIpTotals(data);
        const topIps = _.take(data, 10);
        this.iPs = {
            backgroundColor: ['#2F3642'],
            title: {
                text: 'Top Ten Source IPs',
                subtext: 'By Threats Blocked',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: '{b} <br> Count: {c}'
            },
            /*legend: {
                data: [date]
            },*/
            grid: {
                left: '4%',
                right: '4%',
                bottom: '2%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                interval: 100,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#fff',
                        fontWeight: '80'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'gray',
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'gray',
                    }
                },
            },
            yAxis: {
                type: 'category',
                data: _.map(topIps, 'ip').reverse(),
                axisLabel: {
                    show: true,
                    interval: 0,
                    rotate: 0,
                    margin: 10,
                    inside: false,
                    textStyle: {
                        color: '#fff',
                        fontWeight: '50'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'gray',
                    },
                }
            },
            visualMap: [{
                min: _.minBy(data, 'value').value,
                max: _.maxBy(data, 'value').value,
                dimension: 0,
                right: 0,
                itemWidth: 0,
                textStyle: {
                    color: '#ddd'
                },
                inRange: {
                    color: ['#E7FCD1', '#D7FAB4', '#DEF98E', '#DDFB63', '#C1E045', '#AAC930', '#92AF22', '#7F9624', '#6A7B26', '#566225']
                }
            }],
            series: [{
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        color: '#fff'
                    }
                },
                data: topIps.reverse(),
                markLine: {
                    lineStyle: {
                        normal: {
                            color: '#ff0000'
                        }
                    },
                    data: [{
                        xAxis: 700
                    }],
                },
            }]
        };


    }
}
