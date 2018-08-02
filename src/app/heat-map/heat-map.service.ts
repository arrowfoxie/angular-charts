import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class HeatMapService {



  constructor(private http: HttpClient) { }

  public async getIprmData() {
    return this.http.get('assets/IPRM.json').toPromise().then(iprm => {
      return iprm;
    });
  }

  public getCountryTotals(data) {
    return _(data)
      .flatMap('coreInstanceIdDetail')
      .flatMap('ipDetail')
      .groupBy('countryName')
      .map((detail, name) => {
        return {
          name: name,
          value: _.sumBy(detail, 'count')
        };
      })
      .orderBy('value', 'desc')
      .value();
  }

  public getTimelines(data) {
    console.log(data);
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
}

