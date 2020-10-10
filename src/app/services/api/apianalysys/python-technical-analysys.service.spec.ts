import { TestBed } from '@angular/core/testing';

import { PythonTechnicalAnalysysDataService } from './python-technical-analysys.service';

describe('PythonTechnicalAnalysysDataService', () => {
  let service: PythonTechnicalAnalysysDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PythonTechnicalAnalysysDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
