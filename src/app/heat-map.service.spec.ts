import { TestBed, inject } from '@angular/core/testing';

import { HeatMapService } from './heat-map.service';

describe('HeatMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeatMapService]
    });
  });

  it('should be created', inject([HeatMapService], (service: HeatMapService) => {
    expect(service).toBeTruthy();
  }));
});
