import { TestBed } from '@angular/core/testing';

import { SourceStorageService } from './source-storage.service';

describe('SourceStorageService', () => {
  let service: SourceStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
