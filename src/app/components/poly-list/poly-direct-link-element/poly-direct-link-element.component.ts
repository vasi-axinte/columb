import { Component, Input } from '@angular/core';
import { PolyElement } from 'src/app/models/poly-element';

@Component({
  selector: 'app-poly-direct-link-element',
  templateUrl: './poly-direct-link-element.component.html',
  styleUrls: ['./poly-direct-link-element.component.scss']
})
export class PolyDirectLinkElementComponent {

  @Input()
  element: PolyElement | null = null;

}
