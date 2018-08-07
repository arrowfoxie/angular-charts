import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxEchartsService } from 'ngx-echarts';
import { HeatMapService } from './heat-map.service';


import * as _ from 'lodash';

declare const require: any;

@Component({
  selector: 'app-mobile-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.css']
})
export class MobileMapComponent implements OnInit {

  public heatMap: any = {};
  private mapLoaded = false;

  constructor(private http: HttpClient, private es: NgxEchartsService, private heatmapService: HeatMapService) { }

  async ngOnInit() {
     // Checks if screen size is less than 1024 pixels
    const data = await this.heatmapService.getIprmData();
    const timeline = await this.heatmapService.getIprmData();
    this.initializeChart(data, timeline);
  }

  public initializeChart(data, timeline) {
    data = this.heatmapService.getCountryTotals(data);
    timeline = this.heatmapService.getMapTimeline(timeline);
    const topCountries = _.take(data, 9);
    const dates = _(_.keys(timeline).sort()).map((key) => {
      const months = key.slice(0, -13);

      return months;
    }).value();

    timeline = _.map(timeline, (detail) => {
      console.log(detail);
      return _(detail).orderBy('value', 'desc').take(10).reverse().value();
    });


    this.http.get('assets/data/echarts/world.json').subscribe(geoJson => {
      // hide loading:
      this.mapLoaded = true;
      this.es.registerMap('world', geoJson);
      this.heatMap = {
        timeline: {
          axisType: 'category',
          data: dates,
          playInterval: 8000,
          loop: false,
          bottom: '2.5%',
          left: '50%',
          symbolSize: 10,
          autoPlay: true,
          tooltip: {
            show: false
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
            show: false,
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
            left: '4%',
            right: '4%',
            bottom: '20%',
            containLabel: true
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
            itemHeight: 40,
            min: _.minBy(data, 'value').value,
            max: _.maxBy(data, 'value').value,
            text: ['High', 'Low'],
            realtime: false,
            inRange: {
              color: ['lightskyblue', 'red']
            },
            textStyle: {
              color: '#ddd'
            },
            data
          },
          series: [
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
          ],
        },
      };
    });
  }


}
