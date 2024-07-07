import { Component, Input } from '@angular/core';
import { PolyElement } from 'src/app/models/poly-element';

@Component({
  selector: 'app-poly-no-type-element',
  templateUrl: './poly-no-type-element.component.html',
  styleUrls: ['./poly-no-type-element.component.scss']
})
export class PolyNoTypeElementComponent {
  @Input()
  element: PolyElement | null = null;

  getId(urlTitle: string){
    return urlTitle.replace(/\s/g, '');
  }
}
