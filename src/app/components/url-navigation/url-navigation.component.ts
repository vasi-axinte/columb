import { Component, Input } from '@angular/core';
import { NavigationUrl } from 'src/app/models/navigation-url';
import { UrlNavigationReadingService } from 'src/app/services/url-navigation-reading.service';

@Component({
  selector: 'app-url-navigation',
  templateUrl: './url-navigation.component.html',
  styleUrls: ['./url-navigation.component.scss']
})
export class UrlNavigationComponent {
  @Input()
  contentFileName: string = '';

  navigationUrls: NavigationUrl[] = [];

  constructor(private urlNavigationReadingService: UrlNavigationReadingService) {

  }

  ngOnInit() {
    this.urlNavigationReadingService.getDataFromFile(this.contentFileName)
      .subscribe(result =>
        this.navigationUrls = result
      )
  }

  getId(urlTitle: string){
    return urlTitle.replace(/\s/g, '');
  }
}
