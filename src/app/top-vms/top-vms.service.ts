import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TopVmsService {
  constructor(private http: HttpClient) { }

public async getIprmData () {
 return this.http.get('assets/IPRM.json').toPromise().then(iprm => {
    return iprm;
  });
}

public getTopVmTotals(data) {

  console.log(data);
return _(data);

_.flattenDeep('data');
}
}
