import { Component } from '@angular/core';
import { RoleEnum } from 'src/app/models/role.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor (public authService: AuthService){

  }

  hasAccess(){
    const user = JSON.parse(localStorage.getItem("user") ? localStorage.getItem("user")! : "");

    if(!user){
      return false;
    }

    return user.roles == RoleEnum.Admin;
  }

  logout(){
    this.authService.logout();
  }
}
