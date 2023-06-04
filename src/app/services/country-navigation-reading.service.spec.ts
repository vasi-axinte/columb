import { TestBed } from '@angular/core/testing';

import { CountryNavigationReadingService } from './country-navigation-reading.service';

describe('CountryNavigationService', () => {
  let service: CountryNavigationReadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryNavigationReadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
