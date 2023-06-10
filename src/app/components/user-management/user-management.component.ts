import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit{

  users: AppUser[] = []

  constructor(private userService: UserService){

  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(result => {
      console.log("asdf"+ result)
      this.users = result;
    })
  }
}
