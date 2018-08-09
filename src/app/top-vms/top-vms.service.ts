import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TopVmsService {
  constructor(private http: HttpClient) { }

  public async getIprmData() {
    return this.http.get('assets/IPRM.json').toPromise().then(iprm => {
      return iprm;
    });
  }

  public getTopVmTotals(data) {
    return _(data)

      .groupBy('hostName')
      .map((detail, host) => {
        const logs = _(detail).flatMap('coreInstanceIdDetail').flatMap('ipDetail').sumBy('count');
        return {
          name: host,
          value: logs
        };

      })
      .orderBy('value', 'desc')
      .value();
  }

  public getVmTimeline(timeline) {
    console.log(timeline);
    return _(timeline)
      .groupBy('hostName')
      .flatMap((hostDetail, hostName) => {
        return _(hostDetail).flatMap('coreInstanceIdDetail').map((detail) => {
          console.log(hostName, detail);
          return {
            name: hostName,
            startTime: detail.startTime,
            value: _.sumBy(detail.ipDetail, 'count')
          };
        }).value();
      })
      .groupBy('startTime')
      .value();
  }

  public calculateCountryTotals(ipDetail) {
    console.log(ipDetail);
    return _(ipDetail);
  }
}
