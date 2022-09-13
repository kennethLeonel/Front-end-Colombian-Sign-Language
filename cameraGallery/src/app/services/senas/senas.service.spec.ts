import { TestBed } from '@angular/core/testing';

import { SenasService } from './senas.service';

describe('SenasService', () => {
  let service: SenasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SenasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
