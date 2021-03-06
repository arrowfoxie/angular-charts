import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NgxEchartsService } from 'ngx-echarts';

import { TopVmsService } from './top-vms.service';

import * as _ from 'lodash';

declare const require: any;

@Component({
    selector: 'app-top-vms',
    templateUrl: './top-vms.component.html',
    styleUrls: ['./top-vms.component.scss']
})
export class TopVmsComponent implements OnInit {

    public vMs: any = {};

    constructor(private http: HttpClient, private es: NgxEchartsService, private topVmsService: TopVmsService) { }

    async ngOnInit() {
        const data = await this.topVmsService.getIprmData();
        const timeline = await this.topVmsService.getIprmData();
        this.topVmsChart(data, timeline);
    }

    public topVmsChart(data, timeline) {
        data = this.topVmsService.getTopVmTotals(data);
        timeline = this.topVmsService.getVmTimeline(timeline);
        const topVms = _.take(data, 10);
        const topValues = _.flatMap(timeline);
        const dates = _(_.keys(timeline).sort()).map((key) => {
            const months = key.slice(2, -13);
            return months;
        }).value();
        this.vMs = {
            timeline: {
                axisType: 'category',
                data: dates,
                playInterval: 5000,
                loop: true,
                bottom: '2.5%',
                left: '40%',
                symbolSize: 10,
                autoPlay: true,
                tooltip: {
                    show: true
                },
                lineStyle: {
                    color: '#ddd'
                },
                checkpointStyle: {
                    color: 'red',
                    borderColor: '#ddd',
                    borderWidth: 2
                },
                controlStyle: {
                    color: 'white',
                    borderColor: 'white',
                },
                label: {
                    normal: {
                        textStyle: {
                            color: 'white',
                            fontSize: 15
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: 'white',
                            fontSize: 16
                        }
                    }
                },
            },
            baseOption: {
                backgroundColor: ['#333333'],
                title: {
                    text: 'Top Ten Vms',
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
                    bottom: '20%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    interval: 1000,
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
                    data: _.map(topVms, 'name'),
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
                    min: _.minBy(topValues, 'name').value,
                    max: _.maxBy(topValues, 'name').value,
                    dimension: 0,
                    left: 0,
                    text: ['High', 'Low'],
                    itemWidth: 12,
                    itemHeight: 70,
                    textStyle: {
                        color: '#ddd'
                    },
                    inRange: {
                        color: ['#E7FCD1', '#D7FAB4', '#DEF98E', '#DDFB63', '#C1E045', '#AAC930',
                            '#92AF22', '#7F9624', '#6A7B26', '#566225']
                    }
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
                            xAxis: 2500
                        }],
                    },
                }]
            },


            options: _(timeline).map((value) => {
                const ordered = _(value).orderBy('value', 'desc').take(10).reverse();
                return {
                    series: {
                        data: ordered.value()
                    },
                    yAxis: {
                        data: ordered.map('name').value()
                    }
                };
            }).orderBy((obj) => {
                return obj.series.data[0].time;
            }).value()
        };
    }

}
