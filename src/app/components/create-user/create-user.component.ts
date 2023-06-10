import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CreateUser } from 'src/app/models/create-user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  structure = new FormControl('', Validators.required);
  birthYear = new FormControl('', Validators.required);
  sex = new FormControl('', Validators.required);

  constructor(public authService: AuthService){
  }

  createUser(){
    let user = new CreateUser(
      this.email.value!,
      this.password.value!,
      this.firstName.value!,
      this.lastName.value!,
      this.structure.value!,
      this.sex.value! === "true",
      +this.birthYear.value!,
    )
    return this.authService.register(user);
  }
}
