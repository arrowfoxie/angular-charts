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

  public chartOption: any = {};
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
    this.chartOption = {
      backgroundColor: '#2F3642',
      title: {
          text: 'Geolocation Heat Map',
          subtext: 'Top Ten Countries',

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
      yAxis: {
        type: 'category',
        data: _.map(topCountries, 'name'),
        axisLabel: {
          color: 'white',
        }
    },
    xAxis: {
        type: 'value'
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
        min: _.minBy(data, 'value').value,
        max: _.maxBy(data, 'value').value,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered', 'red']
      }
      },
      series: [
        {
          name: 'World Population (2010)',
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
                areaColor: '#323c48'
            }
        },
          data
        },
        {
          type: 'bar',
          data: topCountries
        }
      ]
    };
  });
 }
}
