import { TestBed } from '@angular/core/testing';

import { DyslexiaDetectionService } from './dyslexia-detection.service';

describe('DyslexiaDetectionService', () => {
  let service: DyslexiaDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DyslexiaDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
