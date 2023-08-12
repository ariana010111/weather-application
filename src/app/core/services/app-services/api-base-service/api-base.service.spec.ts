
import { TestBed, inject } from '@angular/core/testing';
import {ApiBaseService} from './api-base.service';

describe('Service: Api', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiBaseService]
    });
  });

  it('should ...', inject([ApiBaseService], (service: ApiBaseService) => {
    expect(service).toBeTruthy();
  }));
});
