import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent {
  pdfSource = "https://firebasestorage.googleapis.com/v0/b/columb-ce769.appspot.com/o/sectiuni-contraventii.pdf?alt=media&token=72749be1-5ca9-476b-b59a-4fe096424e45&_gl=1*jiqvwh*_ga*MzA5MDIyOTA4LjE2ODU0NjYzMDc.*_ga_CW55HF8NVT*MTY4NTkwMDc1OS43LjEuMTY4NTkwMjIyMy4wLjAuMA..";
  // pdfSource = "https://firebasestorage.googleapis.com/v0/b/columb-ce769.appspot.com/o/1.3.-ID-and-documents-check-links.pdf?alt=media&token=4d7e6e31-0205-48cf-ae23-510e7f2c6eff&_gl=1*tj3qnw*_ga*MzA5MDIyOTA4LjE2ODU0NjYzMDc.*_ga_CW55HF8NVT*MTY4NTkxMDMzMy44LjEuMTY4NTkxMDM0Mi4wLjAuMA..";
}
