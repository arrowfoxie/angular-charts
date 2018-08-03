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
        const timeline = await this.sourceIpsService.getIprmData();
        this.sourceIpChart(data, timeline);
    }

    public sourceIpChart(_data, _timeline) {
        const data = this.sourceIpsService.getSourceIpTotals(_data);
        let timeline = this.sourceIpsService.getIpTimeline(_timeline);
        const dates = _(_.keys(timeline).sort()).map((key) => {
            const months = key.slice(0, -13);
            return months;
        }).value();

        timeline = _.map(timeline, (detail) => {
            return _(detail).orderBy('value', 'desc').take(10).reverse().value();
        });
        this.iPs = {
            timeline: {
                axisType: 'category',
                data: dates,
                playInterval: 3500,
                loop: false,
                bottom: '2.5%',
                left: '40%',
                symbolSize: 10,
                autoPlay: false,
                lineStyle: {
                    color: '#ddd'
                },
                checkpointStyle: {
                    color: 'red',
                    borderColor: '#ddd',
                    borderWidth: 2
                },
                controlStyle: {
                    color: '#ddd',
                    borderColor: '#ddd',
                },
                label: {
                    normal: {
                        textStyle: {
                            color: '#ddd',
                            fontSize: 15
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: '#ddd',
                            fontSize: 16
                        }
                    }
                },
            },
            baseOption: {
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
                },
                grid: {
                    left: '4%',
                    right: '4%',
                    bottom: '20%',
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
                    data: [],
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ddd',
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
                        color: ['#E7FCD1', '#D7FAB4', '#DEF98E', '#DDFB63', '#C1E045', '#AAC930',
                            '#92AF22', '#7F9624', '#6A7B26', '#566225']
                    },
                    data,
                }],
                series: [{
                    type: 'bar',
                    label: {
                        normal: {
                            position: 'right',
                            show: true,
                            color: '#fff'
                        }
                    },
                    markLine: {
                        lineStyle: {
                            normal: {
                                color: '#ff0000'
                            }
                        },
                        data: [{
                            xAxis: 500,
                        }],
                    },
                }],
            },
            options: _(timeline).map((value) => {
                return {
                    series: {
                        data: _(value).orderBy('value', 'desc').take(10).value().reverse()
                    },
                    yAxis: {
                        data: _(value).orderBy('value', 'desc').take(10).map('name').value().reverse()
                    }
                };
            }).orderBy((obj) => {
                return obj.series.data[0].time;
            }).value()

        };
    }
}
