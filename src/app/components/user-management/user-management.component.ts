import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { StateEnum } from 'src/app/models/state.enum';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit{

  stateEnum = StateEnum;
  users: AppUser[] = []

  constructor(private userService: UserService){

  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(result => {
      console.log("asdf"+ result)
      this.users = result;
    })
  }

  getAge(birthYear: number): number{
    return new Date().getFullYear() - birthYear;
  }

  changeActiveState(user: AppUser){
    this.userService.setUserState(user.id, user.state).subscribe(result =>{
      user.isActive = result === true ? !user.isActive : user.isActive;
    })
  }

  getCurrentUserActiveState(user: AppUser){
    return user.isActive;
  }

  changeUserState(user:AppUser, state: StateEnum){
    this.userService.setUserState(user.id, state).subscribe(result =>{
      user.isActive = result === true ? !user.isActive : user.isActive;
    })
  }
}
