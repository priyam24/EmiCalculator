import { TestBed } from '@angular/core/testing';

import { EmiService } from './emi-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EmiService', () => {
  let service: EmiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmiService]
    });
    service = TestBed.inject(EmiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
