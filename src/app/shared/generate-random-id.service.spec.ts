import { TestBed } from '@angular/core/testing';

import { GenerateRandomIdService } from './generate-random-id.service';

describe('GenerateRandomIdService', () => {
  let service: GenerateRandomIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateRandomIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
