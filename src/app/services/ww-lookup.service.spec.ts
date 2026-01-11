import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WwLookupService } from './ww-lookup.service';
// Import the same asset json the app uses
// Adjust path if assets root differs in your setup
import ww2024 from '../../assets/content/ww-lookup/2024.json';

// Helper: allow shorthand like "WW-607ZL" or "WW607ZL" in test cases
function normalizePlate(p: string): string {
  const t = p.trim().toUpperCase();
  if (/^WW-\d{3}-[A-Z]{2}$/.test(t)) return t;
  // Try to insert hyphens if missing between number and letters
  const m = /^(WW)[- ]?(\d{3})[- ]?([A-Z]{2})$/.exec(t);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  return t;
}

describe('WwLookupService (pure logic)', () => {
  let service: WwLookupService;
  let httpMock: HttpTestingController;
  const AVAILABLE_YEARS = [2024];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WwLookupService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('getDateForPlateAllYears (data-driven over AVAILABLE_YEARS) should map plates to dates', () => {
    const cases: Array<{ plate: string; expected: string }>= [
      { plate: 'WW-607ZL', expected: '2024-01-01' },
      { plate: 'WW-285-ZN', expected: '2024-01-02' },
    ];
    for (const c of cases) {
      service.getDateForPlateAllYears(normalizePlate(c.plate), AVAILABLE_YEARS).subscribe((date) => {
        expect(date).withContext(`plate ${c.plate}`).toBe(c.expected);
      });
      const req = httpMock.expectOne('assets/content/ww-lookup/2024.json');
      expect(req.request.method).toBe('GET');
      req.flush(ww2024 as any);
    }
  });

  it('should map plates to dates (data-driven)', () => {
    const cases: Array<{ plate: string; expected: string }>= [
      { plate: 'WW-607ZL', expected: '2024-01-01' },
      { plate: 'WW-285-ZN', expected: '2024-01-02' },
      { plate: 'ww607zl', expected: '2024-01-01' },
      { plate: 'WW-287-ZN', expected: '2024-01-02' },
    ];
    for (const c of cases) {
      const d = service.getDateForPlateInDaily(normalizePlate(c.plate), (ww2024 as any).wwDaily);
      expect(d).withContext(`plate ${c.plate}`).toBe(c.expected);
    }
  });

  it('should return null for invalid formats (data-driven)', () => {
    const invalidPlates = ['WW-12-ABC', 'INVALID', 'WW-100-aa', 'WW-1-AZ', 'WW100AZZ'];
    for (const p of invalidPlates) {
      const d = service.getDateForPlateInDaily(normalizePlate(p), (ww2024 as any).wwDaily);
      expect(d).withContext(`plate ${p}`).toBeNull();
    }
  });

  it('should return null for not-found plates (data-driven)', () => {
    const notFoundPlates = ['WW-999-ZZ', 'WW-000-AA'];
    for (const p of notFoundPlates) {
      const d = service.getDateForPlateInDaily(normalizePlate(p), (ww2024 as any).wwDaily);
      expect(d).withContext(`plate ${p}`).toBeNull();
    }
  });
});

describe('WwLookupService (HTTP-backed)', () => {
  let service: WwLookupService;
  let httpMock: HttpTestingController;
  const AVAILABLE_YEARS = [2024]; // update this list as new asset files are added

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WwLookupService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getDateForPlate should load 2024.json and resolve a date', (done) => {
    service.getDateForPlate('WW-285-ZN').subscribe((date) => {
      expect(date).toBe('2024-01-02');
      done();
    });
    const req = httpMock.expectOne('assets/content/ww-lookup/2024.json');
    expect(req.request.method).toBe('GET');
    req.flush(ww2024 as any);
  });

  it('getDateForPlateAllYears should try provided years and return first match', (done) => {
    service.getDateForPlateAllYears('WW-285-ZN', [2023, 2024]).subscribe((date) => {
      expect(date).toBe('2024-01-02');
      done();
    });
    // 2023.json: simulate 404/missing
    const req2023 = httpMock.expectOne('assets/content/ww-lookup/2023.json');
    expect(req2023.request.method).toBe('GET');
    req2023.flush({}, { status: 404, statusText: 'Not Found' });

    // 2024.json: success
    const req2024 = httpMock.expectOne('assets/content/ww-lookup/2024.json');
    expect(req2024.request.method).toBe('GET');
    req2024.flush(ww2024 as any);
  });

  it('getDateForPlateAllYears should return null when no dataset matches', (done) => {
    service.getDateForPlateAllYears('WW-999-ZZ', AVAILABLE_YEARS).subscribe((date) => {
      expect(date).toBeNull();
      done();
    });
    const req = httpMock.expectOne('assets/content/ww-lookup/2024.json');
    req.flush(ww2024 as any);
  });
});
