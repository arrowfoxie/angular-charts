import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxEchartsService } from 'ngx-echarts';
import { TopVmsService } from './top-vms.service';

import * as _ from 'lodash';

declare const require: any;

@Component({
    selector: 'app-top-vms',
    templateUrl: './top-vms.component.html',
    styleUrls: ['./top-vms.component.css']
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
        console.log(timeline);
        const topVms = _.take(data, 10);
        this.vMs = {
            timeline: {
            axisType: 'category',
            data: ['1990', '1991'],
            playInterval: 300,
            loop: false,
            bottom: '2.5%',
            left: '50%',
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
            backgroundColor: ['#2F3642'],
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
                data: _.map(topVms, 'name').reverse(),
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
                min: _.minBy(data, 'name').value,
                max: _.maxBy(data, 'name').value,
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
                data: topVms.reverse(),
                markLine: {
                    lineStyle: {
                        normal: {
                            color: '#ff0000'
                        }
                    },
                    data: [{
                        xAxis: 16000
                    }],
                },
            }]
        },


    };
}

}
