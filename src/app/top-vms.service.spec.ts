import { TestBed, inject } from '@angular/core/testing';

import { TopVmsService } from './top-vms.service';

describe('TopVmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopVmsService]
    });
  });

  it('should be created', inject([TopVmsService], (service: TopVmsService) => {
    expect(service).toBeTruthy();
  }));
});
