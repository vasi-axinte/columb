import { Component } from '@angular/core';
import { FileReadingService } from 'src/app/services/file-reading.service';

@Component({
  selector: 'app-crimes',
  templateUrl: './crimes.component.html',
  styleUrls: ['./crimes.component.scss']
})
export class CrimesComponent {
  contentFileName = "assets/content/crimes.json";
}
