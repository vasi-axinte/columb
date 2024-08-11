import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StateEnum } from 'src/app/models/state.enum';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  hasAccessToTiaf: boolean = false;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {

  }

  ngOnInit(){
    const user = localStorage.getItem("user");

    if(!user){
      return;
    }

    let typedState: keyof typeof StateEnum;
    const userData = JSON.parse(user);

    this.userService.getUser(userData.userId).subscribe(user => {
      this.hasAccessToTiaf = user.hasTiafAccess;
    });
  }

  getUserState(): StateEnum {
    const user = localStorage.getItem("user");

    if(!user){
      return StateEnum.Inactive;
    }

    let typedState: keyof typeof StateEnum;
    const userData = JSON.parse(user);

    typedState = userData.state
    return StateEnum[typedState];
  }

  getUserId(): string{
    const user = localStorage.getItem("user");

    if(!user){
      this.router.navigate(['/login']);
      return "";
    }

    const userData = JSON.parse(user);

    return userData.userId;
  }

  shouldShowWarning(): boolean {
    const user = localStorage.getItem("user");

    return user!=null && this.getUserState() as StateEnum === StateEnum.Pending as StateEnum;
  }

  shouldShowError(): boolean{
    const user = localStorage.getItem("user");

    return user!=null && this.getUserState() as StateEnum === StateEnum.Inactive as StateEnum;
  }

  shouldShowLoginButton(): boolean{
    const user = localStorage.getItem("user");

    return !user;
  }

  getUserName(): string{
    const user = localStorage.getItem("user");

    if(!user){
      return "";
    }

    const userData = JSON.parse(user);

    return userData.name;
  }

  logout(){
    this.authService.logout();
  }
}
