import { Pipe, PipeTransform } from '@angular/core';
import { RoleEnum } from '../models/role.enum';

@Pipe({
  name: 'filterRestrictedElements'
})
export class FilterRestrictedElementsPipe implements PipeTransform {
  transform(elements: any[]): any[] {
    const user = localStorage.getItem("user");
    
    if (!user) {
      return elements;
    }

    let userData = JSON.parse(user);
    const isLimitedUser = userData.roles === RoleEnum.LimitedUser;

    return elements.filter(element => 
      !(element.restrictedToLimitedUser && isLimitedUser)
    );
  }
}
