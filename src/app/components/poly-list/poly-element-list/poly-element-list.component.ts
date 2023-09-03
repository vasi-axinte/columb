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
  originalList: PolyElement[] = [];
 
  constructor(private urlNavigationReadingService: UrlNavigationReadingService) {

  }

  ngOnInit() {
    this.urlNavigationReadingService.getDataFromPolyFile(this.contentFileName)
      .subscribe(result =>{
        this.originalList = result;
        this.polyElements = this.getList('');
        
        console.log(this.polyElements);
      }
      )
  }

  onSearchChange($event: any): void { 
    const searchValue = $event.target.value;  
    this.polyElements = this.getList(searchValue);
  }

  getList(searchedWord: string){
    console.log("searched word is" + searchedWord);
    this.originalList.forEach(el => el.shouldShow = false);
    if(!searchedWord || searchedWord.trim() === '' || searchedWord === "" || searchedWord === null){
      return this.originalList;
    }

    let filteredList = this.originalList.filter(el => 
        el.title.search(new RegExp(searchedWord, "i")) !== -1 ||
        (el.children != null && el.children.length !== 0 && el.children.some(c => c.title.search(new RegExp(searchedWord, "i")) !== -1))
      );
    
    filteredList.forEach(el => el.shouldShow = true);
    return filteredList;
  }
}
