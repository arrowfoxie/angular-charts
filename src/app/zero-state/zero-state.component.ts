import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NgxEchartsService } from 'ngx-echarts';

import { ModalService } from '@armor/brandkit';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-zero-state',
  templateUrl: './zero-state.component.html',
  styleUrls: ['./zero-state.component.scss']
})
export class ZeroStateComponent implements AfterViewInit {

  constructor(private http: HttpClient, private es: NgxEchartsService, ngbModal: NgbModal, private modalService: ModalService) {
  }
  @ViewChild('content')
  public modal: ElementRef;

  public heatMap: any = {
    series: [
      {
        type: 'map',
        mapType: 'world',
        roam: true,
        mapLocation: {
          y: 20,
        },
        itemStyle: {
          emphasis: {
            areaColor: '#7b8599',
            label: {
              color: 'white',
            }
          },
          normal: {
            areaColor: '#485163',
            borderColor: '#59627a'
          },
        }
      }
    ]
  };

  public closeResult: string;

  public open(content) {
    this.modalService.open(content).result
      .then(() => { this.confirm(); })
      .catch(() => { this.cancel(); });
  }

  public confirm() {
    this.closeResult = `Closed/Accepted (Promise Resolved)`;
  }

  public cancel() {
    this.closeResult = `Dismissed  (Promise Rejected)`;
  }

  public ngAfterViewInit() {
    this.open(this.modal);
    console.log('hello');
  }

}
