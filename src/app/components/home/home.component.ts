import { Component } from '@angular/core';
import { StateEnum } from 'src/app/models/state.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  constructor(private authService: AuthService){

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

  logout(){
    this.authService.logout();
  }
}
