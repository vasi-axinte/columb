import { Component, Input } from '@angular/core';
import { PolyElement } from 'src/app/models/poly-element';
import { RoleEnum } from 'src/app/models/role.enum';

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

  isLimitedUser(){
    const user = localStorage.getItem("user");

    if(!user){
      return false;
    }

    let userData = JSON.parse(user);

    return userData.roles === RoleEnum.LimitedUser;
  }
}
