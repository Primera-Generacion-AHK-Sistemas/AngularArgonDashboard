import { TestBed } from '@angular/core/testing';

import { UserDetailsStorageService } from './user-details-storage.service';

describe('UserDetailsStorageService', () => {
  let service: UserDetailsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDetailsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
