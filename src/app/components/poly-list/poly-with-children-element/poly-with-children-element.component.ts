import { Component, Input } from '@angular/core';
import { PolyElement } from 'src/app/models/poly-element';

@Component({
  selector: 'app-poly-with-children-element',
  templateUrl: './poly-with-children-element.component.html',
  styleUrls: ['./poly-with-children-element.component.scss']
})
export class PolyWithChildrenElementComponent {

  @Input()
  element: PolyElement | null = null;

  getId(urlTitle: string){
    return urlTitle.replace(/\s/g, '');
  }
}
