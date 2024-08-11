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

  @Input()
  shouldDisplayList: boolean = true;

  polyElements: PolyElement[] = [];
  originalList: PolyElement[] = [];
 
  constructor(private urlNavigationReadingService: UrlNavigationReadingService) {

  }

  ngOnInit() {
    this.urlNavigationReadingService.getDataFromPolyFile(this.contentFileName)
      .subscribe(result =>{
        this.originalList = result;
        
        if(this.shouldDisplayList) {
          this.polyElements = this.getList('', this.originalList)
        };
        
        console.log(this.polyElements);
      }
      )
  }

  onSearchChange($event: any): void { 
    const searchValue = $event.target.value;  
    this.polyElements = this.getList(searchValue, this.originalList);
  }

  getList(searchedWord: string, originalList: PolyElement[]): PolyElement[] {
    if (!searchedWord || searchedWord.trim() === '') {
      return this.shouldDisplayList ? [...originalList] : [];
    }
  
    const filterRecursive = (item: PolyElement): PolyElement => {
      const children = item.title.search(new RegExp(searchedWord, 'i')) !== -1 
        ? item.children
        : item.children?.filter(c =>
          c.title.search(new RegExp(searchedWord, 'i')) !== -1
      );
  
      const newItem: PolyElement = {
        ...item,
        children: children && children.length ? children : [],
        shouldShow: (
          item.title.search(new RegExp(searchedWord, 'i')) !== -1 ||
          (children && children.length > 0)
        ),
      };
  
      if (newItem.children) {
        newItem.children = newItem.children.map(filterRecursive);
      }
  
      return newItem;
    };
  
    return originalList
      .map(filterRecursive)
      .filter(item => item.shouldShow);
  }
}
