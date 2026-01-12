import { Component } from '@angular/core';
import { WwLookupService } from '../../services/ww-lookup.service';
import { WwLookupAltService, AltSearchError, AltSearchSuccess } from '../../services/ww-lookup-alt.service';

@Component({
  selector: 'app-ww-lookup',
  templateUrl: './ww-lookup.component.html',
  styleUrls: ['./ww-lookup.component.scss']
})
export class WwLookupComponent {
  query = '';
  loading = false;
  error: string | null = null;
  resultDate: string | null = null;

  // Alternate search (local dataset) state
  queryAlt = '';
  altResult: { date: string; expiry: string; is2026: boolean } | null = null;
  altErrorKey: string | null = null;

  constructor(private wwService: WwLookupService, private wwAlt: WwLookupAltService) {}

  submit(): void {
    this.error = null;
    this.resultDate = null;
    const q = this.query?.trim();
    if (!q) {
      this.error = 'Please enter a WW plate (format: WW-123-AB).';
      return;
    }
    this.loading = true;
    this.wwService.getDateForPlateAllYears(q).subscribe({
      next: (date) => {
        this.resultDate = date;
        if (!date) this.error = 'Not found in available datasets or invalid format.';
      },
      error: () => {
        this.error = 'Failed to load data.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Second search using the alternative local dataset logic
  submitAlt(): void {
    this.altErrorKey = null;
    this.altResult = null;
    const q = this.queryAlt?.trim();
    if (!q) {
      this.altErrorKey = 'ww-lookup.invalid-format';
      return;
    }
    this.wwAlt.validate$(q).subscribe((res: AltSearchSuccess | AltSearchError) => {
      if ('error' in res) {
        this.altErrorKey = res.error === 'SERIES_TOO_OLD' ? 'ww-lookup.series-too-old' : 'ww-lookup.invalid-format';
      } else {
        this.altResult = { date: res.date, expiry: res.expiry, is2026: res.is2026 };
      }
    });
  }
}
