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
      this.topVmsChart(data);
  }

  public topVmsChart(data) {
      data = this.topVmsService.getTopVmTotals(data);
      const topVms = _.take(data, 10);
      this.vMs = {backgroundColor: ['#2F3642'],
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
          formatter: '{b} <br> Source IP {c}'
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
          data: _.map(topVms, 'vm').reverse(),
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
          min: 10,
          max: 40,
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
                  xAxis: 700
              }],
          },
      }]
  };


  }
}

