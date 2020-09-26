import { TestBed } from '@angular/core/testing';

import { PythonDataService } from './python-data.service';

describe('PythonDataService', () => {
  let service: PythonDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PythonDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
