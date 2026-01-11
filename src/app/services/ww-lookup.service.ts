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
    if (!plate) return of(null);
    const normalized = plate.trim().toUpperCase();
    const plateIndex = this.toIndex(normalized);
    if (plateIndex == null) return of(null);

    return this.loadYear(2024).pipe(map((data) => this.getDateForPlateInDaily(normalized, data?.wwDaily ?? null)));
  }

  getDateForPlateForYear(plate: string, year: number): Observable<string | null> {
    if (!plate) return of(null);
    const normalized = plate.trim().toUpperCase();
    const plateIndex = this.toIndex(normalized);
    if (plateIndex == null) return of(null);
    return this.loadYear(year).pipe(map((data) => this.getDateForPlateInDaily(normalized, data?.wwDaily ?? null)));
  }

  // Searches across a range of years and returns the first matching date.
  // If no years are provided, defaults to a reasonable range.
  getDateForPlateAllYears(plate: string, years?: number[]): Observable<string | null> {
    if (!plate) return of(null);
    const normalized = plate.trim().toUpperCase();
    const idx = this.toIndex(normalized);
    if (idx == null) return of(null);
    const now = new Date().getFullYear();
    const yearRange = (years && years.length)
      ? years
      : Array.from({ length: now - 2009 + 1 }, (_, i) => 2009 + i); // 2009..current year

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
  getDateForPlateInDaily(plate: string, wwDaily: WwDailyEntry[] | null): string | null {
    if (!plate || !wwDaily || !Array.isArray(wwDaily) || wwDaily.length === 0) return null;
    const plateIndex = this.toIndex(plate.trim().toUpperCase());
    if (plateIndex == null) return null;
    for (const entry of wwDaily) {
      const maxIdx = this.toIndex(entry.lastPlate);
      if (maxIdx == null) continue;
      if (plateIndex <= maxIdx) return entry.date;
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
