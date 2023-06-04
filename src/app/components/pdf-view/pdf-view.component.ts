import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent {
  pdfSource = "https://firebasestorage.googleapis.com/v0/b/columb-ce769.appspot.com/o/sectiuni-contraventii.pdf?alt=media&token=72749be1-5ca9-476b-b59a-4fe096424e45&_gl=1*jiqvwh*_ga*MzA5MDIyOTA4LjE2ODU0NjYzMDc.*_ga_CW55HF8NVT*MTY4NTkwMDc1OS43LjEuMTY4NTkwMjIyMy4wLjAuMA..";
}
