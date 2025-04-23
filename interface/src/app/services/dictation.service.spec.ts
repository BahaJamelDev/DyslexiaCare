import { TestBed } from '@angular/core/testing';

import { DictationService } from './dictation.service';

describe('DictationService', () => {
  let service: DictationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
