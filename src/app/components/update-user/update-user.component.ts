import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppRegisterUserErrorList } from 'src/app/models/app-error';
import { UpdateUser } from 'src/app/models/update-user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  errors: AppRegisterUserErrorList | null = null;
  userId: string | null = null

  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  structure = new FormControl('', Validators.required);
  birthYear = new FormControl('', Validators.required);
  sex = new FormControl('', Validators.required);

  constructor(public userService: UserService, private activatedRoute: ActivatedRoute){
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      this.userService.getUser(this.userId ? this.userId : "").subscribe(u => {
        this.firstName.setValue(u.firstName);
        this.lastName.setValue(u.lastName);
        this.structure.setValue(u.structure);
        this.birthYear.setValue(u.birthYear.toString());
        this.sex.setValue(u.sex.toString());
      })
    });  }

  updateUser(){
    let user = new UpdateUser(
      this.userId? this.userId : "",
      this.firstName.value!,
      this.lastName.value!,
      this.structure.value!,
      this.sex.value! === "true",
      +this.birthYear.value!,
      false
    )

    return this.userService.updateUser(this.userId ? this.userId : "", user).subscribe({
      next: (result) => {
        
      },
      error: (error: HttpErrorResponse) => {
        this.handleFailedUpdate(error);
      }
    });
  }

  private handleFailedUpdate(error: HttpErrorResponse): void {
    if(error.status == 400){
      this.errors = JSON.parse(error.error).errors;
    }
  };
}
