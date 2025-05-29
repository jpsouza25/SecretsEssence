import { TestBed } from '@angular/core/testing';

import { PerfumesService } from './perfumes.service';

describe('PerfumesService', () => {
  let service: PerfumesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfumesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
