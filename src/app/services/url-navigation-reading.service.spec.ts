import { TestBed } from '@angular/core/testing';

import { UrlNavigationReadingService } from './url-navigation-reading.service';

describe('UrlNavigationReadingService', () => {
  let service: UrlNavigationReadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlNavigationReadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
