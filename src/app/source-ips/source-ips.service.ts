import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SourceIpsService {


  constructor(private http: HttpClient) { }

  public async getIprmData() {
    return this.http.get('assets/IPRM.json').toPromise().then(iprm => {
      return iprm;
    });
  }

  public getSourceIpTotals(data) {
    return _(data)
      .flatMap('coreInstanceIdDetail')
      .flatMap('ipDetail')
      .groupBy('sourceIp')
      .map((detail, ip) => {

        return {
          ip: ip,
          value: _.sumBy(detail, 'count')
        };

      })
      .orderBy('value', 'desc')
      .value();
  }

  public getIpTimeline(timeline) {
    return _(timeline)
    .flatMap('coreInstanceIdDetail')
    .groupBy('startTime')
    .map((detail, time) => {
      console.log(time);
      console.log(detail);
      return {
        time: time,
        value: _.sumBy(detail, 'count')
      };
    })
    .orderBy('value', 'desc')
    .value();
  }

}


