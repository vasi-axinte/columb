import { Component } from '@angular/core';
import { WwLookupService } from '../../services/ww-lookup.service';

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

  constructor(private wwService: WwLookupService) {}

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
}
