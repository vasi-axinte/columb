import { Component } from '@angular/core';
import { StateEnum } from 'src/app/models/state.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  getUserState(): StateEnum{
    const user = JSON.parse(localStorage.getItem("user") ? localStorage.getItem("user")! : "");

    let typedState: keyof typeof StateEnum;

    if(!user){
      return StateEnum.Inactive;
    }

    typedState = user.state
    return StateEnum[typedState];
  }

  shouldShowWarning(): boolean{
    console.log("state:"+(this.getUserState() as StateEnum))
    console.log(StateEnum.Pending as StateEnum)
    return this.getUserState() as StateEnum === StateEnum.Pending as StateEnum;
  }
}
