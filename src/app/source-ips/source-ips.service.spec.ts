import { TestBed, inject } from '@angular/core/testing';

import { SourceIpsService } from './source-ips.service';

describe('SourceIpsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SourceIpsService]
    });
  });

  it('should be created', inject([SourceIpsService], (service: SourceIpsService) => {
    expect(service).toBeTruthy();
  }));
});
