import { Component, Input } from '@angular/core';
import { PolyElement } from 'src/app/models/poly-element';
import { UrlNavigationReadingService } from 'src/app/services/url-navigation-reading.service';

@Component({
  selector: 'app-poly-element-list',
  templateUrl: './poly-element-list.component.html',
  styleUrls: ['./poly-element-list.component.scss']
})
export class PolyElementListComponent {

  @Input()
  contentFileName: string = '';
  polyElements: PolyElement[] = [];

  constructor(private urlNavigationReadingService: UrlNavigationReadingService) {

  }

  ngOnInit() {
    this.urlNavigationReadingService.getDataFromPolyFile(this.contentFileName)
      .subscribe(result =>{
        this.polyElements = result;
        console.log(this.polyElements);
      }
      )
  }

}
