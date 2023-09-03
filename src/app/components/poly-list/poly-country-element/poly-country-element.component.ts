import { Component, Input } from '@angular/core';
import { PolyElement } from 'src/app/models/poly-element';

@Component({
  selector: 'app-poly-country-element',
  templateUrl: './poly-country-element.component.html',
  styleUrls: ['./poly-country-element.component.scss']
})
export class PolyCountryElementComponent {

  @Input()
  element: PolyElement | null = null;

}
