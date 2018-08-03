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
    return _(timeline)
      .flatMap('coreInstanceIdDetail')
      .groupBy('startTime')
      .map((detail, time) => {
        const logs = _(detail).flatMap('ipDetail').groupBy('sourceIp');
        console.log(time);
        return {
          name: time,
          value: logs
        };

      })
      .orderBy('value', 'desc')
      .value();
  }
}
