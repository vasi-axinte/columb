import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, shareReplay } from 'rxjs';

interface PlateRef { code: string; date: string; }
interface DatasetFile { modulVechi: PlateRef[]; modulNou: PlateRef[]; }

export interface AltSearchSuccess { date: string; is2026: boolean; expiry: string; }
export interface AltSearchError { error: string; }

@Injectable({ providedIn: 'root' })
export class WwLookupAltService {
  private data$?: Observable<DatasetFile>;
  private readonly jsonPath = 'assets/data/ww-lookup-alt.json';

  constructor(private http: HttpClient) {}

  private load(): Observable<DatasetFile> {
    if (!this.data$) {
      this.data$ = this.http.get<DatasetFile>(this.jsonPath).pipe(shareReplay(1));
    }
    return this.data$;
  }

  validate$(plateRaw: string): Observable<AltSearchSuccess | AltSearchError> {
    const trimmed = (plateRaw || '').toUpperCase().trim();
    if (!trimmed) return of({ error: 'INVALID_FORMAT' });

    return this.load().pipe(
      map((data) => this.validateWithData(trimmed, data))
    );
  }

  private validateWithData(plateRaw: string, data: DatasetFile): AltSearchSuccess | AltSearchError {
    let formatted = plateRaw;
    if (!plateRaw.includes('-') && plateRaw.length >= 7 && plateRaw.startsWith('WW')) {
      formatted = `WW-${plateRaw.substring(2, 5)}-${plateRaw.substring(5, 7)}`;
    }

    const match = formatted.match(/^WW-(\d{3})-([A-Z]{2})$/);
    if (!match) return { error: 'INVALID_FORMAT' };

    const inputNum = +match[1];
    const inputLetters = match[2];
    const db = ['W','X','Y','Z'].includes(inputLetters[0]) ? data.modulVechi : data.modulNou;

    let pivot: PlateRef | null = null;
    for (const ref of db) {
      const [refNumStr, refLetters] = ref.code.split('-');
      const refNum = +refNumStr;
      if (inputLetters > refLetters || (inputLetters === refLetters && inputNum >= refNum)) {
        pivot = ref;
      }
    }

    if (!pivot) return { error: 'SERIES_TOO_OLD' };

    return {
      date: pivot.date,
      is2026: pivot.date.includes('2026'),
      expiry: this.calculateExpiry(pivot.date),
    };
  }

  private calculateExpiry(dateStr: string): string {
    const monthsRo = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'];
    const parts = dateStr.split(' ');
    const d = new Date(+parts[2], monthsRo.indexOf(parts[1]), +parts[0]);
    d.setDate(d.getDate() + 120);
    return `${d.getDate()} ${monthsRo[d.getMonth()]} ${d.getFullYear()}`;
  }
}
