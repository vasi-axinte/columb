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
  users: AppUser[] = [];
  filteredUsers: AppUser[] = [];
  selectedState: StateEnum = StateEnum.Pending;
  selectedIdForShowingHistory: string | null = null;
  numberOfActiveUsers: number = 0;
  numberOfPendingUsers: number = 0;
  numberOfInactiveUsers: number = 0;
  numberOfTiafUsers: number = 0;

  constructor(private userService: UserService){

  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(result => {
      this.users = result;
      this.filteredUsers = this.users.filter(u => u.state === this.selectedState);
      this.numberOfActiveUsers = this.users.filter(u => u.state === this.stateEnum.Active).length;
      this.numberOfPendingUsers = this.users.filter(u => u.state === this.stateEnum.Pending).length;
      this.numberOfInactiveUsers = this.users.filter(u => u.state === this.stateEnum.Inactive).length;
      this.numberOfTiafUsers = this.users.filter(u => u.hasTiafAccess || u.canRequestTiafAccess).length;
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

  selectState(state: StateEnum){
    this.selectedState = state;
    this.filteredUsers = this.users.filter(u => u.state === this.selectedState);
  }

  selectTiafUsers(){
    this.filteredUsers = this.users.filter(u => u.hasTiafAccess || u.canRequestTiafAccess);
  }

  onSearchChange($event: any): void { 
    const searchValue = $event.target.value;  
    this.filteredUsers = this.users.filter(u => 
        u.state === this.selectedState && 
        (u.firstName.search(new RegExp(searchValue, "i")) !== -1 || u.lastName.search(new RegExp(searchValue, "i")) !== -1)
      );
  }

  showHistoryForUser(user: AppUser): void {
    this.selectedIdForShowingHistory === user.id 
      ? this.selectedIdForShowingHistory = null 
      : this.selectedIdForShowingHistory = user.id;
    
    if(user.historicalUser && !user.historicalUser.wasChecked){
      this.userService.clearHistoryForUserId(user.historicalUser.id)
      .subscribe((result) => {
        if(result === true){
          user.historicalUser!.wasChecked = true;
        }
      });
    }
  }

  updateRequestTiafAccess(user: AppUser){
    console.log("Requesting TIAF access for user with id: " + user.id);
    user.canRequestTiafAccess = !user.canRequestTiafAccess
    this.userService.updateUserCanRequestTiafAccess(user.id, user.canRequestTiafAccess).subscribe(result => {
      if (result) {
        this.numberOfTiafUsers = this.users.filter(u => u.hasTiafAccess || u.canRequestTiafAccess).length;
      }
    });
  }

  updateAccessTiafAccess(user: AppUser){
    console.log("Updating TIAF access for user with id: " + user.id);
    user.hasTiafAccess = !user.hasTiafAccess
    this.userService.updateUserHasTiafAccess(user.id, user.hasTiafAccess).subscribe(result => {
      if (result) {
        this.numberOfTiafUsers = this.users.filter(u => u.hasTiafAccess || u.canRequestTiafAccess).length;
      }
    });
  }

  testSwithcChange($event: any){
    console.log($event);
  }

  getDate(){
    return Date.now();
  }
}
