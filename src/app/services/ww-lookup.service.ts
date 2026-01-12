import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, shareReplay, from, concatMap, catchError, filter, take, defaultIfEmpty } from 'rxjs';

interface WwDailyEntry {
  date: string;
  lastPlate: string;
}

interface WwYearData {
  year: number;
  wwDaily: WwDailyEntry[];
}

@Injectable({ providedIn: 'root' })
export class WwLookupService {
  private dataByYear = new Map<number, Observable<WwYearData>>();

  constructor(private http: HttpClient) {}

  // Convenience for current dataset year (2024). Use getDateForPlateForYear to specify other years.
  getDateForPlate(plate: string): Observable<string | null> {
    const normalized = this.normalize(plate);
    if (!normalized) return of(null);
    const plateIndex = this.toIndex(normalized);
    if (plateIndex == null) return of(null);

    return this.loadYear(2024).pipe(map((data) => this.getDateForPlateInDaily(normalized, data?.wwDaily ?? null)));
  }

  getDateForPlateForYear(plate: string, year: number): Observable<string | null> {
    const normalized = this.normalize(plate);
    if (!normalized) return of(null);
    const plateIndex = this.toIndex(normalized);
    if (plateIndex == null) return of(null);
    return this.loadYear(year).pipe(map((data) => this.getDateForPlateInDaily(normalized, data?.wwDaily ?? null)));
  }

  // Searches across a range of years and returns the first matching date.
  // If no years are provided, defaults to a reasonable range.
  getDateForPlateAllYears(plate: string, years?: number[]): Observable<string | null> {
    const normalized = this.normalize(plate);
    if (!normalized) return of(null);
    const idx = this.toIndex(normalized);
    if (idx == null) return of(null);
    const now = new Date().getFullYear();
    if (years && years.length) {
      // Explicit years take precedence
      return from(years).pipe(
        concatMap((y) =>
          this.loadYear(y).pipe(
            map((data) => this.getDateForPlateInDaily(normalized, data?.wwDaily ?? null)),
            catchError(() => of(null))
          )
        ),
        filter((result) => result !== null),
        take(1),
        defaultIfEmpty(null)
      );
    }

    const allYears = Array.from({ length: now - 2009 + 1 }, (_, i) => 2009 + i);
    const yearRange = allYears.slice().reverse(); // always current..2009

    return from(yearRange).pipe(
      concatMap((y) =>
        this.loadYear(y).pipe(
          map((data) => this.getDateForPlateInDaily(normalized, data?.wwDaily ?? null)),
          catchError(() => of(null))
        )
      ),
      filter((result) => result !== null),
      take(1),
      defaultIfEmpty(null)
    );
  }

  // Pure function: computes the date directly from provided daily data.
  // Wrap-aware via segmentation: split the year into monotonic segments at wrap points and binary search within segment.
  getDateForPlateInDaily(plate: string, wwDaily: WwDailyEntry[] | null): string | null {
    if (!plate || !wwDaily || !Array.isArray(wwDaily) || wwDaily.length === 0) return null;
    const normalized = this.normalize(plate);
    if (!normalized) return null;
    const targetIdx = this.toIndex(normalized);
    if (targetIdx == null) return null;

    // Build raw index array
    const raws: number[] = [];
    for (const entry of wwDaily) {
      const v = this.toIndex(entry.lastPlate);
      if (v == null) return null;
      raws.push(v);
    }

    // Identify monotonic segments (non-decreasing). A wrap creates a new segment.
    const segments: Array<{ start: number; end: number }> = [];
    let start = 0;
    for (let i = 1; i < raws.length; i++) {
      if (raws[i] < raws[i - 1]) {
        segments.push({ start, end: i - 1 });
        start = i;
      }
    }
    segments.push({ start, end: raws.length - 1 });

    const searchSegment = (s: number, e: number): number | null => {
      // Search only if target is within [segmentMin, segmentMax]
      if (targetIdx < raws[s] || targetIdx > raws[e]) return null;
      let lo = s, hi = e;
      let ans: number | null = null;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (raws[mid] >= targetIdx) { ans = mid; hi = mid - 1; } else { lo = mid + 1; }
      }
      return ans;
    };

    // Scan segments in chronological order, return earliest hit
    for (const seg of segments) {
      const idx = searchSegment(seg.start, seg.end);
      if (idx != null) return wwDaily[idx].date;
    }
    return null;
  }

  private loadYear(year: number): Observable<WwYearData> {
    let cached = this.dataByYear.get(year);
    if (!cached) {
      const obs = this.http
        .get<WwYearData>(`assets/content/ww-lookup/${year}.json`)
        .pipe(shareReplay(1));
      this.dataByYear.set(year, obs);
      cached = obs;
    }
    return cached;
  }

  // Accepts variations like "WW321WM", "WW-321WM", "321-WM" and normalizes to "WW-321-WM"
  private normalize(plate: string | null | undefined): string | null {
    if (!plate) return null;
    let p = plate.trim().toUpperCase();
    if (!p) return null;

    // Already correctly formatted
    if (/^WW-\d{3}-[A-Z]{2}$/.test(p)) return p;

    // If starts with WW but missing dashes: e.g., WW321WM or WW-321WM
    if (/^WW\d{3}[A-Z]{2}$/.test(p)) {
      return `WW-${p.substring(2, 5)}-${p.substring(5, 7)}`;
    }
    if (/^WW-\d{3}[A-Z]{2}$/.test(p)) {
      return `WW-${p.substring(3, 6)}-${p.substring(6, 8)}`;
    }

    // If missing WW: e.g., 321-WM
    if (/^\d{3}-[A-Z]{2}$/.test(p)) {
      return `WW-${p}`;
    }

    return null;
  }

  private toIndex(plate: string): number | null {
    const m = /^WW-(\d{3})-([A-Z]{2})$/.exec(plate);
    if (!m) return null;
    const n = parseInt(m[1], 10);
    if (isNaN(n) || n < 0 || n > 999) return null;
    const letters = m[2];
    const a = letters.charCodeAt(0) - 65;
    const b = letters.charCodeAt(1) - 65;
    if (a < 0 || a > 25 || b < 0 || b > 25) return null;
    const lettersIndex = a * 26 + b;
    // Letters are the high-order part, number is the low-order part (000-999)
    return lettersIndex * 1000 + n;
  }

  // Converts a WW plate string to a comparable numeric index.
  // Returns null for invalid formats.
}
