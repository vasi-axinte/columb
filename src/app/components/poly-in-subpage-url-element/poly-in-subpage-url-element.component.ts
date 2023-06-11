import { Component, Input } from '@angular/core';
import { PolyElement } from 'src/app/models/poly-element';

@Component({
  selector: 'app-poly-in-subpage-url-element',
  templateUrl: './poly-in-subpage-url-element.component.html',
  styleUrls: ['./poly-in-subpage-url-element.component.scss']
})
export class PolyInSubpageUrlElementComponent {

  @Input()
  element: PolyElement | null = null;
}
