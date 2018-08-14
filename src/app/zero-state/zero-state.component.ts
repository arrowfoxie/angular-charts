import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxEchartsService } from 'ngx-echarts';

@Component({
  selector: 'app-zero-state',
  templateUrl: './zero-state.component.html',
  styleUrls: ['./zero-state.component.scss']
})
export class ZeroStateComponent {





  constructor(private http: HttpClient, private es: NgxEchartsService) { }





 public heatMap: any =  {
  series : [
      {
          name: 'World Population (2010)',
          type: 'map',
          mapType: 'world',
          roam: true,
          mapLocation: {
              y : 60
          },
      }
  ]
 };
}


