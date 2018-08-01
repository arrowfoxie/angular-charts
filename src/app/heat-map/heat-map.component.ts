import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxEchartsService } from 'ngx-echarts';
import { HeatMapService } from './heat-map.service';

import * as _ from 'lodash';

declare const require: any;

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.css']
})
export class HeatMapComponent implements OnInit {

  public heatMap: any = {};
  private mapLoaded = false;

  constructor(private http: HttpClient, private es: NgxEchartsService, private heatmapService: HeatMapService) {}


  async ngOnInit() {
    const data = await this.heatmapService.getIprmData();
    this.initializeChart(data);
  }

 public initializeChart (data) {
   data = this.heatmapService.getCountryTotals(data);
   const topCountries = _.take(data, 9);
  this.http.get('assets/data/echarts/world.json').subscribe(geoJson => {
    // hide loading:
    this.mapLoaded = true;
    this.es.registerMap('world', geoJson);
    this.heatMap = {
      backgroundColor: '#2F3642',
      title: {
          text: 'Geolocation Heat Map',
          subtext: 'By Top Nine Countries',

          textStyle: {
              color: 'rgba(255,255,255, 0.9)'
          }
      },
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          return params.name + ' : ' + params.value;
        }
      },
      grid: {
        left: '30%',
        right: '90%',
        top: '70%',
        bottom: 30
    },
      yAxis: {
        type: 'category',
        data: _.map(topCountries, 'name').reverse(),
        axisLabel: {
          color: '#ddd',
        },
        axisLine: {
          show: true,
          lineStyle: {
              color: '#ddd',
          },
      }
    },
    xAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
              color: '#ddd',
          },
      }
    },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      visualMap: {
        dimension: 0,
        left: 10,
        itemWidth: 12,
        min: _.minBy(data, 'value').value,
        max: _.maxBy(data, 'value').value,
        text: ['High', 'Low'],
        realtime: false,
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered', 'red']
      },
      textStyle: {
        color: '#ddd'
    },
      data
      },
      series: [
        {
          id: 'map',
          type: 'map',
          mapType: 'world',
          top: '10%',
          bottom: '30%',
          left: '2         0%',
          roam: true,
          itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#404a59'
            },
            emphasis: {
                label: {
                    show: false
                },
                areaColor: 'black'
            }
        },
          data
        },
        {
          id: 'bar',
          type: 'bar',
          data: topCountries.reverse(),
          label: {
            normal: {
                show: true,
                position: 'right',
                textStyle: {
                    color: '#ddd'
                }
            },
            itemStyle: {
              normal: {
                  barBorderWidth: '20%',

              },
              data
          },
        },
        }
      ]
    };
  });
 }
}
