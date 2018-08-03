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

  constructor(private http: HttpClient, private es: NgxEchartsService, private heatmapService: HeatMapService) { }


  async ngOnInit() {
    const data = await this.heatmapService.getIprmData();
    const timeline = await this.heatmapService.getIprmData();
    this.initializeChart(data, timeline);
  }



  public initializeChart(_data, _timeline) {
    const data = this.heatmapService.getCountryTotals(_data);
    let timeline = this.heatmapService.getMapTimeline(_timeline);
    const topCountries = _.take(data, 9);
    const dates = _(_.keys(timeline).sort()).map((key) => {
      const months = key.slice(0, -13);
      return months;
  }).value();
  timeline = _.map(timeline, (detail) => {
    return _(detail).orderBy('value', 'desc').take(9).reverse().value();
  });
    this.http.get('assets/data/echarts/world.json').subscribe(geoJson => {
      // hide loading:
      this.mapLoaded = true;
      this.es.registerMap('world', geoJson);
      this.heatMap = {
        timeline: {
        axisType: 'category',
        data: dates,
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
          formatter: function (params) {
            return params.name + ' : ' + params.value;
          }
        },
        grid: {
          left: '30%',
          right: '90%',
          top: '75%',
          bottom: '4%'
        },
        yAxis: {
          type: 'category',
          data: [],
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
        visualMap: [{
          dimension: 0,
        right: 10,
          itemWidth: 12,
          min: _.minBy(data, 'value').value,
          max: _.maxBy(data, 'value').value,
          text: ['High', 'Low'],
          inRange: {
            color: ['lightskyblue', 'red']
          },
          textStyle: {
            color: '#ddd'
          },
          data
        }],
        series: [
          {
            id: 'map',
            type: 'map',
            mapType: 'world',
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
              },
            },
          }
        ],
      },
      options: _(timeline).map((value) => {

        return {
            series: {
                data: _(value).orderBy('value', 'desc').take(9).value().reverse()
            },
            yAxis: {
                data: _(value).orderBy('value', 'desc').take(9).map('name').value().reverse()
            }
        };
    }).orderBy((obj) => {
        return obj.series.data[0].time;
    }).value()
    };
    });
  }


}
