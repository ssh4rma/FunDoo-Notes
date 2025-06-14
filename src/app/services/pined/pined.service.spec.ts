import { TestBed } from '@angular/core/testing';

import { PinedService } from './pined.service';

describe('PinedService', () => {
  let service: PinedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
